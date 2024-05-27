import React from 'react'
import { StyleSheet, View } from 'react-native';
import StyledButton from '../../components/StyledButton';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import StyledText from '../../components/Typography/StyledText';
import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthPayload }  from '../../store/ducks/auth/selectors'
import { setName, setPassword, setEmail } from '../../store/ducks/auth/actionCreators';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

function RegistrationScreen(props: any) {
    const theme = useSelector(getCurrentTheme)
    const dispatch = useDispatch()
    const name = useSelector(getAuthPayload).fullName
    const email = useSelector(getAuthPayload).email
    const password = useSelector(getAuthPayload).password

    const createAccountText = getStringInCurrentLanguage('Создать аккаунт', 'Create an account', 'Hesap oluştur', 'Hisob ochish')
    const createAccountToContinueText = getStringInCurrentLanguage('Создайте учетную запись, чтобы продолжить', 'Create account to continue', 'Devam etmek için bir hesap oluşturun', 'Davom etish uchun hisob yarating')

    const emailText = getStringInCurrentLanguage('Эл. почта', 'Email', 'Email', 'Email')
    const usernameText = getStringInCurrentLanguage('Имя пользователя', 'Username', 'Kullanıcı adı', 'Foydalanuvchi nomi')
    const passwordText = getStringInCurrentLanguage('Пароль', 'Password', 'Şifre', 'Parol')
    const confirmPasswordText = getStringInCurrentLanguage('Повторно введите пароль', 'Confirm Password', 'Şifreyi yeniden gir', 'Parolni tasdiqlalang')

    const registerText = getStringInCurrentLanguage('Зарегистрироваться', 'Sign up', 'Üye olmak', `Ro'yxatdan o'tish`)
    const termsOfUse1Text = getStringInCurrentLanguage('Регистрируясь, Вы соглашаетесь с нашими', 'by Sign up you are agree with our terms', 'Kaydolarak bizimle aynı fikirdesiniz', `Ro'yxatdan o'tish orqali siz`)
    const termsOfUse2Text = getStringInCurrentLanguage('условиями использования', 'terms & conditions of use', 'kullanım şartları & koşulları', `foydalanish shartlari & shartlari rozi bolasiz`)

    const alreadyHaveAnAccount1Text = getStringInCurrentLanguage('Уже есть аккаунт?', 'Already have account?', 'Zaten hesabınız var mı?', 'Hisobingiz bormi?')
    const alreadyHaveAnAccount2Text = getStringInCurrentLanguage('Войдите', 'Sign in', 'Giriş yapmak', 'Kirish')

    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    });

    if (fontsLoaded) {
        return (
            <>
                <View style={{...styles.container, ...{backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}}>
                    <View style={styles.textContainer}>
                        <StyledText style={styles.textContainerMainText}>{createAccountText}</StyledText>
                        <StyledText style={styles.textContainerSecondaryText}>{createAccountToContinueText}</StyledText>
                    </View>

                    <View style={styles.formContainer}>
                        <Input onChangeText={t => dispatch(setName(t))} value={name} style={styles.input} placeholder={usernameText}/>
                        <Input onChangeText={t => dispatch(setEmail(t))} value={email} style={styles.input} placeholder={emailText}/>
                        <Input onChangeText={t => dispatch(setPassword(t))} value={password} style={styles.input} placeholder={passwordText}/>
                        <Input placeholder={confirmPasswordText}/>
                        <StyledButton onPress={() => props.navigation.push('SecondStep')} style={{ marginTop: 34 }}>{registerText}</StyledButton>
                    </View>

                    <View style={{ width: 330, marginTop: 24 }}> 
                            <StyledText style={styles.termsOfUseText}>{termsOfUse1Text}</StyledText><StyledText style={styles.termsOfUseTextColored}>{termsOfUse2Text}</StyledText>
                    </View>

                    <View style={styles.loginContainer}> 
                            <StyledText style={styles.termsOfUseText}>{alreadyHaveAnAccount1Text}</StyledText><StyledText style={styles.termsOfUseTextColored}>{alreadyHaveAnAccount2Text}</StyledText>
                    </View>
                </View>
            </>
        )
    } else {
        return <></>
    }
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        textAlign: "center",
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold'
    },

    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    button: {
        marginBottom: 15
    },

    formContainer: {
        marginTop: 40,
    },

    header: {
        marginTop: 60
    },
    headerText: {
        fontSize: 18
    },

    textContainer: {
        marginTop: 35,
        marginLeft: -20
    },
    textContainerMainText: {
        fontSize: 26
    },
    textContainerSecondaryText: {
        fontSize: 13,
        color: '#757F8C',
        marginTop: 7
    },
    input: {
        marginBottom: 24
    },
    passwordRecoveryText: {
        fontSize: 16,
        color: '#757F8C',
        marginTop: 18,
        marginBottom: 34,
        marginLeft: 10
    },
    lineText: {
        textAlign: 'center',
        color: '#757F8C',
        fontSize: 18,
        marginTop: 30,
        marginBottom: 15,
    },
    line: {
        borderWidth: 1,
        borderColor: '#D6D9E4',
        width: 138,
        height: 0,
        marginTop: 43
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    termsOfUseText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#757F8C'
    },
    termsOfUseTextColored: {
        fontSize: 13,
        textAlign: 'center',
        color: '#EF3672'
    },
    loginContainer: { width: 330, marginTop: 24, display: 'flex', flexDirection: 'row', marginLeft: '45%', paddingBottom: 200 }

})

export default RegistrationScreen
