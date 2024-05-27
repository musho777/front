import React from 'react'
import { Text } from '../../components/Themed'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './AuthScreen';
import RegistrationScreen from './RegistrationScreen';
import AuthHomeScreen from './AuthHomeScreen';
import RegistrationSecondStepScreen from './RegistrationSecondStepScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import SelectPointOfDateScreen from './SelectPointOfDateScreen';
import PasswordRecoveryScreen from './PasswordRecoveryScreen';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
    const theme = useSelector(getCurrentTheme)

    const profileText = getStringInCurrentLanguage('Профиль', 'Profile', 'Profil', 'Profil')
    const chooseText = getStringInCurrentLanguage('Выбрать', 'Choose', 'Seçmek', 'Tanlang')
    const passRecoveryText = getStringInCurrentLanguage('Восстановление пароля', 'Password recovery', 'Şifre kurtarma', 'Parolni tiklash')

    return (
        <>
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  }}>
                <Stack.Screen name="AuthHome" component={AuthHomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: true, headerShadowVisible: false, title: '' }} />
                <Stack.Screen name="Register" component={RegistrationScreen} options={{ headerShown: true, headerShadowVisible: false, title: '' }} />
                <Stack.Screen name="SecondStep" component={RegistrationSecondStepScreen} options={{ headerShown: true, headerShadowVisible: false, title: profileText, headerTitleAlign: 'center' }} />
                <Stack.Screen name="SelectPointOfDate" component={SelectPointOfDateScreen} options={{ headerShown: true, headerShadowVisible: false, title: chooseText, headerTitleAlign: 'center' }} />
                <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} options={{ headerShown: true, headerShadowVisible: false, title: passRecoveryText, headerTitleAlign: 'center' }} />
            </Stack.Navigator>
        </>
    )
}

export default AuthNavigator
