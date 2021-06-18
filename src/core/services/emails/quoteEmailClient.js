import sendEmail from '../sendEmail';

const sendQuoteEmailToClient = ({
  to, 
  clientFirstName, 
  clientLastName, 
  clientCompanyName,
  clientEmail,
  clientPhone,
}) => {
  sendEmail({
    to,
    "template_id": "d-8ff0ad311b074b85ade899f727c95374",
    "dynamicTemplateData": {
      "first_name": clientFirstName,
      "last_name": clientLastName,
      "email": clientEmail,
      "company": clientCompanyName,
      "phone": clientPhone
    }
  });
};

export default sendQuoteEmailToClient; 