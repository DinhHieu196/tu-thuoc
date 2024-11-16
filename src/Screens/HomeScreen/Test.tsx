import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RouteNames } from '../../Router/route-names';
import axios from 'axios';

const Test = () => {
    const navigation = useNavigation();
    const [city, setCity] = useState([]);

    useEffect(() => {
        axios.get('https://thongtindoanhnghiep.co/api/city')
            .then((response) => setCity(response.data.LtsItem))
            .catch((error) => console.log(error))
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <FlatList
                data={city}
                keyExtractor={item => item.Title}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity onPress={() => navigation.navigate(RouteNames.PAYSCREEN, {city: item})} style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#888888' }}>
                            <Text style={{ paddingHorizontal: 10 }}>{item.Title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Test;