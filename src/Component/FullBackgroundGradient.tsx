import React from 'react';
import {View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonVariable from '../Style/Variable';
import Colors from '../Style/Colors';
import {useHeaderHeight} from '@react-navigation/stack';
interface IFullBackgroundGradientProps {
    children: any;
    style?: ViewStyle;
}
const headerHeight = useHeaderHeight;

const FullBackgroundGradient = (props: IFullBackgroundGradientProps) => {
    return (
        <View style={[props.style, {flex: 1, paddingTop: headerHeight()}]}>
            <LinearGradient
                style={{
                    position: 'absolute',
                    height: CommonVariable.screenHeight,
                    width: CommonVariable.screenWidth,
                    zIndex: -1,
                    elevation: -1,
                }}
                colors={[Colors.mainColor, Colors.secondColor]}
                start={{x: 0.5, y: 1.0}}
                end={{x: 0.5, y: 0.0}}
            />
            {props.children}
        </View>
    );
};

export default FullBackgroundGradient;
