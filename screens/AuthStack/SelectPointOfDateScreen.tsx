import React, { useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { getToken } from '../../service/asyncStorage'
import { ApiRequests } from '../../service/api/api'
import { setName, setPointOfDate } from '../../store/ducks/auth/actionCreators'
import useAuth from '../../hooks/useAuth'
import Chip from '../../components/Chip'


function SelectPointOfDateScreen({ navigation }: any) {
    const { user } = useAuth()

    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    const pointOfDateArray: (string | undefined)[] = [
        getStringInCurrentLanguage('Дружба и общение', 'Friendship and communication', "Arkadaşlık ve iletişim", "Do'stlik va muloqot"),
        getStringInCurrentLanguage('Переписка', 'Correspondence', "Yazışma", "Xat yozish"),
        getStringInCurrentLanguage('Отношения', 'Relationship', "İlişki", "Aloqa"),
        getStringInCurrentLanguage('Создание семьи', 'Starting a family', "aile kurmak", "Oila qurish"),
        getStringInCurrentLanguage('Дети', 'Children', "Çocuklar", "Bolalar"),
        getStringInCurrentLanguage('Флирт', 'Flirt', "Flört", "Noz-karashma"),
        getStringInCurrentLanguage('Занятия спортом', 'Sports', "Spor Dalları", "Sport"),
        getStringInCurrentLanguage('Совместные путешествия', 'Joint travel', "Ortak seyahat", "Birgalikda sayohat"),
        getStringInCurrentLanguage('Совместная аренда жилья', 'Shared housing', "Paylaşılan konut", "Umumiy uy-joy"),
        getStringInCurrentLanguage('Одноразовые встречи', 'One-time appointments', "Tek seferlik randevular", "Bir martalik uchrashuvlar"),
    ]

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
            <View style={{ marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                {
                    pointOfDateArray.filter(i => !user.pointOfDate.includes(i)).map(p => <Chip onPress={() => {
                        dispatch(setPointOfDate([ ...user.pointOfDate, p ]))
                        navigation.goBack()
                    }} fontSize={17} style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip> )
                }
            </View>
        </View>
    )
}

export default SelectPointOfDateScreen
