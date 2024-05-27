import React from 'react'
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import StyledText from './Typography/StyledText';

interface ChipProps {
    children?: string,
    input?: boolean,
    style?: Object,
    onPress?: Function,
    backgroundColor?: string,
    value?: string,
    onChangeText?: Function,
    fontSize?: number
}

function Chip(props: ChipProps) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    });
    
    if (fontsLoaded) {
    
        return (
            <>  
                {

                    props.input ?

                        <TouchableOpacity onPress={props.onPress} activeOpacity={1} style={props.style}>
                            <View style={{...styles.circleGradient, ...{ backgroundColor: props.backgroundColor ? props.backgroundColor : '#EF3672'}}}>
                                <TextInput value={props.value} onChangeText={props.onChangeText} autoFocus placeholderTextColor={'white'} style={{ marginLeft: 10, color: 'white' }} />
                            </View>
                        </TouchableOpacity>

                    :
                        <TouchableOpacity onPress={props.onPress} activeOpacity={1} style={props.style}>
                            <View style={{...styles.circleGradient, ...{ backgroundColor: props.backgroundColor ? props.backgroundColor : '#EF3672'}}}>
                                <StyledText style={{ ...styles.text, fontSize: props.fontSize || 12 }}>{props.children}</StyledText>
                            </View>
                        </TouchableOpacity>

                }         
            </>
        )
    } else {
        return <></>
    }
}

const styles = StyleSheet.create({
    circleGradient: {
        margin: 1,
        borderRadius: 25,
    },
    text: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 10,
        marginLeft: 10,
        paddingHorizontal: 6,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
        textAlign: "center",
        color: 'white'
    },
    disabledText: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 10,
        marginLeft: 10,
        paddingHorizontal: 6,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: "center",
        fontSize: 16,
        color: '#ACACAC',
        fontFamily: 'Poppins_600SemiBold'
    }

})

export default Chip
