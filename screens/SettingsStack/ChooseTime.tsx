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


function ChooseTime({ navigation, route }: any) {
    const firstTime = route.params.firstTime
    const secondTime = route.params.secondTime
    const setFirstTime = route.params.setFirstTime
    const setSecondTime = route.params.setSecondTime

    const [ firstTime1, setFirstTime1 ] = useState<string>(firstTime)
    const [ secondTime1, setSecondTime1 ] = useState<string>(secondTime)

    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    const sevenText = getStringInCurrentLanguage('Начало', 'Start', 'Başlangıç', "Boshlash")
    const eightText = getStringInCurrentLanguage('Конец', 'End', 'Son', "Oxiri")


    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1,  }}>
            <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16 }}>{sevenText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center' }}>
                <TextInput value={firstTime1} onChangeText={t => setFirstTime1(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View>
            <StyledText style={{ marginLeft: '5%', marginBottom: 7, fontSize: 16, marginTop: 20 }}>{eightText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', justifyContent: 'center' }}>
                <TextInput value={secondTime1} onChangeText={t => setSecondTime1(t)} style={{ marginLeft: 10, color: theme === Themes.DARK ? '#ffffff' : 'black' }} />
            </View>

            <TouchableOpacity onPress={() => {
                setFirstTime(firstTime1)
                setSecondTime(secondTime1)
                navigation.goBack()
            }} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>OK</Text></TouchableOpacity>
        </View>
    )
}

export default ChooseTime
