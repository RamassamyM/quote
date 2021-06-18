import sendEmail from '../sendEmail';

const sendQuoteEmailToSales = ({
  to, 
  firstName = "Josh", 
  quoteDate, 
  clientFirstName, 
  clientLastName, 
  clientCompanyName,
  clientEmail,
  clientPhone,
  quoteQty,
  quoteNetCost 
}) => {
  sendEmail({
    to,
    "template_id": "d-93b9ef4419514b11bcc14250841fc3a6",
    "dynamicTemplateData": {
      "first_name": firstName,
      "quote_date": quoteDate,
      "client_first_name": clientFirstName,
      "client_last_name": clientLastName,
      "client_company_name": clientCompanyName,
      "client_email": clientEmail,
      "client_phone": clientPhone,
      "quote_qty": quoteQty,
      "quote_net_cost": quoteNetCost
    }
  });
};

export default sendQuoteEmailToSales; 