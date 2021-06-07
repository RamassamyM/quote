import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#42575F';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        backgroundColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 26,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        color: 'white',
    },
    description: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    preDiscountedCost: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    unitPrice: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    discount: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '10%'
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Box Description</Text>
        <Text style={styles.unitPrice}>U.P.</Text>
        <Text style={styles.qty}>Qty</Text>
        <Text style={styles.preDiscountedCost}>Cost</Text>
        <Text style={styles.discount}>Discount</Text>
        <Text style={styles.amount}>Amount</Text>
    </View>
  );
  
  export default InvoiceTableHeader