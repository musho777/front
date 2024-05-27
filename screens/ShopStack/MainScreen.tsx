import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function MainScreen({ navigation }: any) {
    const theme = useSelector(getCurrentTheme)

    const giftsText = getStringInCurrentLanguage('Подарки', 'Gifts', 'Sunmak', 'Hozirgi')
    const stickersText = getStringInCurrentLanguage('Стикеры', "Stickers", 'Cıkartmalar', "Stikerlar")

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
            <View style={{ marginLeft: 25 }}>
                <TouchableOpacity onPress={() => navigation.push('GiftsScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{giftsText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push('StickersScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{stickersText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MainScreen
