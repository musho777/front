import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font'
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

interface StyledTextProps {
    children?: string,
    style?: Object
}

function StyledText(props: StyledTextProps) {
    const theme = useSelector(getCurrentTheme)
    let [fontsLoaded] = useFonts({
        'Gilroy-SemiBold': require('./../../assets/fonts/Gilroy-SemiBold.ttf'),
      });
    
      if (fontsLoaded) {

          return (
              <>
                <Text style={{ ...{color: theme === Themes.DARK ? 'white' : 'black'}, ...styles.text, ...props.style }}>{props.children || ''}</Text>
              </>
      
          )
      } else {
        return <></>
      }

}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Gilroy-SemiBold',
    }   
})

export default StyledText
