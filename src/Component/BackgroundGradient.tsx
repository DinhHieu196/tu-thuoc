import React from 'react';
import Colors from '../Style/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {useHeaderHeight} from '@react-navigation/stack';
import CommonVariable from '../Style/Variable';
import {View, ViewStyle} from 'react-native';
import CommonStyles from '../Style/CommonStyles';
const headerHeight = useHeaderHeight;
interface IBackgroundGradientProps {
    children: any;
    style?: ViewStyle;
}
const BackgroundGradient = (props: IBackgroundGradientProps) => {
    const borderRadius = 30;
    return (
        <View style={[props.style, {flex: 1}]}>
            {props.children}
        </View>
    );
};

export default BackgroundGradient;
