import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet, View, ViewStyle} from 'react-native';
import CommonVariable from '../../Style/Variable';
import Colors from '../../Style/Colors';
import {isIphoneX} from '../../Style/CoreStyle';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
const mb_IphoneX = isIphoneX() ? 22 : 0;
const mb = CommonVariable.appPadding + mb_IphoneX;
interface IBodyProps {
    children: any;
    style?: ViewStyle;
    hasFooterButton?: boolean;
    contentContainerStyle?: ViewStyle;
}
const Body2 = (props: IBodyProps) => (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
                flex: 1
            }}>
        {props.children}
    </KeyboardAvoidingView>
);
const Body = (props: IBodyProps) => (
    <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle = {props.contentContainerStyle}
        style={[
            {
                paddingBottom: props.hasFooterButton
                    ? CommonVariable.appPadding
                    : mb,
            },
            styles.container,
            props.style,
        ]}>
        {props.children}
    </KeyboardAwareScrollView>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: CommonVariable.appPadding,
        backgroundColor: Colors.white0,
        borderRadius: 8,
    },
});

export default Body;
