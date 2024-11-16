import React from 'react';
import {FlexAlignType, StyleSheet, Text, View} from 'react-native';
import Colors from '../../Style/Colors';
import LinearGradient from 'react-native-linear-gradient';
import UIText from '../../Component/UIText';
import CommonVariable from '../../Style/Variable';
import Icon from 'react-native-vector-icons/AntDesign';
interface IUIGradientButtonProps {
    text: string;
    align?: FlexAlignType;
    hiddenIcon?: boolean;
    textCenter?: boolean;
}
const GradientButton = (props: IUIGradientButtonProps) => {
    return (
        <LinearGradient
            style={{
                flexDirection: 'row',
                padding: CommonVariable.appPadding,
                borderRadius: 8,
                alignItems: props.align,
                justifyContent: props.textCenter ? 'center' : 'flex-end',
            }}
            colors={[Colors.mainColor, Colors.secondColor]}
            start={{x: 0.0, y: 0.5}}
            end={{x: 1.0, y: 0.5}}>
            <UIText
                style={{
                    color: Colors.white0,
                    fontWeight: '300',
                    fontSize: CommonVariable.largeTextSize,
                    marginHorizontal: CommonVariable.appPadding,
                    textTransform: 'uppercase',
                }}>
                {props.text}
            </UIText>
            {props.hiddenIcon ? 
                null : 
                <Icon name={'arrowright'} size={30} color={Colors.white0} />
            }
            
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GradientButton;
