import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import CommonStyles from '../Style/CommonStyles';
import Colors from '../Style/Colors';
import UIText from './UIText';
enum btnType {
    'default',
    'full',
}
interface IUIButtonProps {
    onPress: () => void;
    title: string;
    styles?: ViewStyle;
    type?: btnType;
}
const UIButton = (props: IUIButtonProps) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={0.8}
            style={[
                CommonStyles.padding,
                CommonStyles.center,
                styles.container,
                props.styles,
                {
                    backgroundColor: props.type
                        ? Colors.mainColor
                        : Colors.white0,
                },
            ]}>
            <UIText
                style={{color: props.type ? Colors.white0 : Colors.mainColor}}>
                {props.title}
            </UIText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.mainColor,
    },
});

export default UIButton;
