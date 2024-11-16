import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
    Alert
} from 'react-native';
import UIText from '../../Component/UIText';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';
import { connect } from 'react-redux';
import Config from "../../config";
import axios from "axios";
import { getData } from '../../Utilities/Storage';
import Spinner from 'react-native-loading-spinner-overlay';

const FlashSale = (props: any) => {
    // const [token, setToken] = useState('');
    const [news, setNews] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData('userData')
            .then(res => getNews(res))
            .catch(err => Alert.alert(err))
    }, []);

    const getNews = (token: string) => {
        setLoading(true);
        axios.get(`${Config.api.api_base_url}/api/news`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => { setNews(response.data.data) })
            .catch(error => Alert.alert(error))
            .finally(() => setLoading(false));

    }
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>

            <Spinner
                visible={loading}
            />
            {loading == false && news.length > 0 ?
                <FlatList
                    data={news}
                    // numColumns={2}
                    keyExtractor={(item: any) => item.id.toString()}
                    // onEndReached={getPage}
                    renderItem={({ item }: any) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    console.log(item.id);
                                    navigation.navigate(
                                        RouteNames.DETAILNEWS,
                                        { news: item.id }
                                    )
                                }}
                                style={{ marginHorizontal: 15, marginTop: 20, paddingBottom: 10, borderBottomColor: '#E6E6E6', borderBottomWidth: 1 }}
                            >
                                <Image source={{ uri: `http://backend.idoctors.vn/images/${item.image}` }} style={{ width: '100%', borderRadius: 10, height: 200, resizeMode: 'cover' }} />
                                <UIText style={{ flex: 1, fontSize: 15, fontWeight: 'bold', marginTop: 15, color: '#252525' }}>{item.name}</UIText>
                            </TouchableOpacity>
                        );
                    }}
                />
                :
                <UIText style={{ textAlign: 'center', paddingVertical: 50 }}>Chưa có tin tức</UIText>
            }
        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => {
    return {
        homepage: state.homepage
    }
}
export default connect(mapStateToProps)(FlashSale);