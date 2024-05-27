import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import StyledButton from '../../components/StyledButton';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import StyledText from '../../components/Typography/StyledText';
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from "expo-auth-session/providers/facebook";
import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setName, setPassword } from '../../store/ducks/auth/actionCreators';
import { getAuthPayload }  from '../../store/ducks/auth/selectors'
import { ApiRequests } from '../../service/api/api';
import axios from 'axios'
import { storeToken } from '../../service/asyncStorage';
import useAuth from '../../hooks/useAuth';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import * as AuthSession from 'expo-auth-session';
import { Themes } from '../../store/ducks/theme/contracts/state';
import Constants from 'expo-constants';

if (Constants.manifest) Constants.manifest.originalFullName = '@nyaw_tyan/cryptoswipe'

WebBrowser.maybeCompleteAuthSession()

function AuthScreen({ navigation }: any) {
    const dispatch = useDispatch()
    const { user, signIn } = useAuth()

    const [ request, response, promptAsync ] = Google.useIdTokenAuthRequest({
        clientId: '374034655119-nkk49babo5qsem109ukmt1ddg3r6l4sm.apps.googleusercontent.com',
        androidClientId: '374034655119-m785il8bkrm699a3od4778s0rl7obkqe.apps.googleusercontent.com'
    })

    let redirectUrlFB = AuthSession.getRedirectUrl();

    const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: "263277189604210",
        scopes: ['public_profile', 'email'],
        redirectUri: "https://auth.expo.io/@nyaw_tyan/cryptoswipe",
        responseType: AuthSession.ResponseType.Token,
      }, { useProxy: true });

    useEffect(() => {
        if (response?.type === "success") {
            axios.get('https://www.googleapis.com/userinfo/v2/me', { headers: { Authorization: `Bearer ${response.authentication?.accessToken}` } }).then(r => {
                dispatch(setEmail(r.data.email))
                dispatch(setName(r.data.given_name))
                navigation.push('Register')
            }).catch(e => console.error(e))
        }

        if (responseFB?.type === "success") {
            axios.get(`https://graph.facebook.com/me?access_token=${responseFB?.authentication?.accessToken}&fields=id,name,email,picture.type(large)`).then(r => {
                // dispatch(setEmail(r.data.email))
                console.log(r.data)
                dispatch(setName(r.data.name.split()[0]))
                dispatch(setEmail(r.data.email))
                navigation.push('Register')
            }).catch(e => console.error(e))
        }
    }, [response, responseFB])

    const registerVK = async () => {
        let redirectUrl = AuthSession.getRedirectUrl();
        console.log(redirectUrl)
        let result = await AuthSession.startAsync({
            authUrl: 'https://oauth.vk.com/authorize?client_id=51658385&display=mobile&redirect_uri=' +
            encodeURIComponent(redirectUrl) + '&response_type=token&v=5.131',
        });
        if (result.type === 'success') {
            axios.get('https://api.vk.com/method/users.get?v=5.131', { headers: { Authorization: `Bearer ${result.params.access_token}` } }).then(r => {
                dispatch(setName(r.data.response[0].first_name))
                navigation.push('Register')
            })
        }
    }

    const theme = useSelector(getCurrentTheme)

    const welcomeText = getStringInCurrentLanguage('Добро пожаловать', 'Welcome Back', 'Tekrar hoşgeldiniz', 'Xush kelibsiz')
    const enterToContinueText = getStringInCurrentLanguage('Войдите, чтобы продолжить', 'Sign in to continue', 'Devam etmek için oturum açın', 'Davom etish uchun tizimga kiring')
    const usernameText = getStringInCurrentLanguage('Эл. почта', 'Email', 'Email', 'Email')
    const passwordText = getStringInCurrentLanguage('Пароль', 'Password', 'Şifre', 'Parol')
    const forgotPasswordText = getStringInCurrentLanguage('Забыли пароль?', 'Forgot Password?', 'Şifreyi unut?', 'Parolni unutdingizmi?')
    const authorizeText = getStringInCurrentLanguage('Авторизоваться', 'Log in', 'Giriş', 'Kirish')
    const orText = getStringInCurrentLanguage('или', 'or', 'or', 'yoki')

    const registerWithFacebook = getStringInCurrentLanguage('Зарегистрируйтесь через Facebook', 'Sign up with Facebook', 'Facebook ile kayıt ol', 'Facebook orqali kirish')
    const registerWithVK = getStringInCurrentLanguage('Зарегистрируйтесь через VK', 'Sign up with VK', `VK'ya kaydol`, 'VK orqali kirish')
    const registerWithGoogle = getStringInCurrentLanguage('Зарегистрируйтесь через Google', 'Sign up with Google', 'Google ile giriş yap', 'Google orqali kiring')

    const termsOfUseText = getStringInCurrentLanguage('Условия использования и политика конфиденциальности', 'Terms of use & Privacy Policy', 'Kullanım & gizlilik politikası şartları', 'Foydalanish shartlari & Maxfiylik siyosati')

    const handleLogin = () => {
        ApiRequests.login({ email: user.email, password: user.password }).then(r => {
            storeToken(r.access_token)
            signIn()
        }).catch(e => console.error(e))
    }

    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    });

    if (fontsLoaded) {

        return (
            <>
                <View style={{...styles.container, ...{backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}}>
                    <View style={styles.textContainer}>
                        <StyledText style={styles.textContainerMainText}>{welcomeText}</StyledText>
                        <StyledText style={styles.textContainerSecondaryText}>{enterToContinueText}</StyledText>
                    </View>

                    <View style={styles.formContainer}>
                        <Input onChangeText={e => dispatch(setEmail(e))} value={user.email} style={styles.input} placeholder={usernameText}/>
                        <Input onChangeText={e => dispatch(setPassword(e))} value={user.password} placeholder={passwordText}/>
                        <TouchableOpacity onPress={() => navigation.push('PasswordRecovery')}>
                            <StyledText style={styles.passwordRecoveryText}>{forgotPasswordText}</StyledText>
                        </TouchableOpacity>
                        <StyledButton onPress={handleLogin}>{authorizeText}</StyledButton>
                        
                        <View style={styles.lineContainer}>
                            <View style={styles.line}></View>
                            <StyledText style={styles.lineText}>{orText}</StyledText>
                            <View style={styles.line}></View>
                        </View>
                        
                        <StyledButton onPress={() => promptAsyncFB()} backgroundColor='#3B5998' style={styles.button}>{registerWithFacebook}</StyledButton>
                        <StyledButton onPress={() => registerVK()} backgroundColor='#0077FF' style={styles.button}>{registerWithVK}</StyledButton>
                        <StyledButton onPress={() => promptAsync()} skeleton>{registerWithGoogle}</StyledButton>
                        
                    </View>

                    <TouchableOpacity style={{ width: 172, paddingBottom: 200, marginTop: 20 }}>
                        
                        <StyledText style={{ color: '#757F8C', fontSize: 11.16, textAlign: 'center' }}>{termsOfUseText}</StyledText>

                    </TouchableOpacity>
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
        flex: 1
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
        marginTop: 25,
        marginLeft: -65
    },
    textContainerMainText: {
        fontSize: 26
    },
    textContainerSecondaryText: {
        fontSize: 16,
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
        marginBottom: 25,
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
    }
    

})

export default AuthScreen
