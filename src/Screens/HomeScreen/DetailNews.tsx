import React, { useEffect, useState } from 'react'
import {
    Alert
} from 'react-native'
import { useRoute } from '@react-navigation/native';
// import HTML from "react-native-render-html";
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import Config from "../../config";
import axios from "axios";
// import HTMLView from 'react-native-htmlview';
import { getData } from '../../Utilities/Storage';
import Body from '../Element/Body';
import CommonVariable from '../../Style/Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailNews = (props: any) => {
    const route = useRoute();
    const param = route.params as any;
    const [detail, setDetail] = useState('');
    useEffect(() => {
        getData('userData')
            .then(res => getNews(res))
            .catch(err => Alert.alert(err))
    }, []);

    const getNews = async (token: string) => {
        await axios.get(`${Config.api.api_base_url}/api/news/${param.news}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => { setDetail(response.data.data.content) })
            .catch(error => Alert.alert(error));
        AsyncStorage.removeItem('navigation');
    }
    const systemFonts = ["space-mono", ...defaultSystemFonts];

    const myHTMLTagStyles = {
        body: { fontSize: 50 },
        h1: { fontSize: 50, color: "red" }
    };

    return (
        <Body>
            {detail !== '' ?
                // <HTMLView
                //     value={detail}
                // />
                <RenderHtml
                    contentWidth={CommonVariable.screenWidth}
                    source={{
                        html: detail
                    }}
                    baseStyle={{
                        // fontSize: 20,
                        padding: 15
                    }}
                    enableExperimentalMarginCollapsing={true}
                    systemFonts={systemFonts}
                    tagsStyles={myHTMLTagStyles}
                />
                : null
            }
        </Body>
    )
}

export default DetailNews