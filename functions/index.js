// Function to send email when requesting a quote : sending 1 email to client and 1 to sales

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const sgMail = require("@sendgrid/mail");
const firestore = admin.firestore();

const CLIENT_EMAIL_TEMPLATE_ID = "d-8ff0ad311b074b85ade899f727c95374";
const SALES_EMAIL_TEMPLATE_ID = "d-93b9ef4419514b11bcc14250841fc3a6";

const getBoxesInString = (boxes) => {
  let listString = "";
  boxes.forEach(box => {
    let itemsListString = "";
    box.items.forEach(item => {
      itemsListString += `${item.qty} x ${item.product.title} - ${item.variantSelected.label} ; `
    });
    listString += `${box.name}: ${box.qty} x £${box.unitPrice} box including: ${itemsListString} / `;
  });
  return listString;
};

const getSalesEmail = async () => {
  let email = "";
  await firestore.doc("/app/salesEmail").get().then((doc) => {
    if (doc.exists) {
      // functions.logger.log("Sales_email: ", doc.data().email);
      email = doc.data().email;
    } else {
      // functions.logger.log("Sales_email is default: contact@curakit.com");
      email = "contact@curakit.com";
    }
  });
  return email; 
};

const emailData = ({ to, templateId, quoteDate, quoteDetails, quoteNetCost, quoteQty, boxesListString, totalDiscount, preDiscountedCost, quoteRef }) => {
  const data = {
    "to": to,
    "from": "sales@curakit.com",
    "template_id": templateId,
    "dynamicTemplateData": {
      "first_name": "Josh",
      "quote_reference": quoteRef,
      "quote_details": quoteDetails,
      "boxes": boxesListString,
      "total_discount": totalDiscount,
      "pre_discounted_cost": preDiscountedCost,
      "quote_qty": quoteQty,
      "quote_net_cost": quoteNetCost,
      "quote_date": quoteDate
    },
  };
  functions.logger.log("data for email: ", data);
  return data;
};

const setupApiKey = async () => {
  return firestore.doc("/apis/sendgrid").get().then((doc) => {
    if (doc.exists) {
      // functions.logger.log("API_KEY: ", doc.data().key);
      return sgMail.setApiKey(doc.data().key);
    } else {
      throw new Error("Could not find SendgridApiKey");
    }
  });    
};

const handleSendEmails = async function(event, context) {
  try {
    const { quoteDetails, boxes, totalDiscount, preDiscountedCost, discountedCost } = event.data();
    // Access the parameter `{quoteId}` with `context.params`
    const quoteRef = context.params.quoteId;
    const quoteQty = boxes.map((box) => box.qty).reduce((a, b)=> a + b, 0);
    const quoteNetCost = discountedCost;
    const quoteDate = (new Date()).toLocaleDateString();
    const boxesListString = getBoxesInString(boxes);
    await setupApiKey();
    const salesEmail = await getSalesEmail();
    await sgMail.send(emailData({ to: salesEmail, templateId: SALES_EMAIL_TEMPLATE_ID, quoteDate, quoteDetails, quoteNetCost, quoteQty, boxesListString, totalDiscount, preDiscountedCost, quoteRef }));
    await sgMail.send(emailData({ to: quoteDetails.email, templateId: CLIENT_EMAIL_TEMPLATE_ID, quoteDate, quoteDetails, quoteNetCost, quoteQty, boxesListString, totalDiscount, preDiscountedCost, quoteRef }));
    functions.logger.log("Succesfully sent quote emails");
    return "Success";
  } catch (error) {
    functions.logger.error("Error while processing quote emails sending:", error);
    return "Error";
  }
};

