import React, { useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import Chip from '../../components/Chip'
import useAuth from '../../hooks/useAuth'
import { setLanguages } from '../../store/ducks/auth/actionCreators'


function SelectLanguagesScreen({ navigation, route }: any) {
    const dispatch = useDispatch()
    const { user } = useAuth()
    
    const theme = useSelector(getCurrentTheme)

    const languagesArray: (string | undefined)[] = [
        'Русский',
        'English',
        'Italiano',
        'Español',
        'Le français',
        'Deutsch',
        '中文',
        '日本語',
        'Türk',
        'Оʻzbek',
        'Казақша',
        'Türkmen',
        'Кыргыз',
        'اَلْعَرَبِيَّةُ',
        'Suomi',
        'עִבְרִית',
        'Kiswahili',
        'Polszczyzna',
        'Čeština'
    ]

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
            <View style={{ marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                {
                    languagesArray.filter(i => !user.languages.includes(i)).map(p => <Chip onPress={() => {
                        dispatch(setLanguages([ ...user.languages, p ]))
                        navigation.goBack()
                    }} fontSize={17} style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip> )
                }
            </View>
        </View>
    )
}

export default SelectLanguagesScreen
