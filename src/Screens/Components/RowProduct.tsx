import React from 'react';
import { get } from 'lodash';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Colors from '../../Style/Colors';
import CommonVariable from '../../Style/Variable';
import UIText from '../../Component/UIText';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';

const RowProduct = (props: any) => {
    const navigation = useNavigation();
    const renderProduct = (item: any) => {
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={[styles.product, { paddingBottom: 15 }]}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.detail}
                        onPress={() => {
                            navigation.navigate(RouteNames.DETAILPRODUCT, { productId: item.id })
                        }}
                    >
                        <Image source={{ uri: item.image }} style={styles.imageProduct} />
                        <UIText numberOfLines={2} style={styles.name}>{item.title}</UIText>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <UIText style={styles.current}>{item.sale_text != "" ? item.promotion : item.price}</UIText>
                            <UIText style={styles.old}>{item.sale_text != "" ? item.price : ""}</UIText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 10 }}>
                        <Image source={require('../../assets/order.png')} style={{ width: 25, height: 25 }} />
                        <UIText style={{color: '#414C58'}}>Đặt Hàng</UIText>
                        <View />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', right: 10, top: 10}}>
                        <Image source={require('../../assets/like.png')} style={{width: 26, height: 26}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    return (
        <View style={styles.rowProduct}>
            <View style={styles.headerProduct}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => { props.species === 'Flashsale' ? navigation.navigate(RouteNames.FLASHSALE) : null }}>
                    <UIText style={styles.title} numberOfLines={1}>{(props.species == 'Flashsale' || props.species == 'Flashsale2') ? props.name : props.species}</UIText>
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <FlatList
                    data={get(props, 'products.data', [])}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            renderProduct(item)
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerProduct: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: CommonVariable.appPadding,
    },
    title: {
        textTransform: "uppercase",
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.mainColor
    },
    textSold: {
        fontSize: 12,
        color: "#363636",
    },
    sold: {
        height: 20,
        flex: 1,
        backgroundColor: "#B9E5DA",
        marginTop: 5,
        justifyContent: "center",
        paddingHorizontal: 15
    },
    soldChild: {
        width: "25%",
        backgroundColor: "#5BC8AC",
        height: 20,
        position: "absolute",
        left: 0
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
        width: CommonVariable.screenWidth / 2.3,
        backgroundColor: 'white',
        marginRight: 15,
        borderRadius: 14,
        paddingVertical: 15
    },
    imageProduct: {
        width: 100,
        height: 100,
        resizeMode: "cover"
    },
    name: {
        fontSize: 12,
        color: Colors.mainColor,
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
    sale: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#5BC8AC",
        position: "absolute",
        right: 0,
        fontSize: 12,
        color: "white"
    },
    rowProduct: {
        paddingLeft: 15,
        // borderBottomColor: "#E3E3E3",
        // borderBottomWidth: 15,
        // paddingBottom: 15
    }
})

export default RowProduct
