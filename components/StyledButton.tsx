import React from 'react'
import { Text } from '../components/Themed';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font'

interface StyledButtonProps {
    children?: string,
    disabled?: boolean,
    skeleton?: boolean,
    style?: Object,
    onPress?: any,
    backgroundColor?: string,
    textColor?: string
}

function StyledButton(props: StyledButtonProps) {
    let [fontsLoaded] = useFonts({
        'Gilroy-SemiBold': require('./../assets/fonts/Gilroy-SemiBold.ttf'),
      });
    
      if (fontsLoaded) {

          return (
              <>
                {props.disabled ? 

                    <>
                        <TouchableOpacity onPress={props.onPress} style={props.style} activeOpacity={0.8}>                        
                            <View style={styles.container}>
                                <Text style={styles.text}>{props.children?.toUpperCase() || ''}</Text>
                            </View>
                        </TouchableOpacity>

                    </>

                    :

                    props.skeleton ? 

                    <TouchableOpacity onPress={props.onPress} style={props.style} activeOpacity={0.8}>
                            <View style={{...styles.container, ...{ borderColor: '#D6D9E4', borderWidth: 1.5, borderRadius: 25 }}}>
                                <Text style={styles.disabledText}>{props.children || ''}</Text>
                            </View>
                    </TouchableOpacity>

                    :

                    <>
                        <TouchableOpacity onPress={props.onPress} style={props.style} activeOpacity={0.8}>
                            <View style={{...styles.container, ...{backgroundColor: props.backgroundColor ? props.backgroundColor : '#EF3672'}}}>
                                <Text style={{...styles.text, ...{color: props.textColor ? props.textColor : 'white'}}}>{props.children || ''}</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                }
              </>
      
          )
      } else {
        return <></>
      }

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        width: 310,

    },

    circleGradient: {
        margin: 1,
        backgroundColor: "#EF3672",
        borderRadius: 30,
    },
    text: {
        paddingTop: 14,
        paddingBottom: 14,

        fontSize: 16,
        color: 'white',
        fontFamily: 'Gilroy-SemiBold',
        alignItems: 'center',
        textAlign: 'center',
    },
    disabledText: {
        paddingTop: 14,
        paddingBottom: 14,

        fontSize: 16,
        color: '#757F8C',
        fontFamily: 'Gilroy-SemiBold',
        alignItems: 'center',
        textAlign: 'center',
    }
})

export default StyledButton
