import React, { useState } from 'react';
import {
    StyleSheet, 
    View, 
    TouchableOpacity,
    SafeAreaView,
    Image, 
    FlatList
} from 'react-native';
import UIText from '../../Component/UIText';
import Body from '../Element/Body';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';

const news = [
    {id: 1, name: "Màn trình diễn của tiền vệ 18 tuổi làm lu mờ tuyến giữa Liverpool", image: require("../../assets/tintuc.png")},
    {id: 2, name: "Màn trình diễn của tiền vệ 18 tuổi làm lu mờ tuyến giữa Liverpool", image: require("../../assets/tintuc.png")},
    {id: 3, name: "Màn trình diễn của tiền vệ 18 tuổi làm lu mờ tuyến giữa Liverpool", image: require("../../assets/tintuc.png")},
]

const PayDone = () => {

    const navigation = useNavigation();

    const _renderItem = (item: any) => {

        return (
            <TouchableOpacity style={styles.news} onPress={() => navigation.navigate(RouteNames.NEWSDETAIL)}>
                <Image source={item.image} style={styles.imageNews} />
                <UIText style={styles.titleNews}>{item.name}</UIText>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{margin: 15, backgroundColor: '#F5F5F5'}}>
                <FlatList 
                    data={news}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => {
                        return (
                            _renderItem(item)
                        )
                    }}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    news: {
        backgroundColor: "white", 
        marginBottom: 15, 
        flexDirection: "row"
    },
    imageNews: {
        width: "40%", 
        height: 120, 
        marginRight: 15
    },
    titleNews: {
        fontSize: 16, 
        color: "#0F1738", 
        flex: 1, 
        marginVertical: 10
    }
})

export default PayDone;