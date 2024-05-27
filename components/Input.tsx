import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { useFonts } from 'expo-font'

interface InputProps {
    style?: Object,
    placeholder?: string,
    tall?: boolean,
    value?: string,
    centerPlaceholder?: boolean,
    onChangeText?: (t: string) => void,
    keyboardType?: string
}

function Input(props: InputProps) {
    let [fontsLoaded] = useFonts({
        'Gilroy-SemiBold': require('./../assets/fonts/Gilroy-SemiBold.ttf'),
      });
    
    if (fontsLoaded) {
      
        return (
            <>  
                <View style={props.style}>

                    <View style={props.tall ? stylesTall.container : styles.container}>
                        <TextInput onChangeText={props.onChangeText} keyboardType={props.keyboardType} value={props.value} style={props.centerPlaceholder ? { ...styles.input, ...{textAlign: 'center', marginLeft: -26, letterSpacing: 5} } : styles.input} placeholderTextColor={'#757F8C'} placeholder={props.placeholder} />
                    </View>
                </View>
            </>
        )
    } else {
        return <></>
    }
}

const styles = StyleSheet.create({
    input: {
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 26,

        fontSize: 16,
        color: '#757F8C',
        fontFamily: 'Gilroy-SemiBold'
        
    },
    container: {
        borderWidth: 1,
        borderColor: '#D6D9E4',
        borderRadius: 25,
        width: 310,
    }
})

const stylesTall = StyleSheet.create({
    input: {
        paddingTop: 9,
        paddingBottom: 5,
        paddingLeft: 26,

        fontSize: 16,
        color: '#6E6E6E',
        fontFamily: 'Poppins_600SemiBold',
    },
    container: {
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 25,
        width: 310,
        height: 80
    }
})

export default Input
