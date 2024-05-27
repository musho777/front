import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { getToken } from '../../service/asyncStorage'
import { ApiRequests } from '../../service/api/api'
import { setAge, setName } from '../../store/ducks/auth/actionCreators'


function ChangeAgeScreen({ navigation }: any) {
    const [ newAge, setNewAge ] = useState<string>('')

    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    const newAgeText = getStringInCurrentLanguage('Новый возраст:', 'New age:', 'Yeni yaş:', "Yangi asr:")

    const handleChangeName = () => {
        getToken().then(t => ApiRequests.updateUser(t, { age: parseInt(newAge) }).then(d => {
            dispatch(setAge(parseInt(newAge)))
            navigation.goBack()
        }).catch(e => console.error(e))).catch(e => console.error(e))
    }

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1,  }}>
            <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{newAgeText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center' }}>
                <TextInput value={newAge} onChangeText={t => setNewAge(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View>

            <TouchableOpacity onPress={handleChangeName} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>OK</Text></TouchableOpacity>
        </View>
    )
}

export default ChangeAgeScreen
