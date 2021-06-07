import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#42575F';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        // fontStyle: 'bold',
    },
    container: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '50%',
        textAlign: 'left',
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    unitPrice: {
        width: '10%',
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 6,
        fontSize: 10,
    },
    qty: {
        width: '10%',
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 6,
        fontSize: 10,
    },
    preDiscountedCost: {
        width: '10%',
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 6,
        fontSize: 10,
    },
    discount: {
        width: '10%',
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 6,
        fontSize: 10,
    },
    amount: {
        width: '10%',
        textAlign: 'right',
        paddingRight: 6,
        fontSize: 10,
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( box => 
        <View style={styles.container} key={`box_${box.id}`}>
            <Text style={styles.description}>{box.name}</Text>
            <Text style={styles.unitPrice}>{box.unitPrice}</Text>
            <Text style={styles.qty}>{box.qty}</Text>
            <Text style={styles.preDiscountedCost}>{ box.qty * box.unitPrice }</Text>
            <Text style={styles.discount}>{box.discount}</Text>
            <Text style={styles.amount}>{(box.qty * box.unitPrice) - box.discount}</Text>
        </View>
    );
    return (<Fragment>{rows}</Fragment> );
};
  
export default InvoiceTableRow