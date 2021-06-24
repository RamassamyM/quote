import fire from './../../fire';

const db = fire.firestore();
// uncomment this line to use online firebase
// db.useEmulator("localhost", 8080);

const addDisplayVariantsToProducts = (data) => {
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

export const fetchProducts = async () => {
  let results = [];
  await db.collection("products").get().then((querySnapshot) => {
    console.log("Firestore fetched!");
    querySnapshot.forEach((doc) => {
      const data = addDisplayVariantsToProducts(doc.data());
      results.push({productId: doc.id, ...data});
    });
  });
  return results;
}

export const fetchProductsByCategory = async (category) => {
  let results = [];
  await db.collection("products").where("category", "==", category).get().then((querySnapshot) => {
    console.log("Firestore fetched for category!");
    querySnapshot.forEach((doc) => {
      const data = addDisplayVariantsToProducts(doc.data());
      results.push({productId: doc.id, ...data});
    });
  });
  return results;
}

export const storeQuoteToDb = async ({ boxes, quoteDetails, totalDiscount, preDiscountedCost }) => {
  console.log("Posting Quote to Firestore...")
  let refId = "";
  await db.collection("quotes").add({ boxes, quoteDetails, totalDiscount, preDiscountedCost })
  .then((docRef) => {
      console.log("Document Quote written with ID: ", docRef.id);
      refId = docRef.id;
  })
  .catch((error) => {
      console.error("Error adding quote document: ", error);
  });
  return refId;
}
