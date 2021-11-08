import fire from './../fire';
import seedProducts from './seed-products';
import seedBoxes from './seed-boxes';
// import fs from 'fs';
// const jsonFilepath = './seed.json';
// const data = fs.readFileSync(jsonFilepath, 'utf8');
// const seeds = JSON.parse(data);
const db = fire.firestore();
// db.useEmulator("localhost", 8080);

const seedAllProducts = () => {
  seedProducts.forEach(element => {
    console.log("Adding product to Firestore: ", element.title)
    db.collection("products").add(element).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  });
};

export default seedAllProducts;

export const seedAllBoxes = () => {
  seedBoxes.forEach(element => {
    console.log("Adding premade boxes to Firestore: ", element.title)
    db.collection("boxIdeas").add(element).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  });
};
