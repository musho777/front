import React, { useState } from 'react'
import { Text } from '../components/Themed';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { fromCSS } from "@bacons/css-to-expo-linear-gradient";
import GradientText from './Typography/GradientText';

interface StyledButtonProps {
    number: number,
    active: number,
    style?: Object
}

function Carousel(props: StyledButtonProps) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
      });
    
      if (fontsLoaded) {

          return (
              <>
                <View style={{ ...{ display: 'flex', flexDirection: 'row' }, ...props.style }}>
                    { [...Array(props.number).keys()].map(i => (
                        <View>
                            {
                                props.active == i ?
                                    <LinearGradient {...fromCSS(`linear-gradient(109.27deg, #BB9FFF 0%, #9CD9FF 102.22%);`)} style={{borderRadius: 25, marginRight: 8}}>
                                        <GradientText style={{ fontSize: 8 }}>tttr</GradientText>
                                    </LinearGradient>
                                :
                                <LinearGradient colors={['#E3E3E3', '#E3E3E3']} style={{borderRadius: 25, marginRight: 8}}>
                                    <Text style={{ fontSize: 8, color: '#E3E3E3' }}>tttr</Text>
                                </LinearGradient>

                            }
                        </View>
                    )) }
                </View>
              </>
      
          )
      }

}

export default Carousel
