import React, { useLayoutEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import SettingsScreen from './SettingsScreen';
import { Themes } from '../../store/ducks/theme/contracts/state';
import ColorThemeScreen from './ColorThemeScreen';
import ChangeNameScreen from './ChangeNameScreen';
import ChangeAgeScreen from './ChangeAgeScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import ChangePhoneNumberScreen from './ChangePhoneNumberScreen';
import DeleteAccountScreen from './DeleteAccountScreen';
import TechSupportScreen from '../HelpStack/TechSupportScreen';
import StyledText from '../../components/Typography/StyledText';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ChangeCityScreen from './ChangeCityScreen';
import RecentConnections from './RecentConnections';
import InboxFilter from './InboxFilter';
import MailNotificationsScreen from './MailNotificationsScreen';
import NotificationSettings from './NotificationSettings';
import ChooseTime from './ChooseTime';


const Stack = createNativeStackNavigator();

function SettingsNavigator({ navigation, route }: any) {
    const theme = useSelector(getCurrentTheme)

    const settingsText = getStringInCurrentLanguage('Настройки', 'Settings', 'Ayarlar', "Sozlamalar")
    const colorThemeText = getStringInCurrentLanguage('Тема', 'Color theme', 'Renk teması', "Rang mavzusi")
    const changeNameText = getStringInCurrentLanguage('Изменение имени', 'Change name', 'İsim değişikliği', "Ism o'zgarishi")
    const changeAgeText = getStringInCurrentLanguage('Изменение возраста', 'Change age', 'Yaş değişikliği', "Yosh o'zgarishi")
    const changePasswordText = getStringInCurrentLanguage('Изменение пароля', 'Change password', 'Sifre değiştir', "Parolni o'zgartirish")
    const changePhoneNumberText = getStringInCurrentLanguage('Изменение номера телефона', 'Change phone number', 'Telefon numaranızı değiştirme', "Telefon raqamingizni o'zgartirish")
    const accountDeletionText = getStringInCurrentLanguage('Удаление аккаунта', 'Delete account', 'Hesap silme', "Hisobni o'chirish")
    const changeCityText = getStringInCurrentLanguage('Изменение города', 'City change', 'Şehir değişikliği', "Shahar o'zgarishi")
    const recentConnectionsText = getStringInCurrentLanguage('Последние подключения', 'Recent connections', 'Son bağlantılar', "Oxirgi ulanishlar")
    const filterText = getStringInCurrentLanguage('Фильтр входящих сообщений', 'Inbox Filter', 'Gelen Kutusu Filtresi', "Kiruvchi quti filtri")
    const mailNotificationsText = getStringInCurrentLanguage('Оповещения по почте', 'Email notifications', 'E-posta uyarıları', "Elektron pochta xabarlari")
    const notificationSettingsText = getStringInCurrentLanguage('Настройка уведомлений', 'Notification settings', 'Bildirim ayarları', "Bildirishnoma sozlamalari")
    const timeText = getStringInCurrentLanguage('Время', 'Time', 'Zaman', "Vaqt")




    return (
        <>
            <Stack.Navigator screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Gilroy-Bold',
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                 
            }}>
                <Stack.Screen name="Home" component={SettingsScreen} options={({navigation}) => ({ title: settingsText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="ColorTheme" component={ColorThemeScreen} options={({navigation}) => ({ title: colorThemeText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="ChangeName" component={ChangeNameScreen} options={({navigation}) => ({ title: changeNameText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="ChangeAge" component={ChangeAgeScreen} options={({navigation}) => ({ title: changeAgeText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="ChangeCity" component={ChangeCityScreen} options={({navigation}) => ({ title: changeCityText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={({navigation}) => ({ title: changePasswordText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumberScreen} options={({navigation}) => ({ title: changePasswordText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={({navigation}) => ({ title: accountDeletionText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="RecentConnections" component={RecentConnections} options={({navigation}) => ({ title: recentConnectionsText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="InboxFilter" component={InboxFilter} options={({navigation}) => ({ title: filterText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="MailNotifications" component={MailNotificationsScreen} options={({navigation}) => ({ title: mailNotificationsText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="NotificationSettings" component={NotificationSettings} options={({navigation}) => ({ title: notificationSettingsText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="ChooseTime" component={ChooseTime} options={({navigation}) => ({ title: timeText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                
            </Stack.Navigator>
        </>
    )
}

export default SettingsNavigator
