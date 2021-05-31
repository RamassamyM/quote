import React from "react";
import { Page, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logo from './../../assets/curakit-logo-blue.png'; 
import InvoiceTitle from './invoiceTitle'
import BillTo from './billTo'
import InvoiceNo from './invoiceNo'
import InvoiceItemsTable from './invoiceItemsTable'
import InvoiceThankYouMsg from './invoiceThankYouMsg'

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
        // height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

export default function Quote(props) {
    const data = props.data;
    const totalDiscount = data.totalDiscount;
    const preDiscountedCost = data.preDiscountedCost;
    const netCost = preDiscountedCost - totalDiscount;
    const today = new Date(Date.now());
    const date = today.toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' });
    const number = today.toLocaleDateString('en-EN', {year: 'numeric', month: 'numeric', day: 'numeric'}).split('/').join('');
    const invoice = {
        id: '001',
        invoice_no: number,
        netCost: netCost,
        contact: `${data.quoteDetails.firstName} ${data.quoteDetails.lastName}`,
        position: data.quoteDetails.jobTitle,
        company: data.quoteDetails.companyName,
        email: data.quoteDetails.email,
        phone: data.quoteDetails.phone,
        address: 'no address',
        trans_date: date,
        items: data.boxes
    }
    console.log("pdf props:", data);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image style={styles.logo} src={logo} />
                <InvoiceTitle title='Quote'/>
                <InvoiceNo invoice={invoice}/>
                <BillTo invoice={invoice}/>
                <InvoiceItemsTable invoice={invoice}/>
                <InvoiceThankYouMsg />
            </Page>
        </Document>
    );
}
