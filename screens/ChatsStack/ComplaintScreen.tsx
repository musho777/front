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


function ComplaintScreen({ navigation, route }: any) {
    const [ reason, setReason ] = useState<string>('')

    const messageId = route.params.messageId
    const theme = useSelector(getCurrentTheme)

    const reasonText = getStringInCurrentLanguage('Причина жалобы:', 'Reason for complaint:', 'Şikayet nedeni:', "Shikoyat sababi:")

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1,  }}>
            <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{reasonText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <TextInput value={reason} onChangeText={t => setReason(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View>

            <TouchableOpacity onPress={() =>{
                getToken().then(t => {
                    ApiRequests.createComplaint(t, messageId, reason || '-').then(d => navigation.goBack())
                })
            }} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>OK</Text></TouchableOpacity>
        </View>
    )
}

export default ComplaintScreen
