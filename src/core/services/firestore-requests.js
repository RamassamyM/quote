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

export const fetchBoxIdeas = async () => {
  let results = [];
  await db.collection("boxIdeas").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      results.push({boxIdeaId: doc.id, ...data});
    });
  });
  console.log("Firestore fetched!");
  // console.log("results: ", results);
  return results;
}

export const fetchProducts = async () => {
  let results = [];
  await db.collection("products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = addDisplayVariantsToProducts(doc.data());
      results.push({productId: doc.id, ...data});
    });
  });
  console.log("Firestore fetched!");
  return results;
}

export const fetchProductsByCategory = async (category) => {
  let results = [];
  await db.collection("products").where("category", "==", category).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = addDisplayVariantsToProducts(doc.data());
      results.push({productId: doc.id, ...data});
    });
  });
  console.log("Firestore fetched for category!");
  return results;
}

export const storeQuoteToDb = async ({ boxes, quoteDetails, totalDiscount, preDiscountedCost, discountedCost }) => {
  console.log("Posting Quote to Firestore...")
  let refId = "";
  await db.collection("quotes").add({ boxes, quoteDetails, totalDiscount, preDiscountedCost, discountedCost })
  .then((docRef) => {
      console.log("Document Quote written with ID: ", docRef.id);
      refId = docRef.id;
  })
  .catch((error) => {
      console.error("Error adding quote document: ", error);
  });
  return refId;
}
