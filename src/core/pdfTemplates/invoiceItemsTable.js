import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './invoiceTableHeader'
import InvoiceTableRow from './invoiceTableRow'
// import InvoiceTableBlankSpace from './invoiceTableBlankSpace'
import InvoiceTableFooter from './invoiceTableFooter'

// const tableRowsCount = 4;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 18,
        borderWidth: 1,
        borderColor: '#42575F',
    },
});

  const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice.items} />
        {/* <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.items.length} /> */}
        <InvoiceTableFooter qtyOfBoxes={invoice.totalQty} netCost={invoice.discountedCost} delivery={invoice.delivery}/>
    </View>
  );
  
  export default InvoiceItemsTable