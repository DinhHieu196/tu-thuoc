import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { RouteNames } from './route-names';
import { connect } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '../Utilities/Storage';
import { resetOrder } from '../Actions/ordersPageAction';
import { useNavigation } from '@react-navigation/native';

const ButtonBack = (props: any) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={async () => {
            navigation.goBack();
            props.resetOrder();
        }} activeOpacity={0.8} style={{ flexDirection: "row", alignItems: 'center', marginLeft: 10 }}>
            <AntDesign name="left" size={25} color="white" />
            <Text style={{ color: 'white', fontSize: 18 }}>Back</Text>
        </TouchableOpacity>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        resetOrder: () => {
            dispatch(resetOrder());
        },
    };
};

export default connect(null, mapDispatchToProps)(ButtonBack);
