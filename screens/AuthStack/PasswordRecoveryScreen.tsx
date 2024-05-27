import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { getToken } from '../../service/asyncStorage'
import { ApiRequests } from '../../service/api/api'
import useAuth from '../../hooks/useAuth'


function PasswordRecoveryScreen({ navigation }: any) {
    const [ newPassword, setNewPassword ] = useState<string>('')
    const [ stage, setStage ] = useState<number>(1)
    const [ newPassword1, setNewPassword1 ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ code, setCode ] = useState<string>('')

    const [ error, setIsError ] = useState<boolean>(false)

    const { user } = useAuth()

    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    const newPasswordText = getStringInCurrentLanguage('Новый пароль:', 'New password:', 'Yeni Şifre:', "Yangi parol:")
    const codeText = getStringInCurrentLanguage('Введите код из email:', 'Enter code from email:', 'E-postadaki kodu girin:', "Elektron pochtadan kodni kiriting:")
    const emailText = getStringInCurrentLanguage('Введите email:', 'Enter email:', 'E-posta girin:', "Elektron pochta manzilini kiriting:")
    const repeatNewPasswordText = getStringInCurrentLanguage('Повторите новый пароль:', 'Repeat new password:', 'Yeni şifreyi tekrar girin:', "Yangi parolni takrorlang:")
    const errorText = getStringInCurrentLanguage('Заполните все поля верно!', 'Fill in all fields correctly!', 'Tüm alanları doğru bir şekilde doldurun!', "Barcha maydonlarni toʻgʻri toʻldiring!")

    const handleRecoverPassword = () => {
        ApiRequests.recoverPassword(email).then(d => setStage(2)).catch(e => setIsError(true))
    }

    const handleRecoverPassword2 = () => {
        ApiRequests.recoverPasswordSecondStep(email, code, newPassword).then(d => navigation.navigate('AuthHome')).catch(e => setIsError(true))
        
    }

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1,  }}>
            { stage === 1 
            
                ? 

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}>
                    <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{emailText}</StyledText>
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TextInput value={email} onChangeText={t => setEmail(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
                    </View>
                    { error ? <StyledText style={{ alignSelf: 'center', marginTop: 20 }}>{errorText}</StyledText> : <></> }
                    <TouchableOpacity onPress={handleRecoverPassword} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>OK</Text></TouchableOpacity>
                </View>
                :
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}>
                    <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{codeText}</StyledText>
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TextInput value={code} onChangeText={t => setCode(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
                    </View>

                    <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{newPasswordText}</StyledText>
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TextInput value={newPassword} onChangeText={t => setNewPassword(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
                    </View>

                    <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{repeatNewPasswordText}</StyledText>
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TextInput value={newPassword1} onChangeText={t => setNewPassword1(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
                    </View>
                    { error ? <StyledText style={{ alignSelf: 'center', marginTop: 20 }}>{errorText}</StyledText> : <></> }
                    <TouchableOpacity onPress={handleRecoverPassword2} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>OK</Text></TouchableOpacity>
                </View>
            }
            {/* <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{newPasswordText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <TextInput value={newPassword} onChangeText={t => setNewPassword(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View>

            <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{repeatNewPasswordText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <TextInput value={newPassword1} onChangeText={t => setNewPassword1(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View> */}


            

            {/* <TouchableOpacity onPress={handleRecoverPassword} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>OK</Text></TouchableOpacity> */}
        </View>
    )
}

export default PasswordRecoveryScreen
