import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuestsScreen from './GuestsScreen';
import GiftsScreen from './GiftsScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

const Stack = createNativeStackNavigator();

function GuestsNavigator() {
    const guestsText = getStringInCurrentLanguage('Гости', 'Guests', 'Misafirler', 'Qiziquvchilar')
    const giftsText = getStringInCurrentLanguage('Подарки', 'Gifts', 'Hediyeler', 'Sovg’alar')

    const theme = useSelector(getCurrentTheme)
    
    return (
        <>
            <Stack.Navigator screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Gilroy-Bold',
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  
            }}>
                <Stack.Screen name="Home" component={GuestsScreen} options={({navigation}) => ({ title: guestsText })} />
                <Stack.Screen name="Gifts" component={GiftsScreen} options={({navigation}) => ({ title: giftsText })} />
            </Stack.Navigator>
        </>
    )
}

export default GuestsNavigator
