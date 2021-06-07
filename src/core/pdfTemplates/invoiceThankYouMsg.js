import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        marginTop: 60,
        textAlign: 'center',
    },
    reportTitle:{
        color: '#0094CA',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 6,
    },
    disclaimer: {
        fontSize: 8,
        color: '#42575F',
        marginTop: 10,
        marginBottom: 8,
    },
    contact: {
        fontSize: 10,
        color: '#42575F',
    },
    line: {
        marginTop: 50,
        height: 5,
        backgroundColor: '#0094CA',
    }
});


const InvoiceThankYouMsg = () => (
    <Fragment>
        <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>Thank you for choosing Curakit !</Text>
            <Text style={styles.disclaimer}>*Quote is indicative of price and not final. Prices subject to change without prior notice. Please contact us to get a firm quote.</Text>
            <Text style={styles.contact}>Please contact us for any inquiry about this quote at sales@curakit.com.</Text>
            <Text style={styles.contact}>Phone: 020 3404 8090</Text>
            <Text style={styles.contact}>Address: Block D, Imperial Works, Perren Street, London, NW5 3ED</Text>
        </View>
        <View style={styles.line}></View>
    </Fragment>
);
  
export default InvoiceThankYouMsg