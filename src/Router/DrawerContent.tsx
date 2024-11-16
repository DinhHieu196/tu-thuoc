import React from 'react';
import { View,  TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from './route-names';

const DrawerContent = (props: any) => {
    const navigation = useNavigation();

    const moveCategory = () => {
        navigation.navigate(RouteNames.SPECIESSCREEN)
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: "center", marginLeft: 15 }}>
            <TouchableOpacity onPress={() => moveCategory()}>
                <Image
                    source={require('../assets/menu.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

export default DrawerContent;