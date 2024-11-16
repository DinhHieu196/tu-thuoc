import React, {useEffect} from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import {RouteNames} from '../../Router/route-names';
import Spinner from 'react-native-loading-spinner-overlay';

const Loading = (props: any) => {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1}}>
            <Spinner
                visible={true}
            />
        </View>
    )
}

export default Loading