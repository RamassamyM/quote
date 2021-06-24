import React from "react";
import { Page, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logo from './../../assets/curakit-logo-blue.png'; 
import InvoiceTitle from './invoiceTitle'
import BillTo from './billTo'
import InvoiceNo from './invoiceNo'
import InvoiceItemsTable from './invoiceItemsTable'
import InvoiceThankYouMsg from './invoiceThankYouMsg'
import InvoiceItemsDescription from './invoiceItemsDescription'

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 90,
    }
});

export default function Quote(props) {
    const data = props.data;
    const quoteRef = props.quoteRef;
    const totalDiscount = data.totalDiscount;
    const preDiscountedCost = data.preDiscountedCost;
    const netCost = preDiscountedCost - totalDiscount;
    const today = new Date(Date.now());
    const date = today.toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' });
    // const number = today.toLocaleDateString('en-EN', {year: 'numeric', month: 'numeric', day: 'numeric'}).split('/').join('');
    const totalQtyOfBoxes = data.boxes.map((box) => box.qty ).reduce((a, b)=> a + b,0);
    const addCompanyLogo = data.quoteDetails.addCompanyLogo && "yes" || "no";
    const addCustomMessage = data.quoteDetails.addCustomMessage && "yes" || "no";
    const invoice = {
        id: '001',
        invoice_no: quoteRef,
        netCost: netCost,
        contact: `${data.quoteDetails.firstName} ${data.quoteDetails.lastName}`,
        position: data.quoteDetails.jobTitle,
        company: data.quoteDetails.companyName,
        email: data.quoteDetails.email,
        phone: data.quoteDetails.phone,
        delivery: data.quoteDetails.delivery,
        addCompanyLogo: addCompanyLogo,
        addCustomMessage: addCustomMessage,
        address: 'no address',
        trans_date: date,
        items: data.boxes,
        totalQty: totalQtyOfBoxes,
    };
    console.log("Invoice_data: ", invoice);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image style={styles.logo} src={logo} />
                <InvoiceTitle title='Quote'/>
                <InvoiceNo invoice={invoice}/>
                <BillTo invoice={invoice}/>
                <InvoiceItemsTable invoice={invoice}/>
                <InvoiceItemsDescription boxes={invoice.items} addCompanyLogo={invoice.addCompanyLogo} addCustomMessage={invoice.addCustomMessage}/>
                <InvoiceThankYouMsg />
            </Page>
        </Document>
    );
}
