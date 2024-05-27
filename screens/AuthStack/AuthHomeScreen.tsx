import React, { useState } from 'react'
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import StyledButton from '../../components/StyledButton';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import StyledText from '../../components/Typography/StyledText';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentLanguage } from '../../store/ducks/language/selectors';
import { Languages } from '../../store/ducks/language/contracts/state';
import { setLanguage } from '../../store/ducks/language/actionCreators';

function AuthHomeScreen(props: any) {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const dispatch = useDispatch()

    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    });

    const text = getStringInCurrentLanguage('Найди свое Идеальное совпадение Сегодня', 'Find your Perfect match Today', 'Seninkini bul Mükemmel uyum Bugün', `O'zingizni juftingizni bugun toping Mukammal moslik`)
    const authorizeText = getStringInCurrentLanguage('Авторизоваться', 'Login', `Giriş`, `Kirish`)
    const registerText = getStringInCurrentLanguage('Зарегистрироваться', 'Register', `Üye olmak`, `Ro'yxatdan o'tish`)

    const langText = getStringInCurrentLanguage('Рус', 'Eng', 'Turk', 'Uzb')

    const currentLang = useSelector(getCurrentLanguage)

    const LanguagesBox = () => {
      if (currentLang === Languages.RU) return (
        <View>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.ENG))}><StyledText style={styles.langText}>Eng</StyledText></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.TU))}><StyledText style={styles.langText}>Turk</StyledText></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.UZ))}><StyledText style={styles.langText}>Uzb</StyledText></TouchableOpacity>
        </View>
      )

      if (currentLang === Languages.ENG) return (
        <View>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.RU))}><StyledText style={styles.langText}>Рус</StyledText></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.TU))}><StyledText style={styles.langText}>Turk</StyledText></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.UZ))}><StyledText style={styles.langText}>Uzb</StyledText></TouchableOpacity>
        </View>
      )

      if (currentLang === Languages.TU) return (
        <View>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.RU))}><StyledText style={styles.langText}>Рус</StyledText></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.ENG))}><StyledText style={styles.langText}>Eng</StyledText></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.UZ))}><StyledText style={styles.langText}>Uzb</StyledText></TouchableOpacity>
        </View>
      )

      if (currentLang === Languages.UZ) return (
        <View>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.TU))}><StyledText style={styles.langText}>Turk</StyledText></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.ENG))}><StyledText style={styles.langText}>Eng</StyledText></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.RU))}><StyledText style={styles.langText}>Рус</StyledText></TouchableOpacity>
        </View>
      )

      return <></>
    }

    const handleToggleIsOpen = () => {
      if (isOpen) setIsOpen(false)
      else setIsOpen(true)
    }

    if (fontsLoaded) {
      return (
          <>
              <View style={styles.container}>
                <ImageBackground style={styles.image} source={require('../../assets/images/Background.png')}>
                      <ImageBackground style={styles.image} source={require('../../assets/images/overlay.png')}>
                          <TouchableOpacity onPress={handleToggleIsOpen} style={styles.changeLanguage}>
                            <StyledText style={styles.langText}>{langText}</StyledText>
                            { isOpen ? 
                              <View>
                                <LanguagesBox />
                              </View> : 
                              <></>
                            }
                            
                          </TouchableOpacity>
                          <StyledText style={styles.text}>{text}</StyledText>
                          <View style={styles.buttonContainer}>
                              <StyledButton onPress={() => props.navigation.push('Auth')} style={styles.button}>{authorizeText}</StyledButton>
                              <StyledButton onPress={() => props.navigation.push('Register')} textColor='black' backgroundColor='white' style={styles.button}>{registerText}</StyledButton>
                          </View>
                      </ImageBackground>
                </ImageBackground>
              </View>
          </>
      )
    } else {
      return <></>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        justifyContent: 'center',
      },
      text: {
        color: 'white',
        fontSize: 44,
        marginLeft: 18,
        marginTop: '43%',
        marginBottom: 20,
        width: 300
      },

      button: {
        marginBottom: 24
      },
      buttonContainer: {
        alignItems: 'center',
        marginTop: 39,
      },
      changeLanguage: { position: 'absolute', right: 10, top: 50, alignSelf: 'flex-end', backgroundColor: '#EF3672', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 14, marginRight: 20 },
      langText: { color: 'white', fontSize: 12 }

})

export default AuthHomeScreen
