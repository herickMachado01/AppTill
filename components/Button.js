import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import COLORS from '../constantes/Color';

const Button = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                backgroundColor: bgColor,
                ...props.style,
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, color: textColor, ...props.textStyle }}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingBottom: 10,
        paddingTop: 10, 
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center', 
    },
});

export default Button;