/**
 * Triggered by a change to a Firestore document.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.sendQuoteEmails = functions
  .region("europe-west2")
  .firestore
  .document("/quotes/{quoteId}")
  .onCreate(handleSendEmails);

// Functions to fill up and update a box idea when creating a box idea or when updating or deleting a product
// It can be called with a single ID:
// getById('collection', 'some_id')
// or an array of IDs:
// getById('collection', ['some_id', 'some_other_id'])
const getDocumentsByIds = (path, ids) => {
  return firestore.getAll(
    ...[].concat(ids).map(id => firestore.doc(`${path}/${id}`))
  )
}
      
const handleUpdateBoxIdeaAfterProductUpdate = async function(change, context) {
  try {
    const productData = change.after.exists ? change.after.data() : null;
    const boxIdeasRef = firestore.collection('boxIdeas');
    const updatedDocs = await firestore.runTransaction(async (transaction) => {
      transaction.get(boxIdeasRef).then(res => {
      });
      return transaction.get(boxIdeasRef)
      .then(res => {
        let updatedBoxIdeas = [];
        res.docs.forEach(boxIdea => {
          const boxIdeaData = boxIdea.data(); 
          let updatedVariants = [];
          let boxIdeaNeedsUpdate = false;
          boxIdeaData.variants.forEach(variant => {
            let updatedItems = [];
            variant.items.forEach(item => {
              let updatedItem = item;
              if (item.productId === context.params.productId) {
                updatedItem = { ...item, productInfos: productData};
                boxIdeaNeedsUpdate = true;
                if (productData && productData.variants.filter(v => v.sku === item.variantSKU).length > 0) {
                  updatedItems.push(updatedItem);
                } else {
                  functions.logger.log("A product or a variant of the product included in a box idea has been deleted, so the Box Idea ", boxIdeaData.title ," will be recomputed without the product ", change.before.data().title);
                }
              } else {
                updatedItems.push(updatedItem); 
              }
            });
            const { boxPrice, minBoxPrice, currency, boxNumberOfItems } = computeBoxVariantPricesWithItemsInfos(updatedItems);
            updatedVariants.push({ ...variant, items: updatedItems, boxPrice, minBoxPrice, currency, boxNumberOfItems });
          });
          const updatedDoc = { ...boxIdeaData, variants: updatedVariants };
          if (boxIdeaNeedsUpdate) {
            transaction.update(boxIdea.ref, updatedDoc);
            updatedBoxIdeas.push(boxIdea.id);
          }
        });
        return updatedBoxIdeas;
      });
    });
    functions.logger.log("Updated box ideas:", updatedDocs);
  
  } catch (error) {
    functions.logger.error("Error while updating boxIdea after update on product: ", error);
    return "Error";
  }
};

exports.updateBoxIdeaAfterProductUpdate = functions
  .region("europe-west2")
  .firestore
  .document('products/{productId}')
  .onWrite(handleUpdateBoxIdeaAfterProductUpdate)

// Compute totalCost and minTotalCost of Box
const computeBoxVariantPricesWithItemsInfos = (items) => {
  const itemsPricesDetails = items.map(item => {
    const { min_price, price, currency } = item.productInfos.variants.filter(variant => variant.sku === item.variantSKU)[0];
    return { qty: item.qty, minPrice: min_price, price, currency }
  });
  const boxPrice = itemsPricesDetails.reduce((a,b) => a + (b.price * b.qty), 0);
  const minBoxPrice = itemsPricesDetails.reduce((a,b) => a + (b.minPrice * b.qty), 0);
  const currency = itemsPricesDetails.reduce((a,b) => a === b.currency && '£' || 'NA', '£')
  const boxNumberOfItems = itemsPricesDetails.reduce((a,b) => a + b.qty, 0);
  return { boxPrice, minBoxPrice, currency, boxNumberOfItems };
};

const addDisplayVariantsToProduct = (data) => {
  if (data && data["variants"]) {
    data["variants"] = data["variants"].map((variant) => {
      return {
        ...variant, 
        label: variant.property_value + " " + variant.property_unit + " - " + variant.currency +  " " + variant.price,
        id: variant.sku,
        value: variant.sku
      }
    });
    return data;
  } else {
    data["variants"] = [{label: "Non Available", id: "Non Available", value: "Non Available" }];
    return data;
  }
};

const handleAfterWriteBoxIdea = async (change, context) => {
  try {
    if (change.after.exists) {
      const variants = change.after.data().variants;
      const productIds = variants.map(variant => variant.items.map(item => item.productId)).flat(2);
      const productSnaps = await getDocumentsByIds('products', productIds);
      let products = {};
      await productSnaps.forEach((snap) => { 
        products[snap.id] = addDisplayVariantsToProduct(snap.data());
      });
      // Get a reference to the boxIde
      const boxIdeaRef = firestore.collection('boxIdeas').doc(context.params.boxIdeaId);
    
      // Update boxIdea in a transaction
      await firestore.runTransaction(async (transaction) => {
        // Get document
        const boxIdeaDoc = await transaction.get(boxIdeaRef);
        const boxIdeaData = boxIdeaDoc.data();
        // FillUp products and variants details
        const variants = boxIdeaData.variants;
        const updatedVariants = variants.map(variant => {
          const updatedItems = variant.items.map(item => {
            return { ...item, productInfos: products[item.productId] }
          });
          const { boxPrice, minBoxPrice, currency, boxNumberOfItems } = computeBoxVariantPricesWithItemsInfos(updatedItems);
          return { ...variant, items: updatedItems, boxPrice, minBoxPrice, currency, boxNumberOfItems };
        });
        functions.logger.log("updatedVariants: ", updatedVariants);
        // Update boxIdea infos
        transaction.update(boxIdeaRef, { ...boxIdeaData, variants: updatedVariants });
      });
    } else {
      functions.logger.log("Nothing filled up for deleted document.");
    }
  } catch (error) {
    functions.logger.error("Error while updating boxIdea with products infos: ", error);
    return "Error";
  }
};

exports.updateAfterWriteBoxIdea = functions
  .region("europe-west2")
  .firestore
  .document('boxIdeas/{boxIdeaId}')
  .onWrite(handleAfterWriteBoxIdea);