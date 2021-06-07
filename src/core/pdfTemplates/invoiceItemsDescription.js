import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({     
    itemsContainer:{
        fontSize: 8,
    },
    container: {
        marginTop: 10,
    },
    boxName:{
        fontSize: 10,
    },
    title: {
        color: '#0094CA',
        fontSize: 10,
    },
});


const InvoiceItemsDescription = ({boxes}) => {
    const Items = ({items}) => {
        return items.map(item => 
            <View style={styles.itemsContainer} key={`item_${item.variantSelected.sku}`}>
                <Text>- {item.qty} x {item.product.title} {item.variantSelected.label}</Text>
            </View>
        );
    };
    const rows = boxes.map( (box) => 
        <View key={`box_${box.id}`}>
            <Text style={styles.boxName}>{box.id + 1}. {box.name}:</Text>
            <Items items={box.items}/>          
        </View>
    );
    return (<Fragment>
                <View style={styles.container}>
                    <Text style={styles.title}>Content of boxes:</Text>
                </View>
                {rows}
            </Fragment>
    );
};
  
export default InvoiceItemsDescription