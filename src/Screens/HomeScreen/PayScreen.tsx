import React, { useEffect, useState } from 'react';
import { get, forEach } from 'lodash';
import {
    StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList, Picker
} from 'react-native';
import UIText from '../../Component/UIText';
import Body from '../Element/Body';
import Colors from '../../Style/Colors';
import CommonStyles from '../../Style/CommonStyles';
import { RouteNames } from '../../Router/route-names';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUserData } from "../../Actions/userPageAction";
import { payOrder, fetchDataCart } from "../../Actions/cartlPageAction";
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native'
//import { Modal} from 'react-native-modals';
const { Modal } = Platform.OS === 'ios' ? require('react-native') : require('react-native-modals')
import { number_format } from '../../Utilities/Number';
import Config from "../../config";
import { getData, storeData } from '../../Utilities/Storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';

import CommonVariable from '../../Style/Variable';

const PayScreen = (props: any) => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [district, setDistrict] = useState(null) as any;
    const [province, setProvince] = useState(null) as any;

    const [showReferralDialog, setShowReferralDialog] = useState(false);

    const [ward, setWard] = useState(null) as any;
    const [address, setAddress] = useState('');
    const [coupon] = useState('');
    const [code] = useState('');

    const [listCustomer, setListCustomer] = useState([]);

    const [token, setToken] = useState('');

    const [userAddress, setUserAddress] = useState(null) as any;
    const [listAddress, setListAddress] = useState([]);
    const [dataDvt, setDataDvt] = useState([]);
    const [dosageArray, setDosageArray] = useState([]) as any;
    const [noteArray, setNoteArray] = useState([]) as any;
    const [noteDoctor, setNoteDoctor] = useState('');

    const route = useRoute();
    const param = route.params as any;

    if (props.cartPage.payOrder === true) {
        navigation.navigate(RouteNames.PAYDONE);
    }

    if (param != null && param.data != undefined && param.type) {
        if (param.type == 1) {
            setProvince(param.data);
            if (district != null) {
                setDistrict(null);
            }
            if (ward != null) {
                setWard(null);
            }
        } else if (param.type == 2) {
            if (ward != null) {
                setWard(null);
            }
            setDistrict(param.data);
        } else if (param.type == 3) {
            setWard(param.data);
        }
        delete param.data;
        delete param.type;
    }

    let productValues = [] as any;
    let productQuantity = [] as any;

    forEach(props.cartPage.data, (val: any) => {
        productValues.push((val.id).toString());
        productQuantity.push((val.quantity).toString());
    });

    useEffect(() => {
        getData('userData')
            .then(res => {
                setToken(res);
                fetchDvt(res);
            })
            .finally(() => {
                getData('storeAddress')
                    .then(res => {
                        if (res === null) {
                            setListAddress([]);
                        } else {
                            setListAddress(res)
                        }
                    });
                fetchInitState();
            })
    }, [])

    const fetchInitState = async () => {
        let dosage = [] as any;
        let note = [] as any;
        await forEach(props.cartPage.data, (val: any) => {
            dosage.push('');
            note.push('');
        });
        setDosageArray(dosage);
        setNoteArray(note);
    }

    const fetchDvt = async (token: string) => {
        axios.get(`${Config.api.api_base_url}/api/dvt`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                if (response.data.success) {
                    setDataDvt(response.data.data);
                }
            })
            .catch((error) => console.log(error))
    }

    const PayDone = async () => {
        const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        let notice = '';
        if (userAddress === null) {
            if (vnf_regex.test(phone) == false) {
                notice = "Số điện thoại không đúng định dạng";
            }
            if (
                (name === '') ||
                (phone === '') ||
                (district === null) ||
                (province === null) ||
                (ward === null) ||
                (address === '')
            ) {
                notice = "Vui lòng nhập thông tin nhận hàng";
            }
        }
        if (dosageArray.findIndex((ele: string) => ele == '') != -1) {
            notice = "Vui lòng nhập liều lượng sử dụng";
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
            const data = {
                name: name != "" ? name : userAddress.name,
                phone: phone != "" ? phone : userAddress.phone,
                province: province != null ? province : userAddress.province,
                district: district != null ? district : userAddress.district,
                ward: ward != null ? ward : userAddress.ward,
                address: address != "" ? address : userAddress.address,
            }
            await checkIndexAddress(data);
            console.log({
                name: data.name,
                phone: data.phone,
                email: get(props, 'userPage.userInfo.email', ''),
                province: data.province.matp,
                district: data.district.maqh,
                ward: data.ward.xaid,
                address: data.address,
                coupon: coupon,
                products: productValues,
                quantity: productQuantity,
                note_lieuluong: dosageArray,
                note: noteArray,
                note_doctor: noteDoctor,
                code: code,
                ship: "0"
            });
            props.payOrder({
                name: data.name,
                phone: data.phone,
                email: get(props, 'userPage.userInfo.email', ''),
                province: data.province.matp,
                district: data.district.maqh,
                ward: data.ward.xaid,
                address: data.address,
                coupon: coupon,
                products: productValues,
                quantity: productQuantity,
                note_lieuluong: dosageArray,
                note: noteArray,
                note_doctor: noteDoctor,
                code: code,
                ship: "0"
            });
        }
    }

    if (props.cartPage.message !== "") {
        Toast.show({
            type: get(props, 'cartPage.error', true) === true ? 'error' : 'success',
            position: 'top',
            text1: get(props, 'cartPage.error', true) === true ? 'Lỗi' : 'Thông báo',
            text2: props.cartPage.message,
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onHide: () => {
                if (get(props, 'cartPage.error')) {
                    props.fetchDataCart();
                }
            },
        });
    }

    const checkProvince = async () => {
        if (province === null && userAddress.province === null) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Thông báo',
                text2: "Vui lòng chọn tỉnh thành phố trước khi chọn quận huyện",
                visibilityTime: 1000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        } else {
            navigation.navigate(RouteNames.SELECTADDRESS, { type: 2, id: province != null ? province.matp : userAddress.province.matp })
        }
    }

    const checkWard = async (key: string) => {
        if (district === null && userAddress.district === null) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Thông báo',
                text2: "Vui lòng chọn quận huyện trước khi chọn phường xã",
                visibilityTime: 1000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        } else {
            navigation.navigate(RouteNames.SELECTADDRESS, { type: 3, id: district != null ? district.maqh : userAddress.province.matp })
        }
    }

    const searchPhone = async (value: string) => {
        axios.get(`${Config.api.api_base_url}/api/orders/customer?phone=${value}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.data)
                    setListCustomer(response.data.data);
                }
            })
            .catch((error) => console.log(error))
    }

    const checkAddress = () => {
        const find = listAddress.find((item: any) => item.phone === phone);
        if (find !== undefined) {
            setUserAddress(find)
        } else {
            setUserAddress(null)
        }
    }

    const checkIndexAddress = async (data: any) => {
        let arr = listAddress as any;
        const index = listAddress.findIndex((item: any) => item.phone === phone);
        arr.splice(index, 1, data);
        await storeData('storeAddress', JSON.stringify(arr));
    }

    const findDvt = (id: string) => {
        if (dataDvt.length > 0) {
            const dvt = dataDvt.find((i: any) => i.id.toString() == id) as any;
            return dvt != undefined ? dvt.name : null;
        }
    }

    return (
        <Body style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <Spinner
                visible={props.cartPage.isFetching}
            />
            {/* <Modal
                animationType="slide"
                transparent={false}
                visible={modalCustomer}
                onRequestClose={() => {

                }}
            >
                <Body style={styles.dialog}>
                    <View style={styles.titleDialog}>
                        <View style={{ width: 25 }}></View>
                        <UIText>Tìm kiếm khách hàng</UIText>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={async () => {
                                await setPhoneSearch("");
                                await setModalCustomer(false);
                                setListCustomer([]);
                            }}
                            style={{ padding: 10 }}
                        >
                            <AntDesign name="closecircleo" size={25} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Nhập số điện thoại muốn tìm kiếm"
                            style={styles.inputDialog}
                            keyboardType="number-pad"
                            defaultValue={phoneSearch}
                            autoFocus={true}
                            onChangeText={value => {
                                searchPhone(value);
                            }}
                        />
                    </View>
                    {listCustomer.length > 0 ?
                        listCustomer.map((item: any) => {

                            return <TouchableOpacity
                                activeOpacity={0.8}
                                key={item.name + item.phone + item.email}
                                onPress={async () => {
                                    setPhone(item.phone);
                                    setName(item.name);
                                    setModalCustomer(false);
                                    setListCustomer([]);
                                    setPhoneSearch("");
                                }} style={{
                                    paddingVertical: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#888888'
                                }}>
                                <UIText style={{ paddingHorizontal: 10 }}>{item.name}</UIText>
                                <View style={{ height: 5 }}></View>
                                <UIText style={{ paddingHorizontal: 10 }}>{item.phone}</UIText>
                                <View style={{ height: 5 }}></View>
                                <UIText style={{ paddingHorizontal: 10 }}>{item.email}</UIText>
                            </TouchableOpacity>
                        }) : <View></View>
                    }
                </Body>
            </Modal> */}
            <View style={styles.viewScreen}>
                {/* <TouchableOpacity activeOpacity={0.8}
                    onPress={() => { setModalCustomer(true) }}
                    style={[styles.textInput, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                    <UIText style={{ color: '#6A6A6A', fontSize: 16, }}>Tìm kiếm khách hàng</UIText>
                    <AntDesign name="search1" size={22} color={"#707070"} style={{}} />
                </TouchableOpacity> */}
                <UIText style={styles.title}>Nhập địa chỉ nhận hàng</UIText>
                <TextInput
                    placeholder="Số điện thoại"
                    placeholderTextColor="#6A6A6A"
                    keyboardType="number-pad"
                    value={phone}
                    style={styles.textInput}
                    onChangeText={(value) => setPhone(value)}
                    onBlur={() => checkAddress()}
                />
                <TextInput
                    placeholder="Tên người nhận"
                    placeholderTextColor="#6A6A6A"
                    style={styles.textInput}
                    value={userAddress !== null ? userAddress.name : name}
                    onChangeText={(value) => setName(value)}
                />
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => navigation.navigate(RouteNames.SELECTADDRESS, { type: 1 })}
                    style={[styles.textInput, { justifyContent: 'center' }]}>
                    <UIText style={{ color: userAddress !== null ? 'black' : province !== null ? 'black' : '#6A6A6A' }}>
                        {province !== null ? province.name : userAddress !== null ? userAddress.province.name : 'Thành phố Tỉnh'}
                    </UIText>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { checkProvince() }} style={[styles.textInput, { justifyContent: 'center' }]}>
                    <UIText style={{ color: userAddress !== null ? 'black' : district !== null ? 'black' : '#6A6A6A' }}>
                        {district !== null ? district.name : userAddress !== null ? userAddress.district.name : 'Quận Huyện'}
                    </UIText>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { checkWard("") }} style={[styles.textInput, { justifyContent: 'center' }]}>
                    <UIText style={{ color: userAddress !== null ? 'black' : ward !== null ? 'black' : '#6A6A6A' }}>
                        {ward !== null ? ward.name : userAddress !== null ? userAddress.ward.name : 'Phường Xã'}
                    </UIText>
                </TouchableOpacity>
                <TextInput
                    placeholder="Địa chỉ cụ thể"
                    placeholderTextColor="#6A6A6A"
                    value={userAddress !== null ? userAddress.address : address}
                    style={styles.textInput}
                    onChangeText={value => setAddress(value)}
                />
            </View>
            <View style={styles.viewScreen}>
                <UIText style={styles.title}>Thông tin đơn hàng</UIText>
                {
                    props.cartPage.data.map((item: any, index: number) => {
                        console.log(item);
                        return (
                            <View key={item.title} style={{
                                borderBottomColor: "#C3C3C3",
                                borderBottomWidth: 1
                            }}>
                                <View style={styles.itemCart}>
                                    <Image source={item.image !== "" ? { uri: item.image } : require('../../assets/no-image.png')} style={styles.imgProduct} />
                                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                        <UIText style={{ color: Colors.mainColor, fontWeight: '500' }} numberOfLines={1}>{item.title}</UIText>
                                        <View>
                                            {item.promotion_cost !== 0 ?
                                                <UIText style={{ textDecorationLine: 'line-through', textDecorationColor: '#707070', color: '#707070' }}>{number_format(item.base_cost, 0, '', '.') + 'đ'}</UIText>
                                                : null}
                                            {item.promotion_cost !== 0 ?
                                                <UIText style={{ fontSize: 16, color: '#F54F9A', fontWeight: 'bold', }}>{number_format(item.promotion_cost, 0, '', '.') + 'đ'}</UIText>
                                                :
                                                <UIText style={{ fontSize: 16, color: '#F54F9A', fontWeight: 'bold', }}>{number_format(item.base_cost, 0, '', '.') + 'đ'}</UIText>
                                            }
                                            <View style={{ height: 3 }} />
                                            <UIText style={{}}>Số lượng: {item.quantity}</UIText>
                                            <View style={{ height: 3 }} />
                                            <UIText style={{}}>Đơn vị tính: {findDvt(item.lieuluong) != null ? findDvt(item.lieuluong) : ''}</UIText>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ zIndex: 0 }}>
                                    <TextInput
                                        placeholder="Liều lượng sử dụng"
                                        placeholderTextColor="#6A6A6A"
                                        style={[styles.textInput, { zIndex: 0 }]}
                                        onChangeText={(value) => {
                                            const dosage = [...dosageArray];
                                            dosage[index] = value;
                                            setDosageArray(dosage);
                                        }}
                                    />
                                    <TextInput
                                        placeholder="Ghi chú"
                                        placeholderTextColor="#6A6A6A"
                                        style={[styles.textInput, { zIndex: 0 }]}
                                        onChangeText={(value) => {
                                            const note = [...noteArray];
                                            note[index] = value;
                                            setNoteArray(note);
                                        }}
                                    />
                                </View>
                                <View style={{ height: 10 }} />
                            </View>

                        );
                    })
                }
            </View>
            <View style={{ padding: 15, paddingTop: 5, backgroundColor: "white" }}>
                <TextInput
                    multiline
                    numberOfLines={4}
                    onChangeText={(text: any) => setNoteDoctor(text)}
                    value={noteDoctor}
                    placeholder="Lời dặn của bác sĩ"
                    placeholderTextColor="#6A6A6A"
                    style={[styles.textInput, { height: 80, borderRadius: 8, textAlignVertical: 'top' }]}
                    editable
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <UIText style={styles.textScreen}>Tạm tính</UIText>
                    <UIText style={[styles.title, { marginTop: 0 }]}>{props.cartPage.price}</UIText>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <UIText style={styles.textScreen}>Phí vận chuyển</UIText>
                    <UIText style={[styles.title, { marginTop: 0 }]}>Miễn phí</UIText>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <UIText style={styles.textScreen}>Thành tiền</UIText>
                    <UIText style={[styles.title, { marginTop: 0 }]}>{get(props, 'cartPage.price', '')}</UIText>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[CommonStyles.center, styles.btnPay]}
                    onPress={() => {
                        if (get(props, 'userPage.userInfo.code', '') == null || get(props, 'userPage.userInfo.code', '') == '') {
                            setShowReferralDialog(true)
                        } else {
                            // checkDosage();
                            PayDone();
                        }
                    }}>
                    <UIText style={{ fontSize: 16, color: "white", fontWeight: '500' }}>ĐẶT HÀNG</UIText>
                </TouchableOpacity>
            </View>
        </Body>
    )
}

const styles = StyleSheet.create({
    viewScreen: {
        padding: 15,
        paddingTop: 10,
        backgroundColor: "white",
        marginTop: 15
    },
    title: {
        fontSize: 16,
        color: Colors.mainColor,
        marginBottom: 10,
        fontWeight: "bold"
    },
    textScreen: {
        fontSize: 12,
        color: "#363636"
    },
    itemCart: {
        backgroundColor: "white",
        marginTop: 10,
        paddingBottom: 15,
        flexDirection: "row",
        zIndex: 1
    },
    imgProduct: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginRight: 15
    },
    price: {
        fontSize: 20,
        color: Colors.mainColor,
        marginRight: 10
    },
    btnPay: {
        backgroundColor: '#D30101',
        marginVertical: 15,
        height: 50,
        borderRadius: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'white',
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 10,
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
    titleDialog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    dialog: {
        width: CommonVariable.screenWidth,
        height: CommonVariable.screenHeight,
        paddingHorizontal: 0,
        paddingTop: 40,
    },
    inputDialog: {
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 15,
        marginHorizontal: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: "#999999",
        color: '#0A0A0A'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 35,
        paddingHorizontal: 50,
        // width: CommonVariable.screenWidth - 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textSort: {
        fontSize: 16,
        textAlign: 'center',
    },
    pickerDvt: {
        // position: 'absolute',
        // top: -10,
        marginLeft: 115,
        backgroundColor: 'white',
        zIndex: 10000,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: 150,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});
PayScreen.defaultProps = {
    cartPage: {
        data: {},
    },
    userPage: {
        data: {},
    }
};
const mapStateToProps = (state: any) => {
    return {
        cartPage: state.cartPage,
        userPage: state.userPage,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getUserData: () => {
            dispatch(getUserData())
        },
        payOrder: (data: any) => {
            dispatch(payOrder(data))
        },
        fetchDataCart: () => {
            dispatch(fetchDataCart())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayScreen);
