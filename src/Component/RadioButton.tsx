import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import UIText from './UIText';
import Colors from '../Style/Colors';
interface IRadioButtonProps {
    PROP: any;
    Im?: any;
}
const RadioButton = (props: IRadioButtonProps) => {
    const [value, setValue] = useState<string | null>(null);
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center"}}>
            {props.Im ? <Text style={{color: "white", fontSize: 14}}>I am a: </Text> : null}
            
            {props.PROP.map((res) => {
                return (
                    <View key={res.key} style={styles.container}>
                        <TouchableOpacity
                            style={[styles.radioCircle, {borderColor: props.Im ? "white" : Colors.mainColor}]}
                            onPress={() => {
                                setValue(res.key);
                            }}>
                            {value === res.key && (
                                <View style={[styles.selectedRb, {backgroundColor: props.Im ? "white" : Colors.mainColor}]} />
                            )}
                        </TouchableOpacity>
                        <UIText style={[styles.radioText, {color: props.Im ? "white" : "black"}]}>{res.text}</UIText>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    radioText: {
        marginLeft: 5,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 50,
    }
});

export default RadioButton;
