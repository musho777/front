import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { getToken } from '../../service/asyncStorage'
import { ApiRequests } from '../../service/api/api'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CoinIcon from './../../assets/images/coin.svg'
import useAuth from '../../hooks/useAuth'
import * as WebBrowser from 'expo-web-browser';



function BalanceScreen({ navigation }: any) {
    const [ amount, setAmount ] = useState<number>(0)

    const { user } = useAuth()

    const theme = useSelector(getCurrentTheme)

    const addText = getStringInCurrentLanguage('Пополнить', 'Top up', 'Dolgu', 'To’ldirish')
    const amountText = getStringInCurrentLanguage('Количество монет:', 'Amount of coins:', 'Madeni para sayısı:', "Tangalar soni:")

    const handleBuyCoins = () => {
        ApiRequests.buyCoins({ amount: parseInt(amount), userId: user.id}).then(r => {
            console.log(r.confirmation.confirmation_url)
            navigation.navigate('TabOne')
            let result = WebBrowser.openBrowserAsync(r.confirmation.confirmation_url);
        })
    }

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
            <View style={{ marginLeft: '8%', justifyContent: 'space-between', flexDirection: 'row' }}>
                <StyledText>{amountText}</StyledText>

                <View style={{ flexDirection: 'row', marginRight: '8%' }}>
                    <StyledText style={{ marginRight: 1}}>{amount}</StyledText>
                    <CoinIcon style={{ marginTop: 3, marginRight: 3 }} />
                    <StyledText>{`= ${amount}₽ `}</StyledText>
                </View>
            </View>

            <View style={{ marginLeft: '8%'}}>
                <MultiSlider containerStyle={{ marginLeft: 8 }} min={0} max={1001} onValuesChange={v => setAmount(v)} unselectedStyle={{ backgroundColor: '#D6D9E4' }} selectedStyle={{ backgroundColor: '#EF3672' }} markerStyle={{ backgroundColor: 'white', width: 16, height: 16, borderColor: '#EF3672', borderWidth: 2.5 }} />
            </View>

            <TouchableOpacity onPress={handleBuyCoins} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>{addText}</Text></TouchableOpacity>
        </View>
    )
}

export default BalanceScreen
