import React, { useState } from 'react';
import {StyleSheet, View, TouchableOpacity, Image, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UIText from '../../Component/UIText';
import Body from '../Element/Body';
import Colors from '../../Style/Colors';
import CommonStyles from '../../Style/CommonStyles';
import { RouteNames } from '../../Router/route-names';
import { useNavigation } from '@react-navigation/native';
import CommonVariable from '../../Style/Variable';

const PayDone = () => {

    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <Body style={{margin: 15, backgroundColor: '#F5F5F5'}}>
                <View>
                    <UIText style={styles.title}>Màn trình diễn của tiền vệ 18 tuổi làm lu mờ tuyến giữa Liverpool</UIText>
                    <Image source={require('../../assets/tintuc.png')} style={styles.image} />
                    <UIText style={styles.titleContent}>Sau chiến thắng 2-0 của Chelsea trước Liverpool, người ta nhắc nhiều đến cái tên Billy Gilmour, tiền vệ 18 tuổi làm lu mờ tuyến giữa của Liverpool.</UIText>
                    <UIText style={styles.content}>Rạng sáng 4/3 (giờ Hà Nội), Chelsea tiếp đón Liverpool ở vòng 5 FA Cup trên sân Stamford Bridge. Cả HLV Frank Lampard lẫn Juergen Klopp đều không muốn thất bại ở đấu trường này khi tung ra đội hình gồm nhiều cầu thủ trụ cột.</UIText>
                    <UIText style={styles.content}>Ở tuyến giữa, những cái tên như Mateo Kovacic, Jorginho, Ross Barkley, Fabinho và Adam Lallana đều quá quen thuộc với người hâm mộ. Tuy nhiên, chàng trai 18 tuổi Billy Gilmour mới là ông chủ của khu vực trung tâm.</UIText>
                    <UIText style={styles.author}>Minh Khang</UIText>
                </View>
                <View style={styles.involve}>
                    <TouchableOpacity style={styles.itemInvolve}>
                        <View style={styles.icon}></View>
                        <UIText style={{fontSize: 16, color: '#0F1738', flex: 1}}>De Bruyne có thể nghỉ đá derby Manchester</UIText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemInvolve}>
                        <View style={styles.icon}></View>
                        <UIText style={{fontSize: 16, color: '#0F1738', flex: 1}}>De Bruyne có thể nghỉ đá derby Manchester</UIText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemInvolve}>
                        <View style={styles.icon}></View>
                        <UIText style={{fontSize: 16, color: '#0F1738', flex: 1}}>De Bruyne có thể nghỉ đá derby Manchester</UIText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemInvolve}>
                        <View style={styles.icon}></View>
                        <UIText style={{fontSize: 16, color: '#0F1738', flex: 1}}>De Bruyne có thể nghỉ đá derby Manchester</UIText>
                    </TouchableOpacity>
                </View>
            </Body>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#0F1738",
        marginBottom: 15,
        fontWeight: "bold"
    },
    image: {
        width: "100%",
        height: 230,
    },
    titleContent: {
        fontSize: 16,
        color: "#0F1738",
        paddingVertical: 15,
        fontWeight: "bold",
    },
    content: {
        fontSize: 16,
        color: "#0F1738",
        marginBottom: 15,
    },
    author: {
        fontSize: 16,
        color: "#3191CF",
        textAlign: "right",
        paddingBottom: 15
    },
    involve: {
        borderTopColor: "#DDDDDD",
        borderTopWidth: 1,
        paddingHorizontal: 10
    },
    itemInvolve: {
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        width: 5, 
        height: 5, 
        backgroundColor: "#3191CF", 
        marginRight: 10
    }
})

export default PayDone;