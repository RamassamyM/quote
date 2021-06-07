import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#0094CA',
        padding: 15,
    },
    reportTitle:{
        color: '#FFFFFF',
        // letterSpacing: 2,
        fontSize: 22,
        textAlign: 'center',
    }
  });


  const InvoiceTitle = ({title}) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
  
  export default InvoiceTitle