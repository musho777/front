import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MatchRequestScreen from './MacthRequestScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

const Stack = createNativeStackNavigator();

function MatchRequestNavigator() {
    const matchRequestText = getStringInCurrentLanguage('Запросы соответствия', 'Match Request', 'Maç Talebi', 'Tanishuv so’rovi')

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
                <Stack.Screen name="Home" component={MatchRequestScreen} options={({navigation}) => ({ title: matchRequestText })} />
            </Stack.Navigator>
        </>
    )
}

export default MatchRequestNavigator
