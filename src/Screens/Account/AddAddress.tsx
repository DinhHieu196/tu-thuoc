import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Body from '../Element/Body';
import UIText from '../../Component/UIText';
import Colors from '../../Style/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../Style/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import { size, get } from 'lodash';
import { getUserData } from "../../Actions/userPageAction";

const AddAddress = (props: any) => {
    const navigation = useNavigation();
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [wards, setWards] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    if (props.userPage.isFetching === false && props.userPage.message !== "") {
        Toast.show({
            type: get(props, 'userPage.error', true) === true ? 'error' : 'success',
            position: 'top',
            text1: 'Thông báo',
            text2: get(props, 'userPage.error', true) === true ? props.userPage.message : 'Thêm địa chỉ thành công',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onHide: () => {
                if (get(props, 'userPage.error', true) === false) {
                    setCity('');
                    setDistrict('');
                    setWards('');
                    setAddress('');
                    setPhone('');
                    setUsername('');
                    props.navigation.navigate(RouteNames.ACCOUNTSCREEN);
                }
            },
            onShow: () => {
                props.getUserData();
            },
        });
    }
    const updateAddress = () => {
        if (username == "" || phone == "" || address == "" || wards == "" || district == "" || city == "") {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Lỗi',
                text2: "Vui lòng nhập đầy đủ thông tin",
                visibilityTime: 1000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        } else {
            props.addNewAddress({
                address: address + ", " + wards + ", " + district + ", " + city,
                phone: phone,
                username: username
            });
        }
    }
    return (
        <Body style={{ borderRadius: 0, backgroundColor: "#F5F5F5" }}>
            <View>
                <View style={styles.btnIntro}>
                    <UIText style={{ fontSize: 16 }}>Họ và tên</UIText>
                    <TextInput
                        style={{
                            color: 'black',
                            padding: 0, flex: 1, textAlign: "right", paddingRight: 10
                        }}
                        placeholder="Họ và tên"
                        placeholderTextColor="#909090"
                        value={username}
                        defaultValue={get(props, 'userPage.userInfo.data.user.name', '')}
                        onChangeText={(value) => setUsername(value)}
                    />
                </View>
                <View style={styles.btnIntro}>
                    <UIText style={{ fontSize: 16 }}>Số điện thoại</UIText>
                    <TextInput
                        style={{
                            color: 'black',
                            padding: 0, flex: 1, textAlign: "right", paddingRight: 10
                        }}
                        placeholder="Số điện thoại"
                        placeholderTextColor="#909090"
                        value={phone}
                        defaultValue={get(props, 'userPage.userInfo.data.user.phone', '')}
                        onChangeText={(value) => setPhone(value)}
                    />
                </View>
                <View style={[styles.btnIntro, { paddingVertical: 12 }]}>
                    <UIText style={{ fontSize: 16, flex: 1 }}>Tỉnh/ Thành phố</UIText>
                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                        <TextInput
                            style={{
                                color: 'black',
                                padding: 0, flex: 1, textAlign: "right", paddingRight: 10
                            }}
                            placeholder="điền tỉnh/ thành phố"
                            placeholderTextColor="#909090"
                            value={city}
                            onChangeText={(value) => setCity(value)}
                        />
                        <AntDesign name="right" size={14} color="#363636" />
                    </View>
                </View>
                <View style={[styles.btnIntro, { paddingVertical: 12 }]}>
                    <UIText style={{ fontSize: 16 }}>Quận/ Huyện</UIText>
                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                        <TextInput
                            style={{
                                color: 'black',
                                padding: 0, flex: 1, textAlign: "right", paddingRight: 10
                            }}
                            placeholder="điền quận/ huyện"
                            placeholderTextColor="#909090"
                            value={district}
                            onChangeText={(value) => setDistrict(value)}
                        />
                        <AntDesign name="right" size={14} color="#363636" />
                    </View>
                </View>
                <View style={[styles.btnIntro, { paddingVertical: 12 }]}>
                    <UIText style={{ fontSize: 16 }}>Phường/ Xã</UIText>
                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                        <TextInput
                            style={{
                                color: 'black',
                                padding: 0, flex: 1, textAlign: "right", paddingRight: 10
                            }}
                            placeholder="điền phường/ xã"
                            placeholderTextColor="#909090"
                            value={wards}
                            onChangeText={(value) => setWards(value)}
                        />
                        <AntDesign name="right" size={14} color="#363636" />
                    </View>
                </View>
                <View style={styles.address}>
                    <UIText style={{ fontSize: 16 }}>Địa chỉ cụ thể:</UIText>
                    <TextInput
                        style={[styles.inputAddress, { height: 80, color: 'black', }]}
                        placeholder="Số nhà, tên đường, tên tòa nhà ..."
                        placeholderTextColor="#909090"
                        multiline={true}
                        numberOfLines={5}
                        value={address}
                        onChangeText={(value) => setAddress(value)}
                    />
                </View>
                <TouchableOpacity style={[CommonStyles.center, styles.btnLogOut]} onPress={() => updateAddress()}>
                    <UIText style={{ fontSize: 18, color: "white" }}>Thêm mới địa chỉ</UIText>
                </TouchableOpacity>
            </View>
        </Body>
    )
}

const styles = StyleSheet.create({
    btnIntro: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: "white",
        marginTop: 15
    },
    address: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "white",
        marginTop: 15
    },
    inputAddress: {
        padding: 0,
        fontFamily: "Arial",
        textAlignVertical: "top",
        fontSize: 14
    },
    btnLogOut: {
        backgroundColor: Colors.mainBlue,
        margin: 15,
        paddingVertical: 10,
        marginBottom: 30
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
            dispatch(getUserData());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
