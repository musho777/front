import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Themes } from '../../store/ducks/theme/contracts/state';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import ConnectVipScreen from './ConnectVipScreen';
import BuyVipScreen from './BuyVipScreen';


const Stack = createNativeStackNavigator();

function VipNavigator() {
    const theme = useSelector(getCurrentTheme)

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Gilroy-Bold',
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                 
            }}>
                <Stack.Screen name="Home" component={ConnectVipScreen} options={({navigation}) => ({ title: 'VIP', headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="BuyVip" component={BuyVipScreen} options={({navigation}) => ({ title: 'VIP', headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
            </Stack.Navigator>
        </>
    )
}

export default VipNavigator
