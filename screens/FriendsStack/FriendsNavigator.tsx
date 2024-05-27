import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsScreen from './FriendsScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

const Stack = createNativeStackNavigator();

function FriendsNavigator() {
    const friendsText = getStringInCurrentLanguage('Друзья', 'Friends', 'Arkadaşlar', 'Do’stlar')
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
                <Stack.Screen name="SympathiesHome" component={FriendsScreen} options={({navigation}) => ({ title: friendsText })} />
            </Stack.Navigator>
        </>
    )
}

export default FriendsNavigator
