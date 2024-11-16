import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, FlatList } from 'react-native';
import UIText from '../../Component/UIText';
import Body from '../Element/Body';
import Colors from '../../Style/Colors';
import { useRoute } from '@react-navigation/native';

const DetailNotify = () => {

    const route = useRoute();
    const param = route.params as any;
    return (
        <Body style={{padding: 15}}>
            <UIText style={{ fontSize: 16, lineHeight: 25 }}>{param.notify.content} vào lúc {param.notify.updated_at}</UIText>
        </Body>
    )
}

export default DetailNotify;