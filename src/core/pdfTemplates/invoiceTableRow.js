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
        width: '30%',
        textAlign: 'left',
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    unitPrice: {
        width: '15%',
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
        width: '15%',
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 6,
        fontSize: 10,
    },
    discount: {
        width: '15%',
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 6,
        fontSize: 10,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 6,
        fontSize: 10,
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( box => 
        <View style={styles.container} key={`box_${box.id}`}>
            <Text style={styles.description}>{box.name}</Text>
            <Text style={styles.unitPrice}>{Number.parseFloat(box.unitPrice).toFixed(2)}</Text>
            <Text style={styles.qty}>{box.qty}</Text>
            <Text style={styles.preDiscountedCost}>{Number.parseFloat(box.prediscountedCost).toFixed(2)}</Text>
            <Text style={styles.discount}>{Number.parseFloat(box.discount).toFixed(2)}</Text>
            <Text style={styles.amount}>{Number.parseFloat(box.discountedCost).toFixed(2)}</Text>
        </View>
    );
    return (<Fragment>{rows}</Fragment> );
};
  
export default InvoiceTableRow