import fire from './../../fire';

export const loadProducts = async () => {
  const db = fire.firestore();
  let results = [];
  await db.collection("products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      results.push({id: doc.id, ...doc.data()});
    });
  });
  return results;
}

export const loadProductsForCategory = async (category) => {
  const db = fire.firestore();
  let results = [];
  await db.collection("products").where("category", "==", category).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      results.push({id: doc.id, ...doc.data()});
    });
  });
  return results;
}