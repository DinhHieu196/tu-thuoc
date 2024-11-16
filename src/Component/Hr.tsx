import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../Style/Colors';
interface IHrProps {}
const Hr = (props: IHrProps) => {
    return <View style={styles.container} />;
};

const styles = StyleSheet.create({
    container: {
        height: 2,
        backgroundColor: Colors.grey1,
    },
});

export default Hr;
