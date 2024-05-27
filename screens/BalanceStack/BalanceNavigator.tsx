import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import BalanceScreen from './BalanceScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';


const Stack = createNativeStackNavigator();

function BalanceNavigator() {
    const theme = useSelector(getCurrentTheme)

    const topUpText = getStringInCurrentLanguage('Пополнить баланс', 'Top up balance', 'Bakiye yükleme', "Balansni to'ldirish")

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Gilroy-Bold',
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                 
            }}>
                <Stack.Screen name="Home" component={BalanceScreen} options={({navigation}) => ({ title: topUpText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
            
            </Stack.Navigator>
        </>
    )
}

export default BalanceNavigator
