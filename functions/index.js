const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

// Add middleware to authenticate requests
// app.use(myMiddleware);

const sendEmail = ({to, from, templatId, dynamicTemplateData}) => {
  console.log("Sending Email to ", to);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send({to, from, templatId, dynamicTemplateData});
  return "Successfully sent email";
};

app.post("/", (req, res) => res.send(sendEmail(req.body)));

// exports.sendQuoteEmailToSales = functions.https.onRequest(app);

exports.sendQuoteEmailToSales = functions.firestore
  .document('quotes/{docId}')
  .onCreate((snap, context) => { 
    const {to, from, templatId, dynamicTemplateData} = snap.data();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send({to, from, templatId, dynamicTemplateData})
    .then(() => {}, error => {
      console.error("Error when sending email: ", error);
    })
  });