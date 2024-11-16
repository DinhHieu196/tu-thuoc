import React from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import Colors from '../../Style/Colors';
import CommonVariable from '../../Style/Variable';
import UIText from '../../Component/UIText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const dataNews = [
    {id: 1, title: "Hoa hậu Kỳ Duyên, Jun Vũ chuộng váy áo hai dây trễ ngực", image: require('../../assets/news1.png')},
    {id: 2, title: "Hoa hậu Kỳ Duyên, Jun Vũ chuộng váy áo hai dây trễ ngực", image: require('../../assets/news2.png')},
    {id: 3, title: "Hoa hậu Kỳ Duyên, Jun Vũ chuộng váy áo hai dây trễ ngực", image: require('../../assets/news3.png')},
    {id: 4, title: "Hoa hậu Kỳ Duyên, Jun Vũ chuộng váy áo hai dây trễ ngực", image: require('../../assets/banner1.png')},
]

const News = () => {
    return (
        <View style={{paddingHorizontal: CommonVariable.appPadding}}>
            <UIText style={styles.title}>TIN TỨC LÀM ĐẸP</UIText>
            <FlatList
                data={dataNews}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <View style={styles.itemNews}>
                            <Image source={item.image} style={styles.imageNews} />
                            <TouchableOpacity>
                                <UIText style={styles.titleNews}>{item.title}</UIText>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textTransform: "uppercase",
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.mainBlue,
        paddingVertical: CommonVariable.appPadding
    },
    titleNews: {
        paddingVertical: 10,
        fontSize: 16
    },
    imageNews: {
        width: "100%",
        height: 180,
        resizeMode:"cover"
    },
    itemNews: {
        width: CommonVariable.screenWidth*0.8,
        marginRight: 30
    }
})

export default News;
