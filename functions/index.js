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

exports.sendQuoteEmailToSales = functions.https.onRequest(app);


