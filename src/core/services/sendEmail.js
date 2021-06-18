import sgMail from '@sendgrid/mail';
import { fetchEmailApiParams } from './firestore-requests';

const emailApiParams = fetchEmailApiParams();
sgMail.setApiKey(emailApiParams.apikey);

const sendEmail = ({to, from = emailApiParams.defaultSenderEmail, template_id, dynamicTemplateData}) =>  {
  console.log("Sending Email to ", to);
  sgMail.send({to, from, template_id, dynamicTemplateData});
};

export default sendEmail;