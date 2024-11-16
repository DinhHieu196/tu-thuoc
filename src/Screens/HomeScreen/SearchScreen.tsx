import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import UIText from '../../Component/UIText';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Style/Colors';
import CommonVariable from '../../Style/Variable';
import { addItemCart } from '../../Actions/cartlPageAction';
import { logoutAction } from "../../Actions/userPageAction";
import { connect } from 'react-redux';
import { RouteNames } from "../../Router/route-names";
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Config from '../../config';
import axios from "axios";
import { getData } from '../../Utilities/Storage';
import { number_format } from '../../Utilities/Number';

const sort = [
    { id: 1, name: "Mới nhất" },
    { id: 2, name: "Giá cao nhất" },
    { id: 3, name: "Giá thấp nhất" }
]

const SearchScreen = (props: any) => {
    const navigation = useNavigation();
    const [dialogSort, setDialogSort] = useState<boolean>(false);
    const [selectSort, setSelectSort] = useState(1);
    const [listProducts, setListProducts] = useState([])
    const [key, setKey] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        getData('userData')
            .then(res => setToken(res == null ? '' : res))
            .catch(err => Alert.alert(err))
    }, [])
    const onChange = async (sort: number, value: any) => {
        if (value.length > 0 && value.indexOf(' ') !== 0) {
            setKey(value)

            axios.get(`http://api.idoctors.vn/api/products?name=${value}&sortBy=${sort}`, { headers: { "Authorization": `Bearer ${token}` } })
                .then(response => {
                    setListProducts(response.data.data)
                })
                .catch(error => {
                    Alert.alert(error)
                })
        } else {
            setListProducts([]);
            setKey(value);
        }
    }
    const logout = () => {
        navigation.navigate("LoginStack");
        props.logoutAction();
    }

    const order = (item: any) => {
        if (token == '') {
            Alert.alert(
                "Cảnh báo",
                "Bạn phải đăng nhập mới sử dụng được chức năng này",
                [
                    {
                        text: "Không đăng nhập",
                        onPress: () => {

                        },
                        style: "cancel"
                    },
                    {
                        text: "Đăng nhập", onPress: () => {
                            logout();
                        }
                    }
                ]
            );

            return
        }
        let arr = props.cartPage.data;
        let checkCart = arr.filter((val: any) => val.id == item.id);
        if (checkCart.length > 0) {
            navigation.navigate(RouteNames.SHOPPINGCART);
        } else {
            const product = {
                "id": item.id,
                "quantity": 1,
                "image": item.image_slider[0],
                "title": item.title,
                "base_cost": item.base_cost,
                "promotion_cost": item.promotion_cost,
                "lieuluong": item.lieuluong,
            };
            arr.push(product);
            props.addItemCart(JSON.stringify(arr));
            navigation.navigate(RouteNames.SHOPPINGCART);
        }
    }

    const handleSort = (id: any) => {
        setSelectSort(id)
        setDialogSort(false)
        onChange(id, key)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TextInput
                style={{
                    borderWidth: 1,
                    color: 'black',
                    borderColor: "#707070",
                    borderRadius: 24,
                    height: 45,
                    padding: 10,
                    margin: 15,
                    marginBottom: 0,
                }}
                onChangeText={(value) => onChange(selectSort, value)}
                autoFocus={true}
                value={key}
                autoCapitalize='none'
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingVertical: 10,
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: '#C3C3C3',
                height: 50,
                zIndex: 100
            }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ flexDirection: 'row', alignItems: 'center', zIndex: 100 }}
                    onPress={() => setDialogSort(!dialogSort)}>
                    <UIText style={styles.titleSort}>Sắp xếp</UIText>
                    <Image source={require('../../assets/sort.png')} />
                </TouchableOpacity>
                {dialogSort &&
                    <View style={{ position: 'absolute', left: 15, top: 41, width: '100%', backgroundColor: '#EBEBEC', borderTopWidth: 0.5, borderTopColor: '#C3C3C3' }}>
                        <FlatList
                            data={sort}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={{ paddingVertical: 10 }}
                                        onPress={() => handleSort(item.id)}>
                                        <UIText
                                            style={[
                                                styles.textSort,
                                                {
                                                    color:
                                                        selectSort == item.id
                                                            ? Colors.mainColor
                                                            : '#363636',
                                                },
                                            ]}>
                                            {item.name}
                                        </UIText>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                }
            </View>
            <View style={{ marginTop: 15, height: '100%' }}>
                <FlatList
                    data={listProducts}
                    numColumns={2}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1, marginBottom: 15, marginLeft: 7.5 }}>
                                <View
                                    style={[styles.product]}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        style={styles.detail}
                                        onPress={() => {
                                            navigation.navigate(RouteNames.DETAILPRODUCT, { productId: item.id })
                                        }}
                                    >
                                        <Image source={item.image_slider[0] !== undefined ? { uri: item.image_slider[0] } : require('../../assets/no-image.png')} style={styles.imageProduct} />
                                        <UIText numberOfLines={2} style={styles.name}>{item.title}</UIText>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <UIText style={styles.current}>{item.promotion_cost != "" ? number_format(item.promotion_cost, 0, '', '.') + 'đ' : number_format(item.base_cost, 0, '', '.') + 'đ'}</UIText>
                                            <UIText style={styles.old}>{item.promotion_cost != "" ? number_format(item.base_cost, 0, '', '.') + 'đ' : ""}</UIText>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => order(item)} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 10 }}>
                                        <Image source={require('../../assets/order.png')} style={{ width: 25, height: 25 }} />
                                        <UIText style={{ color: '#414C58' }}>Đặt Hàng</UIText>
                                        <View />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: Colors.mainColor,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        paddingVertical: 10,
    },
    titleSort: {
        fontSize: 16,
        color: '#363636',
        marginRight: 5,
    },
    textDialog: {
        color: '#363636',
        fontSize: 16,
    },
    textSort: {
        fontSize: 16,
        textAlign: 'center',
    },
    detail: {
        marginHorizontal: 15,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#707070',
        paddingBottom: 10,
        alignItems: 'center'
    },
    product: {
        backgroundColor: 'white',
        width: (CommonVariable.screenWidth / 2) - 25,
        borderRadius: 14,
        paddingVertical: 15,
        marginHorizontal: 7.5
    },
    imageProduct: {
        width: 100,
        height: 100,
        resizeMode: "cover"
    },
    name: {
        fontSize: 12,
        color: Colors.mainColor,
        marginTop: 10,
        marginBottom: 5,
        height: 40,
        textAlign: 'center'
    },
    old: {
        fontSize: 11,
        color: "#9FA6B6",
        textDecorationLine: "line-through",
        textDecorationColor: "#9FA6B6",
        fontWeight: 'bold'
    },
    current: {
        fontSize: 11,
        color: '#EF699A',
        fontWeight: "bold",
        marginRight: 5
    },
});
SearchScreen.defaultProps = {
    categoryPage: {
        data: {},
    },
};
const mapStateToProps = (state: any) => {
    return {
        categoryPage: state.categoryPage,
        cartPage: state.cartPage
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addItemCart: (data: any) => {
            dispatch(addItemCart(data));
        },
        logoutAction: () => {
            dispatch(logoutAction())
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
