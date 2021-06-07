import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#FFFFFF';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 0,
        alignItems: 'center',
        height: 18,
        fontSize: 10,
        color: '#A4B0B5',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    totalLabel: {
        color: '#EF4648',
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        color: '#EF4648',
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
        fontSize: 10,
    },
    subcost: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableFooter = ({netCost, delivery, qtyOfBoxes}) => {
    let deliveryCost = 0;
    let deliveryLabel = "";
    if (delivery === "company") {
        deliveryCost = qtyOfBoxes * 0.20;
        deliveryLabel = "to company (£0.20 per box, min £5)"
    } else {
        deliveryCost = qtyOfBoxes * 3;
        deliveryLabel = "to individuals (£3 per box)"
    }
    if (deliveryCost < 5) {
        deliveryCost = 5;
    }
    const subtotal = Number.parseFloat(netCost).toFixed(2);
    const netTotal = Number.parseFloat(deliveryCost + netCost).toFixed(2);
    return(   
        <Fragment>
            <View style={styles.row}>
                <Text style={styles.description}>Sub-total</Text>
                <Text style={styles.subcost}>£&nbsp;{ subtotal }</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>Shipping {deliveryLabel}</Text>
                <Text style={styles.subcost}>£&nbsp;{ deliveryCost.toFixed(2) }</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.totalLabel}>TOTAL ORDER</Text>
                <Text style={styles.total}>£&nbsp;{ netTotal }</Text>
            </View>
        </Fragment> 
    );
};
  
  export default InvoiceTableFooter