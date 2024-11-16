import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { size, get } from 'lodash';
import Body from '../Element/Body';
import Colors from '../../Style/Colors';
import UIText from '../../Component/UIText';
import CommonStyles from '../../Style/CommonStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';
import Toast from 'react-native-toast-message';
import { loginAction, resetAction, getUserData } from "../../Actions/userPageAction";
import { connect } from "react-redux";
import CommonVariable from '../../Style/Variable';
import axios from "axios";

const OTPScreen = (props: any) => {
    const navigation = useNavigation();
    const [OTP, setOTP] = useState('');
    const route = useRoute();
    const param = route.params as any;

    if (props.userPage.isFetching === false && props.userPage.message !== "") {
        Toast.show({
            type: get(props, 'userPage.error', true) === true ? 'error' : 'success',
            position: 'top',
            text1: 'Thông báo',
            text2: props.userPage.message,
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onHide: () => {
                if (get(props, 'userPage.message', '') === "Đăng nhập thành công") {
                    props.getUserData();
                    navigation.navigate("MainDrawer", { screen: RouteNames.HOMESCREEN })
                }
            },
            onShow: () => {
                props.resetAction();
            },
        });
    }
    const verify = () => {
        if (OTP === "") {
            Toast.show({
                type: 'info',
                position: 'top',
                text1: 'Thông báo',
                text2: 'Vui lòng nhập mã OTP',
                visibilityTime: 1000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        } else {
            const data = {
                phone: param.phone,
                otp_code: OTP
            }
            axios.post(`http://api.idoctors.vn/api/verify-phone`, data)
                .then(response => {
                    if (response.data.success && response.data.message === 'Mã xác nhận chính xác') {
                        props.loginAction(param.phone, param.password);
                    } else {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Thông báo',
                            text2: response.data.message,
                            visibilityTime: 1000,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40
                        });
                    }
                })
                .catch(error => {
                    Alert.alert(error)
                })
        }
    }

    return (

        <Body
            style={styles.container}
        // contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
            <View style={[CommonStyles.center, { marginTop: 100 }]}>
                <Image source={require('../../assets/login.png')} style={{ width: CommonVariable.screenWidth, height: 250 }} />

            </View>
            <View style={{ marginTop: 30 }}>
                <UIText style={{ paddingHorizontal: 15, fontSize: 15, color: Colors.mainColor, textAlign: 'center' }}>Nhập mã OTP để xác thực đăng nhập</UIText>
                <TextInput
                    placeholder="Mã OTP"
                    placeholderTextColor="#6A6A6A"
                    style={styles.textInput}
                    onChangeText={value => setOTP(value)}
                    keyboardType="numeric"
                    autoFocus={true}
                />
            </View>
            <View style={{ marginTop: 30, justifyContent: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnLogin}
                    onPress={() => verify()}>
                    <UIText style={styles.textBtn}>Đăng nhập</UIText>
                </TouchableOpacity>
            </View>
        </Body>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
    },
    textInput: {
        textAlign: 'center',
        borderWidth: 1,
        color:'black',
        borderColor: 'white',
        fontSize: 16,
        marginHorizontal: 25,
        marginTop: 20,
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.16,
        shadowRadius: 3.84,

        elevation: 5,
        opacity: 1
    },
    btnLogin: {
        height: 50,
        marginHorizontal: 30,
        backgroundColor: Colors.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 25,
    },
    textBtn: {
        fontSize: 15,
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },

});

const mapStateToProps = (state: any) => {
    return {
        userPage: state.userPage
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginAction: (phone: string, password: string) => {
            dispatch(loginAction(phone, password))
        },
        resetAction: () => {
            dispatch(resetAction())
        },
        getUserData: () => {
            dispatch(getUserData())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
