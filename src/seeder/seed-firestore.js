import fire from './../fire';
import seeds from './seed';


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

