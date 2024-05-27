import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { getToken } from '../../service/asyncStorage'
import { ApiRequests } from '../../service/api/api'
import { setAge, setName, setPassword } from '../../store/ducks/auth/actionCreators'
import useAuth from '../../hooks/useAuth'


function ChangePasswordScreen({ navigation }: any) {
    const [ newPassword, setNewPassword ] = useState<string>('')
    const [ newPassword1, setNewPassword1 ] = useState<string>('')
    const [ phone, setPhone ] = useState<string>('')

    const [ error, setIsError ] = useState<boolean>(false)

    const { user } = useAuth()

    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    const newPasswordText = getStringInCurrentLanguage('Новый пароль:', 'New password:', 'Yeni Şifre:', "Yangi parol:")
    const repeatNewPasswordText = getStringInCurrentLanguage('Повторите новый пароль:', 'Repeat new password:', 'Yeni şifreyi tekrar girin:', "Yangi parolni takrorlang:")
    const phoneText = getStringInCurrentLanguage('Последние 4 цифры номера телефона:', 'Last 4 digits of phone number:', 'Telefon numarasının son 4 hanesi:', "Telefon raqamining oxirgi 4 ta raqami:")
    const errorText = getStringInCurrentLanguage('Заполните все поля верно!', 'Fill in all fields correctly!', 'Tüm alanları doğru bir şekilde doldurun!', "Barcha maydonlarni toʻgʻri toʻldiring!")

    const handleChangeName = () => {

        if (newPassword !== newPassword1 || phone !== user.phone.slice(-4)) {
            setIsError(true)

            return
        }

        getToken().then(t => ApiRequests.updateUser(t, { password: newPassword }).then(d => {
            dispatch(setPassword(newPassword))
            navigation.goBack()
        }).catch(e => console.error(e))).catch(e => console.error(e))
    }

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1,  }}>
            <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{newPasswordText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <TextInput value={newPassword} onChangeText={t => setNewPassword(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View>

            <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{repeatNewPasswordText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <TextInput value={newPassword1} onChangeText={t => setNewPassword1(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View>

            <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{phoneText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center' }}>
                <TextInput value={phone} onChangeText={t => setPhone(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View>

            { error ? <StyledText style={{ alignSelf: 'center', marginTop: 20 }}>{errorText}</StyledText> : <></> }

            <TouchableOpacity onPress={handleChangeName} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>OK</Text></TouchableOpacity>
        </View>
    )
}

export default ChangePasswordScreen
