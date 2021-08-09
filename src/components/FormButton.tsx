import React, { FC}from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { windowHeight , windowWidth} from '../util/Dimensions';

const FormButton = ({buttonTitle ,onPress,...rest}:{buttonTitle:string,onPress:any}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer}{...rest} onPress={onPress}>
            <Text style={styles.buttonText} >{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

export default FormButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        //fontFamily: 'Lato-Regular'
    },

})