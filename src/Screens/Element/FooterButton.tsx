import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CommonVariable from '../../Style/Variable';
import UIText from '../../Component/UIText';
import {isIphoneX} from '../../Style/CoreStyle';
import Colors from '../../Style/Colors';
import CommonStyles from '../../Style/CommonStyles';
const mb_IphoneX = isIphoneX() ? 22 : 0;
const mb = CommonVariable.appPadding + mb_IphoneX;
interface IFooterButtonProps {
    onPress?: () => void;
    color?: string;
    textColor?: string;
    children?: any;
}
const FooterButton = (props: IFooterButtonProps) => {
    const {onPress, color, textColor} = props;
    return (
        <View style={[styles.container]}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                {props.children ? (
                    props.children
                ) : (
                    <View
                        style={[
                            styles.btn,
                            CommonStyles.jc_c,
                            CommonStyles.ai_c,
                            {backgroundColor: color ? color : Colors.mainColor},
                        ]}>
                        <UIText
                            style={[
                                styles.text,
                                {color: textColor ? textColor : Colors.white0},
                            ]}>
                            Order Now
                        </UIText>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CommonVariable.screenWidth,
        backgroundColor: Colors.white0,
        bottom: 0,
        paddingBottom: mb,
        padding: CommonVariable.appPadding,
    },
    text: {
        textTransform: 'uppercase',
    },
    btn: {
        padding: CommonVariable.appPadding,
        borderRadius: 8,
    },
});

export default FooterButton;
