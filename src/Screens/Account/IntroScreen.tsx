import React from 'react'
import { ScrollView } from 'react-native'
import {useRoute} from '@react-navigation/native';
import HTML from "react-native-render-html";
const IntroScreen = (props: any) => {
    const route = useRoute();
    let param = route.params;
    return (
        <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
            <HTML                 
                source={{html: param.intro}}
            />
        </ScrollView>
    )
}

export default IntroScreen