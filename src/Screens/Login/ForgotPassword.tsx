import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { size, get } from 'lodash';
import Body from '../Element/Body';
import Colors from '../../Style/Colors';
import UIText from '../../Component/UIText';
import CommonStyles from '../../Style/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';
import Toast from 'react-native-toast-message';
import { forgotPassword, resetAction } from "../../Actions/userPageAction";
import { connect } from "react-redux";
import CommonVariable from '../../Style/Variable';
import Config from '../../config';
import axios from "axios";
const ForgotPassword = (props: any) => {
    const navigation = useNavigation();
    const [phone, setPhone] = useState('');

    const onClick = () => {
        const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (phone !== '') {
            if (vnf_regex.test(phone) == false) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Thông báo',
                    text2: "Số điện thoại của bạn không đúng định dạng",
                    visibilityTime: 1000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
            } else {
                axios.post(`${Config.api.api_base_url}/api/forgotPassword?phone=${phone}`)
                    .then(response => {
                        if (response.data.success && response.data.message === 'Hệ thống đã gửi mật khẩu mới vào số điện thoại.') {
                            Toast.show({
                                type: 'success',
                                position: 'top',
                                text1: 'Thông báo',
                                text2: response.data.message,
                                visibilityTime: 1000,
                                autoHide: true,
                                topOffset: 30,
                                bottomOffset: 40,
                                onHide: () => {
                                    navigation.navigate(RouteNames.LOGINPHONE)
                                }
                            });
                        } else {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Thông báo',
                                text2: response.data.message,
                                visibilityTime: 1000,
                                autoHide: true,
                                topOffset: 30,
                                bottomOffset: 40,
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }

    return (

        <Body
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={[CommonStyles.center]}>
                <Image source={require('../../assets/login.png')} style={{ width: CommonVariable.screenWidth, height: 250 }} />
            </View>
            <View>
                <TextInput
                    placeholder="Số điện thoại"
                    placeholderTextColor="#707070"
                    style={styles.textInput}
                    onChangeText={value => setPhone(value)}
                />
                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnLogin}
                        onPress={() => onClick()}>
                        <UIText style={styles.textBtn}>Xác nhận</UIText>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30,
                        paddingBottom: 30
                    }}>
                    <UIText style={{ marginRight: 10, fontSize: 15, color: 'black' }}>Bạn có tài khoản?</UIText>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            navigation.navigate(RouteNames.LOGINPHONE)
                        }
                    >
                        <UIText style={{ fontSize: 15, fontWeight: 'bold', color: Colors.mainColor }}>Đăng nhập</UIText>
                    </TouchableOpacity>
                </View>
            </View>
        </Body>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'white',
        color:'black',
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

ForgotPassword.defaultProps = {
    userPage: {
        data: {},
        isFetching: false
    },
};
const mapStateToProps = (state: any) => {
    return {
        'userPage': state.userPage
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        forgotPassword: (username: string) => {
            dispatch(forgotPassword(username))
        },
        resetAction: () => {
            dispatch(resetAction())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
