import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContent: {
        fontSize: 10,
        fontStyle: 'bold',
        marginRight: 10,
        color: '#42575F',
    },
    label: {
        color: '#0094CA',
        fontSize: 10,
    }
    
  });


  const InvoiceNo = ({invoice}) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Quote ID </Text>
                <Text style={styles.textContent}>{invoice.invoice_no}</Text>
                <Text style={styles.label}>Date: </Text>
                <Text style={styles.textContent}>{invoice.trans_date}</Text>
            </View >
            {/* <View style={styles.invoiceDateContainer}>
            </View > */}
        </Fragment>
  );
  
  export default InvoiceNo