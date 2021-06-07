import React, { Fragment }  from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 10,
        marginBottom: 4,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    billTo: {
        color: '#0094CA',
        fontSize: 10,
    },
    detail: {
        fontSize: 10,
        color: '#42575F',
    },
    label: {
        color: '#A4B0B5',
        fontSize: 10,
    },
  });


  const BillTo = ({invoice}) => (
    <Fragment>
        <View style={styles.headerContainer}>
            <Text style={styles.billTo}>Customer:</Text>
        </View>
        <View style={styles.detailContainer}>
            <Text style={styles.label}>Company Name: </Text>
            <Text style={styles.detail}>{invoice.company}</Text>
        </View>
        <View style={styles.detailContainer}>
            <Text style={styles.label}>Contact: </Text>
            <Text style={styles.detail}>{invoice.contact}</Text>
        </View>
        <View style={styles.detailContainer}>
            <Text style={styles.label}>Job Title: </Text>
            <Text style={styles.detail}>{invoice.position}</Text>
        </View>
        <View style={styles.detailContainer}>
            <Text style={styles.label}>Phone: </Text>
            <Text style={styles.detail}>{invoice.phone}</Text>
        </View>
        <View style={styles.detailContainer}>
            <Text style={styles.label}>Email: </Text>
            <Text style={styles.detail}>{invoice.email}</Text>
        </View>
    </Fragment>

  );
  
  export default BillTo