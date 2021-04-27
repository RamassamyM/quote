import fire from './../fire';
// import seeds from './seed';
import fs from 'fs';

const jsonFilepath = './seed.json';
const data=fs.readFileSync(jsonFilepath, 'utf8');
const seeds=JSON.parse(data);

const seed = () => {
  const db = fire.firestore();
  seeds.forEach(element => {
    console.log("Adding product to Firestore: ", element.title)
    db.collection("products").add(element).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  });
};

export default seed;

