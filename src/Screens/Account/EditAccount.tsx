import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Body from '../Element/Body';
import UIText from '../../Component/UIText';
import Colors from '../../Style/Colors';
import CommonStyles from '../../Style/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';
import { getUserData } from "../../Actions/userPageAction";
import { connect } from "react-redux";
import { size, get } from 'lodash';
import { getData } from '../../Utilities/Storage';
import Toast from 'react-native-toast-message';
import Config from "../../config";
import { Modal, SlideAnimation, ModalContent } from 'react-native-modals';
import axios from "axios";
const EditAccount = (props: any) => {
    const navigation = useNavigation();
    const [textFullName, setTextFullName] = useState(get(props, 'userPage.userInfo.name', ''));
    const [textAddress, setTextAddress] = useState(get(props, 'userPage.userInfo.address', ''));
    const [textPhone, setTextPhone] = useState(get(props, 'userPage.userInfo.phone', ''));
    const [textEmail, setTextEmail] = useState(get(props, 'userPage.userInfo.email', ''));
    const [textPass, setPass] = useState('');
    const [textPassConfirm, setTextPassConfirm] = useState('');
    const [bank, setBank] = useState(get(props, 'userPage.userInfo.bank', ''));
    const [numberBank, setNumberBank] = useState(get(props, 'userPage.userInfo.account_bank', ''));
    const [code, setCode] = useState(get(props, 'userPage.userInfo.code', ''));

    const [specialty, setSpecialty] = useState(null) as any;
    const [clinic, setClinic] = useState(get(props, 'userPage.userInfo.work_place', ''));
    const [clinicName, setClinicName] = useState(get(props, 'userPage.userInfo.clinic_name', ''));
    const [clinicAddress, setClinicAddress] = useState(get(props, 'userPage.userInfo.address_clinic', ''));
    const [certificate, setCertificate] = useState(get(props, 'userPage.userInfo.certificate', ''));

    const [token, setToken] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [list, setList] = useState([]);


    useEffect(() => {
        props.getUserData();
        getData('userData')
            .then(res => setToken(res))
            .catch(err => Alert.alert(err));
        axios.get(`${Config.api.api_base_url}/api/specialty`)
            .then(res => {
                if (res.data.success && res.data.data.length > 0) {
                    getSpecialty(res.data.data, get(props, 'userPage.userInfo.specialty_id'))
                    setList(res.data.data);
                }
            })
            .catch(err => console.log(err))
    }, [])

    const updateAddress = () => {
        let notice = '';
        if (
            textFullName === '' ||
            bank === '' ||
            numberBank === ''
        ) {
            notice = 'Vui lòng điền đủ thông tin';
        }
        if (props.userPage.userInfo.type === 1) {
            if (
                textAddress === '' ||
                code === ''
            ) {
                notice = 'Vui lòng điền đủ thông tin';
            }
        }
        /*
        if (props.userPage.userInfo.type === 2) {
            if (
                specialty === null ||
                clinic === '' ||
                clinicAddress === '' ||
                certificate === '' ||
                clinicName === ''
            ) {
                notice = 'Vui lòng điền đủ thông tin';
            }
        }
        */
        if (notice) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Lỗi',
                text2: notice,
                visibilityTime: 1000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        } else {
            let data = {};
            if (props.userPage.userInfo.type === 1) {
                data = {
                    type: 1,
                    name: textFullName,
                    email: textEmail,
                    phone: textPhone,
                    address: textAddress,
                    code: code,
                    bank: bank,
                    account_bank: numberBank
                };
            } else {
                data = {
                    type: 2,
                    name: textFullName,
                    email: textEmail,
                    phone: textPhone,
                    address: textAddress,
                    bank: bank,
                    code: code,
                    account_bank: numberBank,
                    specialty_id: specialty == null? null : specialty.id,
                    work_place: clinic,
                    address_clinic: clinicAddress,
                    clinic_name: clinicName,
                    certificate: certificate
                };
            }
            axios.put(`${Config.api.api_base_url}/api/profile`, data, { headers: { "Authorization": `Bearer ${token}` } })
                .then(response => {
                    props.getUserData();
                    if (response.data.success && response.data.code === 200) {
                        Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Thông báo',
                            text2: 'Cập nhật thông tin thành công',
                            visibilityTime: 1000,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {
                                props.getUserData();
                            },
                            onHide: () => {
                                navigation.goBack();
                            }
                        });
                    } else {
                        Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Thông báo',
                            text2: 'Xảy ra lỗi, vui lòng thử lại sau',
                            visibilityTime: 1000,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40
                        });
                    }
                })
                .catch(error => {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Thông báo',
                        text2: 'Xảy ra lỗi, vui lòng thử lại sau',
                        visibilityTime: 1000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40
                    });
                })
        }
    }

    const getSpecialty = (arr: any, id: number) => {
        const data = arr.filter((item: any) => item.id === id);
        if (data.length > 0) {
            setSpecialty(data[0])
        }
    }
    return (
        <Body style={{ borderRadius: 0, backgroundColor: "#F5F5F5" }}>
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
                                renderItem={({ item }) => {
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
                    </View>
                </ModalContent>
            </Modal>
            <View>
                <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Họ tên: </UIText>
                    <TextInput
                        value={textFullName}
                        style={styles.textInput}
                        onChangeText={(text) => setTextFullName(text)}
                    />
                </View>
                {/* <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Số điện thoại: </UIText>
                    <TextInput
                        editable={false}
                        value={textPhone}
                        style={styles.textInput}
                        keyboardType="number-pad"
                        onChangeText={(text) => setTextPhone(text)}
                    />
                </View>
                <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Email:</UIText>
                    <TextInput
                        value={textEmail}
                        editable={false}
                        style={styles.textInput}
                        onChangeText={(text) => setTextEmail(text)}
                    />
                </View> */}
                {get(props, 'userPage.userInfo.address') !== null && <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Địa chỉ:</UIText>
                    <TextInput
                        value={textAddress}
                        style={styles.textInput}
                        onChangeText={(text) => setTextAddress(text)}
                    />
                </View>}
                {/* {get(props, 'userPage.userInfo.code') !== null && <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Mã giới thiệu:</UIText>
                    <TextInput
                        value={code}
                        style={styles.textInput}
                        onChangeText={(text) => setCode(text)}
                    />
                </View>} */}
                <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Mã giới thiệu:</UIText>
                    <TextInput
                        value={code}
                        style={styles.textInput}
                        onChangeText={(text) => setCode(text)}
                    />
                </View>
                {get(props, 'userPage.userInfo.specialty_id') !== null && specialty !== null && <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Chuyên khoa:</UIText>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.textInput, { justifyContent: 'center' }]}
                        onPress={() => setModalVisible(true)}
                    >
                        <UIText style={{ color: 'black' }}>{specialty.name}</UIText>
                    </TouchableOpacity>
                </View>}
                {get(props, 'userPage.userInfo.work_place') !== null && <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Nơi công tác:</UIText>
                    <TextInput
                        value={clinic}
                        style={styles.textInput}
                        onChangeText={(text) => setClinic(text)}
                    />
                </View>}
                {get(props, 'userPage.userInfo.clinic_name') !== null && <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Tên phòng khám:</UIText>
                    <TextInput
                        value={clinicName}
                        style={styles.textInput}
                        onChangeText={(text) => setClinicName(text)}
                    />
                </View>}
                {get(props, 'userPage.userInfo.address_clinic') !== null && <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Địa chỉ phòng khám:</UIText>
                    <TextInput
                        value={clinicAddress}
                        style={styles.textInput}
                        onChangeText={(text) => setClinicAddress(text)}
                    />
                </View>}
                {get(props, 'userPage.userInfo.certificate') !== null && <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Số Chứng chỉ hành nghề:</UIText>
                    <TextInput
                        value={certificate}
                        style={styles.textInput}
                        onChangeText={(text) => setCertificate(text)}
                    />
                </View>}
                <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Ngân hàng:</UIText>
                    <TextInput
                        style={styles.textInput}
                        value={bank}
                        onChangeText={(text) => setBank(text)}
                    />
                </View>
                <View>
                    <UIText style={{ marginTop: 15, paddingHorizontal: 20 }}>Số tài khoản:</UIText>
                    <TextInput
                        keyboardType="number-pad"
                        value={numberBank}
                        style={styles.textInput}
                        onChangeText={(text) => setNumberBank(text)}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[CommonStyles.center, styles.btnLogOut]}
                    onPress={() => updateAddress()}>
                    <UIText style={{ fontSize: 16, color: "white", fontWeight: 'bold' }}>CẬP NHẬT</UIText>
                </TouchableOpacity>
            </View>
        </Body>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'white',
        color:'black',
        fontSize: 16,
        marginHorizontal: 15,
        marginTop: 5,
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
    btnLogOut: {
        backgroundColor: Colors.mainColor,
        margin: 15,
        height: 50,
        marginBottom: 20,
        borderRadius: 25,
    },
    modalView: {
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
})

const mapStateToProps = (state: any) => {
    return {
        userPage: state.userPage,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getUserData: () => {
            dispatch(getUserData())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);