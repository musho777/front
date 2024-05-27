import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { setTheme } from '../../store/ducks/theme/actionCreators'
import SwitchEnabled from '../../components/SwitchEnabled'
import SwitchDisabled from '../../components/SwitchDisabled'


function ColorThemeScreen({ navigation }: any) {
    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    const lightText = getStringInCurrentLanguage('Светлая', 'Light', 'DıIşık', "Nur")
    const darkText = getStringInCurrentLanguage('Темная', 'Dark', 'Karanlık', "Qorong'i")

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
            <View>
                <TouchableOpacity onPress={() => dispatch(setTheme(Themes.LIGHT))} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{lightText}</StyledText>
                    <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <SwitchDisabled /> : <SwitchEnabled /> }
                    </View>
                </TouchableOpacity>  

                <TouchableOpacity onPress={() => dispatch(setTheme(Themes.DARK))} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{darkText}</StyledText>
                    <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <SwitchEnabled /> : <SwitchDisabled /> }
                    </View>
                </TouchableOpacity>  
            </View>
        </View>
    )
}

export default ColorThemeScreen
