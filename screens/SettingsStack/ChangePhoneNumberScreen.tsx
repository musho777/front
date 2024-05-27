import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { getToken } from '../../service/asyncStorage'
import { ApiRequests } from '../../service/api/api'
import { setName, setPhone } from '../../store/ducks/auth/actionCreators'


function ChangePhoneNumberScreen({ navigation }: any) {
    const [ newPhoneNumber, setnewPhoneNumber ] = useState<string>('')

    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    const newPhoneNumberText = getStringInCurrentLanguage('Новый номер телефона:', 'New phone number:', 'Yeni telefon numarası:', "Yangi telefon raqami:")

    const handleChangeName = () => {
        getToken().then(t => ApiRequests.updateUser(t, { phone: newPhoneNumber }).then(d => {
            dispatch(setPhone(newPhoneNumber))
            navigation.goBack()
        }).catch(e => console.error(e))).catch(e => console.error(e))
    }

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1,  }}>
            <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{newPhoneNumberText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center' }}>
                <TextInput value={newPhoneNumber} onChangeText={t => setnewPhoneNumber(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View>

            <TouchableOpacity onPress={handleChangeName} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>OK</Text></TouchableOpacity>
        </View>
    )
}

export default ChangePhoneNumberScreen
