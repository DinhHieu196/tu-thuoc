import React from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import UIText from '../../Component/UIText';
import CommonVariable from '../../Style/Variable';

const service = [
    {id: 1, name: "Đảm bảo\nchất lượng", icon: require('../../assets/002-free-delivery-03.png')},
    {id: 2, name: "Giao hàng\ntoàn quốc", icon: require('../../assets/free-delivery-01.png')},
    {id: 3, name: "Tư vấn\nmiễn phí", icon: require('../../assets/002-free-delivery-04.png')},
]
const Service = () => {

    return (
        <View>
            <FlatList
                data={service}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                renderItem={({item, index}) => {
                    return(
                        <View style={[styles.service, {borderRightWidth: index == service.length - 1 ? 0 : 1}]}>
                            <Image source={item.icon} />
                            <UIText style={styles.textService}>{item.name}</UIText>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    service: {
        width: (CommonVariable.screenWidth - 30) / 3,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#C3C3C3",
    },
    textService: {
        textAlign: "center",
        color: "#363636"
    },
})

export default Service;
