import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import { CheckBox, Overlay } from 'react-native-elements'
import Body from '../Element/Body';
import Colors from '../../Style/Colors';
import UIText from '../../Component/UIText';
import CommonStyles from '../../Style/CommonStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';
import Toast from 'react-native-toast-message';
import { registerData, resetAction, getUserData } from "../../Actions/userPageAction";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import CommonVariable from '../../Style/Variable';
import Config from '../../config';
import axios from "axios";
import { Modal, SlideAnimation, ModalContent } from 'react-native-modals';
import AgreementScreen from "./AgreementScreen";


const SignUpScreen = (props: any) => {
    const navigation = useNavigation();
    const [textFullName, setTextFullName] = useState('');

    const [textAddress, setTextAddress] = useState('');
    const [textPhone, setTextPhone] = useState('');
    const [textEmail, setTextEmail] = useState('');
    const [textPass, setPass] = useState('');
    const [textPassConfirm, setTextPassConfirm] = useState('');
    const [bank, setBank] = useState('');
    const [numberBank, setNumberBank] = useState('');
    const [code, setCode] = useState('');

    const [specialty, setSpecialty] = useState(null) as any;
    const [clinic, setClinic] = useState('');
    const [clinicName, setClinicName] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [certificate, setCertificate] = useState('');
    const route = useRoute();
    const param = route.params as any;

    const [list, setList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isAgree, setIsAgree] = useState(false);
    const [isShowAgreement, setIsShowAgreement] = useState(false);

    useEffect(() => {
        getSpecialty();
    }, [])

    const getSpecialty = async () => {
        axios.get(`${Config.api.api_base_url}/api/specialty`)
            .then(res => {
                if (res.data.success && res.data.data.length > 0) {
                    setList(res.data.data)
                }
            })
            .catch(err => console.log(err))
    }

    const validate = (text: string) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false;
        } else {
            return true
        }
    };

    const signup = () => {
        let notice = '';
        const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        // if (param.typeUser === 2) {
        //     if (
        //         specialty === null ||
        //         clinic === '' ||
        //         clinicAddress === '' ||
        //         certificate === '' ||
        //         clinicName === ''
        //     ) {
        //         notice = 'Vui lòng điền đủ thông tin';
        //     }
        // }
        // if (param.typeUser === 1) {
        //     if (
        //         textAddress === ''
        //     ) {
        //         notice = 'Vui lòng điền đủ thông tin';
        //     }
        // }
        if (
            // textEmail === '' ||
            textPass === '' ||
            textFullName === '' ||
            textPhone === '' ||
            textPassConfirm === ''
        ) {
            notice = 'Vui lòng điền đủ thông tin';
        }
        else if (validate(textEmail) == false) {
            // notice = 'Email không đúng định dạng';
        }
        else if (textPass !== textPassConfirm) {
            notice = 'Password nhập lại đang không trùng';
        }
        else if (vnf_regex.test(textPhone) == false) {
            notice = 'Số điện thoại của bạn không đúng định dạng!';
        } else if (isAgree == false) {
            notice = "Bạn chưa đồng ý với các điều khoản của iDoctor"
        }
        if (notice) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Thông báo',
                text2: notice,
                visibilityTime: 1000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        } else {
            let data = {};
            if (param.typeUser === 1) {
                data = {
                    type: 1,
                    name: textFullName,
                    email: textEmail,
                    phone: textPhone,
                    address: textAddress,
                    code: code,
                    bank: bank,
                    account_bank: numberBank,
                    password: textPass,
                    password_confirmation: textPassConfirm
                };
            } else {
                data = {
                    type: 2,
                    name: textFullName,
                    email: textEmail,
                    phone: textPhone,
                    bank: bank,
                    code: code,
                    account_bank: numberBank,
                    password: textPass,
                    password_confirmation: textPassConfirm,
                    specialty_id: specialty !== null ? specialty.id : null,
                    work_place: clinic,
                    address_clinic: clinicAddress,
                    clinic_name: clinicName,
                    certificate: certificate
                };
            }
            axios.post(`${Config.api.api_base_url}/api/register`, data)
                .then(res => {
                    let notice = '';
                    if (res.data.success) {
                        Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Thông báo',
                            text2: "Đăng ký thành công",
                            visibilityTime: 1000,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onHide: () => {
                                navigation.navigate(RouteNames.OTPSCREEN, { phone: textPhone, password: textPass })
                            }
                        });
                    } else {
                        if (res.data.data === undefined) {
                            notice = res.data.message
                        } else if (res.data.data.phone !== undefined) {
                            notice = 'Số điện thoại đã tồn tại, vui lòng đăng ký số điện thoại khác'
                        } else if (res.data.data.email !== undefined) {
                            notice = 'Email đã tồn tại, vui lòng đăng ký email khác'
                        }
                        if (notice) {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Thông báo',
                                text2: notice,
                                visibilityTime: 1000,
                                autoHide: true,
                                topOffset: 30,
                                bottomOffset: 40
                            });
                        }
                    }
                })
                .catch(error => {
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
    }

    return (
        <Body
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <Modal
                visible={modalVisible}
                modalAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
                modalStyle={{ justifyContent: 'center', backgroundColor: 'transparent' }}
            >
                <ModalContent>
                    <View style={styles.modalView}>
                        <UIText style={{ textAlign: 'center', lineHeight: 25 }}>Vui lòng chọn chuyên khoa của bạn</UIText>
                        <View style={{ marginTop: 15 }}>
                            <FlatList
                                data={list}
                                keyExtractor={(item: any) => item.name}
                                renderItem={({ item }: any) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { setSpecialty(item); setModalVisible(false) }} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                            <View style={styles.radio}>
                                                {specialty == item && <View style={styles.radioSelect}></View>}
                                            </View>
                                            <UIText>{item.name}</UIText>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <TouchableOpacity activeOpacity={0.9} style={styles.btnModal} onPress={() => setModalVisible(false)}>
                                <UIText style={{ color: 'white', textAlign: 'center' }}>Xác nhận</UIText>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </ModalContent>
            </Modal>
            <View style={[CommonStyles.center, { marginTop: 60 }]}>
                <Image source={require('../../assets/login.png')} style={{ width: CommonVariable.screenWidth, height: 250 }} />
            </View>
            <View style={{}}>
                <View>
                    <TextInput
                        placeholder="Họ tên"
                        placeholderTextColor="#707070"
                        style={styles.textInput}
                        onChangeText={(text) => setTextFullName(text)}
                    />
                    <UIText style={styles.icon}>*</UIText>
                </View>
                <View>
                    <TextInput
                        placeholder="Số điện thoại"
                        placeholderTextColor="#707070"
                        style={styles.textInput}
                        keyboardType="number-pad"
                        onChangeText={(text) => setTextPhone(text)}
                    />
                    <UIText style={styles.icon}>*</UIText>
                </View>
                {/* <View>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#707070"
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(text) => setTextEmail(text)}
                    />
                    <UIText style={styles.icon}>*</UIText>
                </View> */}
                <View>
                    <TextInput
                        placeholder="Mã giới thiệu"
                        placeholderTextColor="#707070"
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(text) => setCode(text)}
                    />
                    <UIText style={styles.icon}>*</UIText>
                </View>
                {/* {param.typeUser === 1 &&
                    <View>
                        <TextInput
                            placeholder="Địa chỉ"
                            placeholderTextColor="#707070"
                            style={styles.textInput}
                            onChangeText={(text) => setTextAddress(text)}
                        />
                        <UIText style={styles.icon}>*</UIText>
                    </View>
                } */}
                {/* <View>
                    <TextInput
                        placeholder="Mã giới thiệu"
                        placeholderTextColor="#707070"
                        style={styles.textInput}
                        onChangeText={(text) => setCode(text)}
                    />
                    <UIText style={styles.icon}>*</UIText>
                </View> */}
                {param.typeUser === 2 && <View>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.textInput, { justifyContent: 'center' }]}
                            onPress={() => setModalVisible(true)}
                        >
                            <UIText style={{ fontSize: 16, color: specialty !== null ? 'black' : '#707070' }}>{specialty !== null ? specialty.name : 'Chuyên khoa'}</UIText>
                        </TouchableOpacity>
                        <UIText style={styles.icon}>*</UIText>
                    </View>
                    {/* <View>
                        <TextInput
                            placeholder="Số Chứng chỉ hành nghề"
                            placeholderTextColor="#707070"
                            style={styles.textInput}
                            onChangeText={(text) => setCertificate(text)}
                        />
                        <UIText style={styles.icon}>*</UIText>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Nơi công tác"
                            placeholderTextColor="#707070"
                            style={styles.textInput}
                            onChangeText={(text) => setClinic(text)}
                        />
                        <UIText style={styles.icon}>*</UIText>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Tên phòng khám"
                            placeholderTextColor="#707070"
                            style={styles.textInput}
                            onChangeText={(text) => setClinicName(text)}
                        />
                        <UIText style={styles.icon}>*</UIText>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Địa chỉ phòng khám"
                            placeholderTextColor="#707070"
                            style={styles.textInput}
                            onChangeText={(text) => setClinicAddress(text)}
                        />
                        <UIText style={styles.icon}>*</UIText>
                    </View> */}
                </View>}
                {/* <View>
                    <TextInput
                        placeholder="Ngân hàng"
                        placeholderTextColor="#707070"
                        style={styles.textInput}
                        onChangeText={(text) => setBank(text)}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder="Số tài khoản"
                        placeholderTextColor="#707070"
                        keyboardType="number-pad"
                        style={styles.textInput}
                        onChangeText={(text) => setNumberBank(text)}
                    />
                </View> */}
                <View>
                    <TextInput
                        placeholder="Mật khẩu"
                        placeholderTextColor="#707070"
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={(text) => setPass(text)}
                    />
                    <UIText style={styles.icon}>*</UIText>
                </View>
                <View>
                    <TextInput
                        placeholder="Nhập lại mật khẩu"
                        placeholderTextColor="#707070"
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={(text) => setTextPassConfirm(text)}
                    />
                    <UIText style={styles.icon}>*</UIText>
                </View>
                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnLogin}
                        onPress={() => signup()}>
                        <UIText style={styles.textBtn}>Đăng ký</UIText>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    paddingBottom: 10,
                }}>
                <CheckBox
                    center
                    style={{
                        alignSelf: 'center'
                    }}
                    checkedColor={Colors.mainColor}
                    uncheckedColor={Colors.mainColor}
                    onPress={() => {
                        setIsAgree(!isAgree)
                    }}
                    checked={isAgree}
                />
                <View></View>
                <UIText style={{ fontSize: 14, fontWeight: 'bold', color: 'black', marginLeft: -20 }}>Tôi đồng ý với </UIText>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        // setIsShowAgreement(true)
                        props.navigation.navigate(RouteNames.POLICY_SCREEN)
                    }}
                >
                    <UIText style={{ fontSize: 14, fontWeight: 'bold', color: Colors.mainColor }}>các điều khoản của App</UIText>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 10
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
            {/* <AgreementScreen isShowAgreement={isShowAgreement} dismiss={() => {
                setIsShowAgreement(false);
            }}>

            </AgreementScreen> */}
            {/* <Overlay isVisible={isShowAgreement} onBackdropPress={() => {
                setIsShowAgreement(false)                
             }}>
                <UIText>dddsdd</UIText>
                
            </Overlay>  */}
            <View style={{ height: 30 }}></View>
        </Body>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
    },
    textSplash: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 15,
        textTransform: 'uppercase',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'white',
        color: 'black',
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
    icon: {
        position: 'absolute',
        right: 40,
        top: 35,
        fontSize: 25,
        color: '#A6A6A6'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    radio: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 15,
        marginRight: 10,
        borderColor: Colors.mainColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioSelect: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.mainColor
    },
    btnModal: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 15,
        backgroundColor: Colors.mainColor,
        borderRadius: 8
    }
});

SignUpScreen.defaultProps = {
    userPage: {
        data: {}
    },
};
const mapStateToProps = (state: any) => {
    return {
        'userPage': state.userPage
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        registerData: (data: any) => {
            dispatch(registerData(data))
        },
        resetAction: () => {
            dispatch(resetAction())
        },
        getUserData: () => {
            dispatch(getUserData())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
