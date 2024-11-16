import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Body from '../Element/Body';
import Colors from '../../Style/Colors';
import UIText from '../../Component/UIText';
import CommonStyles from '../../Style/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';
import Toast from 'react-native-toast-message';
import CommonVariable from '../../Style/Variable';
import Config from '../../config';
import { getData } from '../../Utilities/Storage';
import axios from "axios";

const ChangePassword = (props: any) => {
    const navigation = useNavigation();
    const [old, setOld] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        getData('userData')
            .then(res => setToken(res))
    }, [])

    const submit = () => {
        fetch(`${Config.api.api_base_url}/api/profile/resetPassword?password_old=${old}&password=${password}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok && response.status === 200) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Thông báo',
                        text2: "Đổi mật khẩu thành công",
                        visibilityTime: 1000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                        onHide: () => {
                            navigation.goBack();
                        }
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Thông báo',
                        text2: "Kiểm tra lại mật khẩu cũ",
                        visibilityTime: 1000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40
                    });
                }
            })
            .catch((error) => {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Thông báo',
                    text2: "Xảy ra lỗi",
                    visibilityTime: 1000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40
                });
            })
    }
    return (
        <Body
            style={styles.container}>
            <View style={[CommonStyles.center]}>
                <Image source={require('../../assets/login.png')} style={{ width: CommonVariable.screenWidth, height: 250 }} />
            </View>
            <View>
                <TextInput
                    placeholder="Mật khẩu hiện tại"
                    placeholderTextColor="#707070"
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={value => setOld(value)}
                />
                <TextInput
                    placeholder="Mật khẩu mới"
                    secureTextEntry={true}
                    placeholderTextColor="#707070"
                    style={styles.textInput}
                    onChangeText={value => setPassword(value)}
                />
                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnLogin}
                        onPress={() => submit()}>
                        <UIText style={styles.textBtn}>Xác nhận</UIText>
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

export default ChangePassword
