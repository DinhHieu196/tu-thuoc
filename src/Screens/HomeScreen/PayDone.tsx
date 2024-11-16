import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import UIText from '../../Component/UIText';
import Body from '../Element/Body';
import Colors from '../../Style/Colors';
import CommonStyles from '../../Style/CommonStyles';
import { RouteNames } from '../../Router/route-names';
import { useNavigation } from '@react-navigation/native';
import { resetCart, fetchDataCart } from "../../Actions/cartlPageAction";
import { connect } from "react-redux";

const PayDone = (props: any) => {

    const navigation = useNavigation();
    useEffect(() => {
        props.fetchDataCart();
        props.resetCart();
    }, [])
    const PayDone = () => {
        navigation.navigate(RouteNames.HOMESCREEN)
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Body contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <UIText style={styles.payDone}>ĐẶT HÀNG THÀNH CÔNG</UIText>
                    <Image source={require('../../assets/task-complete.png')} />
                </View>
            </Body>
            <TouchableOpacity
                activeOpacity={0.9}
                style={[CommonStyles.center, styles.btnLogOut]}
                onPress={() => PayDone()}>
                <UIText style={{ fontSize: 18, color: "white", fontWeight: 'bold' }}>TRANG CHỦ</UIText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    payDone: {
        color: "#707070",
        marginBottom: 15,
        fontSize: 20
    },
    btnLogOut: {
        backgroundColor: Colors.mainColor,
        margin: 15,
        paddingVertical: 10,
        marginBottom: 30
    }
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        resetCart: () => {
            dispatch(resetCart())
        },
        fetchDataCart: () => {
            dispatch(fetchDataCart())
        }
    };
};
export default connect(null, mapDispatchToProps)(PayDone);