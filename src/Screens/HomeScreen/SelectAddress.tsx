import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native'
import Body from '../Element/Body';
import UIText from '../../Component/UIText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonVariable from '../../Style/Variable';
import axios from 'axios';
import Config from "../../config";
import { getData } from '../../Utilities/Storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteNames } from '../../Router/route-names';

const SelectAddress = (props: any) => {
    const [listData, setListData] = useState({ type: 0, data: [] }) as any;
    const [ctrlSearch, setCtrlSearch] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const param = route.params as any;
    const [token, setToken] = useState('');

    useEffect(() => {
        getData('userData')
            .then(res => {
                setToken(res);
                if (param.type == 1) {
                    fetchProvince("", res)
                } else if (param.type == 2) {
                    fetchDistric("", res, param.id)
                } else if (param.type == 3) {
                    fetchWard("", res, param.id)
                }
            });
    }, [])

    const fetchWard = (key?: string, token?: any, id?: any) => {
        axios.get(`${Config.api.api_base_url}/api/location/ward/${id}?name=${key}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    setListData({
                        type: 3,
                        data: response.data.data
                    })
                }
            })
            .catch((error) => console.log(error))
    }

    const fetchDistric = (key?: string, token?: string, id?: any) => {
        axios.get(`${Config.api.api_base_url}/api/location/district/${id}?name=${key}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    setListData({
                        type: 2,
                        data: response.data.data
                    })
                }
            })
            .catch((error) => console.log(error))
    }

    const fetchProvince = (key?: string, token?: string) => {
        axios.get(`${Config.api.api_base_url}/api/location/province?name=${key}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    setListData({
                        type: 1,
                        data: res.data.data
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const renderTitle = () => {
        switch (listData.type) {
            case 1:
                return "Chọn Tỉnh/ Thành Phố"
            case 2:
                return "Chọn Quận/ Huyện"
            case 3:
                return "Chọn Phường/ Xã"
            case 4:
                return "Chọn người giới thiệu"
            default:
                break;
        }
    }
    const onSearch = (value: string) => {
        switch (param.type) {
            case 1:
                fetchProvince(value, token)
                break;
            case 2:
                fetchDistric(value, token, param.id)
                break;
            case 3:
                fetchWard(value, token, param.id)
                break;
            default:
                break;
        }
    }
    return (
        <View style={styles.dialog}>
            <UIText style={{ paddingHorizontal: 15, paddingVertical: 10 }}>{renderTitle()}</UIText>
            <TextInput
                placeholder="Nhập từ khoá muốn tìm kiếm"
                placeholderTextColor="#c3c3c3"
                style={styles.inputDialog}
                defaultValue={ctrlSearch}
                onChangeText={value => {
                    setCtrlSearch(value);
                    onSearch(value);
                }}
            />
            <FlatList
                data={listData.data}
                keyExtractor={item => item.name}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            key={item.name}
                            onPress={() => {
                                navigation.navigate(RouteNames.PAYSCREEN, { data: item, type: param.type });
                                // setCtrlSearch("");

                            }} style={{
                                paddingVertical: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#f5f5f5'
                            }}>
                            <UIText style={{ paddingHorizontal: 10 }}>{item.name}</UIText>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    titleDialog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    dialog: {
        width: CommonVariable.screenWidth,
        height: CommonVariable.screenHeight,
        paddingTop: 5,
    },
    inputDialog: {
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 15,
        marginHorizontal: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderColor: "#999999",
        color: '#0A0A0A'
    },
});

export default SelectAddress;