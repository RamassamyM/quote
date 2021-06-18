import fire from './../../fire';


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
  const db = fire.firestore();
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
  const db = fire.firestore();
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

export const fetchEmailApiParams = async () => {
  const db = fire.firestore();
  let emailApiParams = {};
  await db.collection("apis").where("api_name", "==", "sendgrid").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          emailApiParams = {
            "apikey": doc.data().api_key,
            "defaultSenderName": doc.data().defaul_sender_name,
            "defaultSenderEmail": doc.data().default_sender_email,
          };
      });
  });
  return emailApiParams;
}