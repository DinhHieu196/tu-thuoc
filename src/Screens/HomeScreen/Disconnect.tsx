import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Colors from '../../Style/Colors';

const Disconnect = (props: any) => {

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center'}}>Không có kết nối mạng. Vui lòng kiểm tra lại đường truyền!</Text>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop: 10}} onPress={props.onPress}>
                <Text style={{fontSize: 16, color: Colors.mainColor, fontWeight: 'bold'}}>Thử lại</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Disconnect;