import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';
import Body from '../Element/Body';
import UIText from '../../Component/UIText';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../Style/Colors';
import { RouteNames } from '../../Router/route-names';
import { useNavigation } from '@react-navigation/native';
import { fetchDataCart, deleteItem, changeQuantity } from "../../Actions/cartlPageAction";
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import { get, size } from 'lodash'
import { number_format } from '../../Utilities/Number';
const ShoppingCart = (props: any) => {

    const navigation = useNavigation();
    const shopping = () => {
        navigation.navigate(RouteNames.PAYSCREEN)
    }


    const renderPrice = (price: any) => {
        return number_format(price, 0, '', '.') + 'đ'
    }

    let dataList = props.cartPage.data.concat([{x: 1}, {x: 2}])
    return (
        <View style={{ flex: 1, }}>
            <SafeAreaView style={{ borderRadius: 0, backgroundColor: '#F5F5F5' }}>
                <Spinner
                    visible={props.cartPage.isFetching}
                />
                <View>
                    <FlatList
                        data={dataList}
                        keyExtractor={(item) => item.x == undefined ? item.id.toString() : JSON.stringify(item)}
                        renderItem={({ item }) => {
                            if(item.x != undefined) {
                                if(item.x == 1) {
                                    if(props.cartPage.data.length > 0 ) {
                                        return (<View style={styles.rowTotal}>
                                        <UIText style={styles.total}>Tổng tiền: </UIText>
                                        <UIText style={styles.price}>{props.cartPage.price}</UIText>
                                    </View>)                                        
                                    } else {
                                        return (<UIText style={{ fontSize: 15, color: "#363636", textAlign: "center", marginVertical: 15 }}>
                                            Chưa có sản phẩm trong giỏ hàng
                                            </UIText>)
                                    }

                                }else if(item.x == 2) {
                                    if(props.cartPage.data.length > 0 ) {
                                        return (<View style={{ backgroundColor: 'white' }}>
                                            <TouchableOpacity
                                                style={styles.btnBuy}
                                                activeOpacity={0.9}
                                                onPress={() => shopping()}>
                                                <UIText style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
                                                    ĐẶT HÀNG
                                                </UIText>
                                            </TouchableOpacity>
                                    </View>)                                        
                                    } else {
                                        return (<View />)
                                    }
                                }
                                
                            }
                            return (
                                <View style={styles.itemCart}>
                                    <Image
                                        source={item.image !== "" ? { uri: item.image } : require('../../assets/no-image.png')}
                                        style={styles.imgProduct}
                                    />
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'space-between',
                                        }}>
                                        <UIText style={styles.nameProduct}>
                                            {item.title}
                                        </UIText>                                        
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View>
                                                {item.promotion_cost !== 0 ?
                                                    <UIText style={{ textDecorationLine: 'line-through', textDecorationColor: '#707070', color: '#707070' }}>
                                                        {renderPrice(item.base_cost)}
                                                    </UIText> : null}
                                                {item.promotion_cost !== 0 ?
                                                    <UIText style={styles.price}>
                                                        {renderPrice(item.promotion_cost)}
                                                    </UIText>
                                                    :
                                                    <UIText style={styles.price}>
                                                        {renderPrice(item.base_cost)}
                                                    </UIText>}
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                <TouchableOpacity onPress={() => { props.changeQuantity(item.id, "plus") }}>
                                                    <Feather
                                                        name="plus"
                                                        size={25}
                                                        color="#909090"
                                                    />
                                                </TouchableOpacity>
                                                <UIText style={styles.quantity}>
                                                    {item.quantity}
                                                </UIText>
                                                <TouchableOpacity onPress={() => { props.changeQuantity(item.id, "minus") }}>
                                                    <Feather
                                                        name="minus"
                                                        size={25}
                                                        color="#909090"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                    <TouchableOpacity style={styles.btnClose} onPress={() => {
                                        props.deleteItem(item.id);
                                    }}>
                                        <AntDesign
                                            name="close"
                                            size={22}
                                            color="#363636"
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>                

            </SafeAreaView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    itemCart: {
        padding: 15,
        paddingTop: 25,
        backgroundColor: 'white',
        marginTop: 15,
        flexDirection: 'row',
    },
    imgProduct: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginRight: 15,
    },
    price: {
        fontSize: 18,
        color: '#F54F9A',
        fontWeight: 'bold',
    },
    quantity: {
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
        borderWidth: 1,
        borderColor: '#909090',
        marginHorizontal: 10,
    },
    nameProduct: {
        fontSize: 16,
        color: Colors.mainColor,
    },
    btnClose: {
        position: 'absolute',
        right: 15,
        top: 3,
    },
    total: {
        fontWeight: 'bold',
        color: '#363636',
    },
    rowTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
    },
    btnBuy: {
        height: 50,
        margin: 15,
        backgroundColor: '#D30101',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
});
ShoppingCart.defaultProps = {
    cartPage: {
        data: {},
    },
};
const mapStateToProps = (state: any) => {
    return {
        cartPage: state.cartPage,
        userPage: state.userPage,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchDataCart: () => {
            dispatch(fetchDataCart());
        },
        deleteItem: (id: any) => {
            dispatch(deleteItem(id))
        },
        changeQuantity: (id: any, method: string) => {
            dispatch(changeQuantity(id, method))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
