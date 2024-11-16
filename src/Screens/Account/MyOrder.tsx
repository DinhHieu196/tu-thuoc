import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Text,
    TextInput,
    Clipboard
} from 'react-native';
import Colors from '../../Style/Colors';
import { connect } from "react-redux";
import UIText from "../../Component/UIText";
import { number_format } from '../../Utilities/Number';
import axios from "axios";
import Config from '../../config';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-toast-message';
import { fetchDataOrders } from "../../Actions/ordersPageAction";
import ProductOrder from '../Components/ProductOrder';
import { getData } from '../../Utilities/Storage';
import { useNavigation } from '@react-navigation/native';

const MyOrder = (props: any) => {
    const [token, setToken] = useState('');
    const [phoneSearch, setPhoneSearch] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        getData('userData')
            .then(res => setToken(res))
            .catch(err => console.log(err));
        props.fetchDataOrders("", 1);
    }, [])

    const statusShop = (stt: any) => {
        if (stt === 0) {
            return <UIText style={{ color: '#114F96' }}>Đang chờ xử lí</UIText>;
        } else
            if (stt === 1) {
                return <UIText style={{ color: '#5BC8AC' }}>Thành công</UIText>
            } else
                if (stt === 2) {
                    return <UIText style={{ color: '#D7373F' }}>Đã huỷ</UIText>
                } else
                    if (stt === 3) {
                        return <UIText style={{ color: '#114F96' }}>Đang ship</UIText>
                    }
    }

    const statusShip = (stt: any) => {
        switch (stt) {
            case "-1":
                return <UIText style={{ color: '#D7373F' }}>Huỷ đơn hàng</UIText>
            case "1":
                return <UIText style={{ color: '#114F96' }}>Chưa tiếp nhận</UIText>
            case "2":
                return <UIText style={{ color: '#114F96' }}>Đã tiếp nhận</UIText>
            case "3":
                return <UIText style={{ color: '#114F96' }}>Đã lấy hàng/Đã nhập kho</UIText>
            case "4":
                return <UIText style={{ color: '#114F96' }}>Đã điều phối giao hàng/Đang giao hàng</UIText>
            case "5":
                return <UIText style={{ color: '#114F96' }}>Đã giao hàng/Chưa đối soát</UIText>
            case "6":
                return <UIText style={{ color: '#5BC8AC' }}>Đã đối soát</UIText>
            case "7":
                return <UIText style={{ color: '#D7373F' }}>Không lấy được hàng</UIText>
            case "8":
                return <UIText style={{ color: '#D7373F' }}>Hoãn lấy hàng</UIText>
            case "9":
                return <UIText style={{ color: '#D7373F' }}>Không giao được hàng</UIText>
            case "10":
                return <UIText style={{ color: '#D7373F' }}>Delay giao hàng</UIText>
            case "11":
                return <UIText style={{ color: '#5BC8AC' }}>Đã đối soát công nợ trả hàng</UIText>
            case "12":
                return <UIText style={{ color: '#5BC8AC' }}>Đã điều phối lấy hàng/Đang lấy hàng</UIText>
            case "13":
                return <UIText style={{ color: '#5BC8AC' }}>Đơn hàng bồi hoàn</UIText>
            case "20":
                return <UIText style={{ color: '#5BC8AC' }}>Đang trả hàng (COD cầm hàng đi trả)</UIText>
            case "21":
                return <UIText style={{ color: '#5BC8AC' }}>Đã trả hàng (COD đã trả xong hàng)</UIText>
            case "123":
                return <UIText style={{ color: '#5BC8AC' }}>Shipper báo đã lấy hàng</UIText>
            case "127":
                return <UIText style={{ color: '#D7373F' }}>Shipper (nhân viên lấy/giao hàng) báo không lấy được hàng</UIText>
            case "128":
                return <UIText style={{ color: '#114F96' }}>Shipper (nhân viên lấy/giao hàng) báo không lấy được hàng</UIText>
            case "45":
                return <UIText style={{ color: '#5BC8AC' }}>Shipper báo đã giao hàng</UIText>
            case "49":
                return <UIText style={{ color: '#D7373F' }}>Shipper báo không giao được hàng</UIText>
            case "410":
                return <UIText style={{ color: '#114F96' }}>Shipper báo delay giao hàng</UIText>
            default:
                return <UIText style={{ color: '#D7373F' }}>null</UIText>
        }
    }

    const cancelOrder = (id: number) => {
        axios.put(`${Config.api.api_base_url}/api/orders/${id}`, { status: 2 }, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                if (response.data.success) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Thông báo',
                        text2: "Huỷ đơn hàng thành công",
                        visibilityTime: 1000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                        onShow: () => {
                            props.fetchDataOrders(phoneSearch, props.ordersPage.currentPage);
                        }
                    });
                } else {
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
                }
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Thông báo',
                    text2: error.response.message,
                    visibilityTime: 1000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40
                });
            })
    }


    const handleOnEndReached = async () => {
        props.fetchDataOrders(phoneSearch, props.ordersPage.currentPage + 1);
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
            <View style={{ backgroundColor: 'white', padding: 15 }}>
                <TextInput
                    placeholder="Nhập tên khách hàng hoặc số điện thoại"
                    placeholderTextColor="#0A0A0A"
                    style={{ backgroundColor: "#E5E5E5", padding: 10, borderRadius: 5, color: 'black' }}
                    defaultValue={phoneSearch}
                    // autoFocus={true}
                    onChangeText={(value) => {
                        setPhoneSearch(value);
                        props.fetchDataOrders(value, 1);
                    }}
                />
            </View>
            {props.ordersPage.data.length > 0 &&
                <FlatList
                    data={props.ordersPage.data}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ backgroundColor: 'white', marginBottom: 15, padding: 15 }}>
                                <UIText style={styles.uitext}>Tên khách hàng: <Text style={{ color: '#333333' }}>{item.name}</Text></UIText>
                                <View style={{ flexDirection: 'row' }}>
                                    <UIText style={styles.uitext}>Số điện thoại: <Text style={{ color: '#333333' }}>{item.phone}</Text></UIText>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            Clipboard.setString(item.phone);
                                            Toast.show({
                                                type: 'success',
                                                position: 'top',
                                                text1: 'Thông báo',
                                                text2: "Đã sao chép số điện thoại",
                                                visibilityTime: 1000,
                                                autoHide: true,
                                                topOffset: 30,
                                                bottomOffset: 40,
                                            });
                                        }}
                                    >
                                        <AntDesign
                                            name="copy1"
                                            size={20}
                                            color={"#414C58"}
                                            style={{ lineHeight: 30, marginLeft: 10 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <UIText style={styles.uitext}>Địa chỉ nhận hàng: <Text style={{ color: '#333333' }}>{item.address}, {item.wards.name}, {item.districts.name}, {item.provinces.name}</Text></UIText>
                                <UIText style={styles.uitext}>Ngày tạo: <Text style={{ color: '#333333' }}>{convertDate(item.created_at)}</Text></UIText>
                                <FlatList
                                    data={JSON.parse(item.products)}
                                    keyExtractor={(e, index) => index.toString()}
                                    renderItem={({ id, index }: any) => {
                                        return <ProductOrder id={JSON.parse(item.products)[index]} quantity={JSON.parse(item.quantity)[index]} />
                                    }}
                                />
                                <UIText style={styles.uitext}>Giá trị đơn hàng: <Text style={{ color: '#333333' }}>{number_format(item.total_after_promotion, 0, '', '.') + 'đ'}</Text></UIText>
                                <UIText style={styles.uitext}>Tình trạng đơn hàng: {item.ship_type == "SHOP" ? statusShop(item.status) : statusShip(item.ship_partner_status)}</UIText>
                                {(item.status === 0 && item.ship_type === "SHOP") && <TouchableOpacity onPress={() => cancelOrder(item.id)} activeOpacity={0.8} style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name="closecircle" size={20} color="#D7373F" />
                                    <UIText style={[styles.uitext, { color: '#D7373F', marginLeft: 5 }]}>Huỷ đơn hàng</UIText>
                                </TouchableOpacity>}
                            </View>
                        )
                    }}
                    ListFooterComponent={() =>
                        props.ordersPage.currentPage < props.ordersPage.lastPage ?
                            <TouchableOpacity style={{
                                paddingBottom: 20,
                            }} onPress={() => handleOnEndReached()}>
                                <Text style={{ fontSize: 18, color: Colors.mainColor, textAlign: 'center', fontWeight: '500' }}>Load More</Text>
                            </TouchableOpacity> : <View />
                    }
                />
            }
        </View>
    )
}

function convertDate(stringDate: string) {
    const myDate = new Date(stringDate);
    const offsetMs = myDate.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(myDate.getTime() - offsetMs);
    return dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
}
const styles = StyleSheet.create({
    uitext: {
        lineHeight: 30,
        color: "#666666",
    },
    itemCart: {
        backgroundColor: "white",
        marginBottom: 15,
        flexDirection: "row",
    },
    imgProduct: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginRight: 10
    },
    textScreen: {
        fontSize: 12,
        color: "#363636",
        marginTop: 3
    },
});

const mapStateToProps = (state: any) => {
    return {
        homepage: state.homepage,
        ordersPage: state.ordersPage,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchDataOrders: (phone: any, page: number) => {
            dispatch(fetchDataOrders(phone, page));
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
