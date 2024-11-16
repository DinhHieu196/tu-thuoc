import React, { useState } from 'react';
import {StyleSheet, View, TouchableOpacity, Image, FlatList} from 'react-native';
import UIText from '../../Component/UIText';
import Body from '../Element/Body';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';
import Colors from '../../Style/Colors';

const option = [
    {name: "Thương hiệu"},
    {name: "Màu sắc"},
    {name: "Thể loại"},
    {name: "Đặc tính"},
    {name: "Xuất xứ"},
    {name: "Kích thước"},
]

const FilterProduct = () => {

    const navigation = useNavigation();
    const [filter, setFilter] = useState("Thương hiệu");

    const option1 = () => {

        return (
            <View>
                <View style={{flexDirection: "row", padding: 15, justifyContent: "space-between"}}>
                    <UIText style={styles.textScreen}>Thương hiệu A</UIText>
                    <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                </View>
                <View style={{flexDirection: "row", padding: 15, justifyContent: "space-between"}}>
                    <UIText style={styles.textScreen}>Thương hiệu B</UIText>
                    <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                </View>
                <View style={{flexDirection: "row", padding: 15, justifyContent: "space-between"}}>
                    <UIText style={styles.textScreen}>Thương hiệu C</UIText>
                    <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                </View>
                <View style={{flexDirection: "row", padding: 15, justifyContent: "space-between"}}>
                    <UIText style={styles.textScreen}>Thương hiệu D</UIText>
                    <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                </View>
            </View>
        )
    }
    const option2 = () => {

        return (
            <View>
                <UIText style={styles.textScreen}>Màu sắc</UIText>
            </View>
        )
    }
    const option3 = () => {

        return (
            <View>
                <UIText style={styles.textScreen}>Thể loại</UIText>
            </View>
        )
    }
    const option4 = () => {

        return (
            <View>
                <UIText style={styles.textScreen}>Đặc tính</UIText>
            </View>
        )
    }
    const option5 = () => {

        return (
            <View>
                <UIText style={styles.textScreen}>Xuất xứ</UIText>
            </View>
        )
    }
    const option6 = () => {

        return (
            <View>
                <UIText style={styles.textScreen}>Kích thước</UIText>
            </View>
        )
    }

    const renderOption = () => {
        switch (filter) {
            case "Thương hiệu":
                return option1()
            case "Màu sắc":
                return option2()
            case "Thể loại":
                return option3()
            case "Đặc tính":
                return option4()
            case "Xuất xứ":
                return option5()
            case "Kích thước":
                return option6()
            default:
                return null;
        }
    }
    return (
        <View style={{flex: 1}}>
            <Body style={{backgroundColor: "#F5F5F5"}}>
                <View style={{flexDirection: "row", flex: 1}}>
                    <View style={{flex: 4}}>
                        <FlatList 
                            data={option}
                            keyExtractor={item => item.name}
                            renderItem = {({item}) => {
                                return (
                                    <TouchableOpacity 
                                        style={[styles.btnOption, {backgroundColor: item.name == filter ? "#F0F0F0" : "#F5F5F5"}]}
                                        onPress={() => setFilter(item.name)}
                                    >
                                        <UIText style={[styles.textOption, {color: item.name == filter ? Colors.mainColor : "#363636"}]}>{item.name}</UIText>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                    <View style={{flex: 6, paddingHorizontal: 15, backgroundColor: "#F0F0F0"}}>
                        {renderOption()}
                    </View>
                </View>
            </Body>
            <View style={styles.btnBt}>
                <TouchableOpacity style={[styles.btn, {backgroundColor: "white"}]}>
                    <UIText style={{fontSize: 16, color: "#363636"}}>XÓA TẤT CẢ</UIText>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate(RouteNames.FLASHSALE, {test: "Test"})}
                    style={[styles.btn, {backgroundColor: Colors.mainBlue}]}
                >
                    <UIText style={{fontSize: 16, color: "white"}}>ÁP DỤNG</UIText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textScreen: {
        fontSize: 16,
        color: "#909090"
    },
    textOption: {
        fontSize: 16,
        color: "#363636"
    },
    btnOption: {
        padding: 15, 
        borderBottomColor: "#EBEBEB", 
        borderBottomWidth: 1
    },
    checkbox: {
        width: 24, 
        height: 24, 
        borderRadius: 4, 
        borderWidth: 1, 
        borderColor: "#909090"
    },
    btn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    btnBt: {
        flexDirection: "row", 
        paddingHorizontal: 15, 
        paddingVertical: 10,
        backgroundColor: "white", 
        paddingBottom: 25
    }
})

export default FilterProduct;