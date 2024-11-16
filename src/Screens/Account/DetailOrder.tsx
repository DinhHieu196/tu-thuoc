import React from 'react'
import {
    View, StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native'
import UIText from "../../Component/UIText";
import Body from '../Element/Body';
import { useRoute } from '@react-navigation/native';
import Colors from '../../Style/Colors';
import { number_format } from '../../Utilities/Number';
import { get } from 'lodash'
const DetailOrder = (props: any) => {
    const route = useRoute();
    const param = route.params;
    return (
        <Body style={{ flex: 1, backgroundColor: "#F5F5F5", paddingVertical: 20, paddingHorizontal: 15 }}>
           
        </Body>
    )
}

const styles = StyleSheet.create({
    imgProduct: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 10,
        marginRight: 10
    },
    old: {
        fontSize: 12,
        color: "#909090",
        textDecorationLine: "line-through",
        textDecorationColor: "#909090",
        marginBottom: 3
    },
    current: {
        fontSize: 14,
        color: Colors.mainColor,
        fontWeight: "bold",
        marginBottom: 3
    },
    textOrder: {
        color: "#363636",
        lineHeight: 25,
    }
})
export default DetailOrder;