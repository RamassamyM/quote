const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const { configureStore } = require("@reduxjs/toolkit");
admin.initializeApp();
const sgMail = require("@sendgrid/mail");
const { AssignmentReturn } = require("@material-ui/icons");
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
      functions.logger.log("Sales_email: ", doc.data().email);
      email = doc.data().email;
    } else {
      functions.logger.log("Sales_email is default: contact@curakit.com");
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
      functions.logger.log("API_KEY: ", doc.data().key);
      return sgMail.setApiKey(doc.data().key);
    } else {
      throw new Error("Could not find SendgridApiKey");
    }
  });    
};

const handleSendEmails = async function(snap, context) {
  try {
    const { quoteDetails, boxes, totalDiscount, preDiscountedCost } = snap.data();
    // Access the parameter `{quoteId}` with `context.params`
    const quoteRef = context.params.quoteId;
    const quoteQty = boxes.map((box) => box.qty).reduce((a, b)=> a + b, 0);
    const quoteNetCost = preDiscountedCost - totalDiscount;
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
