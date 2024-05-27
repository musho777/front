import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import UserProfileScreen from './UserProfileScreen';
import FilterIcon from '../../assets/images/filter.svg'
import NotificationsIcon from '../../assets/images/notifications.svg'
import FilterScreen from './FilterScreen';
import useAuth from '../../hooks/useAuth';
import { ApiRequests, URL } from '../../service/api/api';
import { DrawerActions, getFocusedRouteNameFromRoute, useIsFocused } from '@react-navigation/native';
import CitiesScreen from './CitiesScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { Themes } from '../../store/ducks/theme/contracts/state';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import NotificationsScreen from './NotificationsScreen';
import { getToken } from '../../service/asyncStorage';
import SelectPointOfDateScreen from './SelectPointOfDateScreen';
import SelectLanguagesScreen from './SelectLanguagesScreen';
import StyledText from '../../components/Typography/StyledText';
import axios from 'axios';
import { setUsers } from '../../store/ducks/matching/actionCreators';
import TechSupportScreen from '../HelpStack/TechSupportScreen';
import PhotoScreen from './PhotoScreen';


const Stack = createNativeStackNavigator();

function HomeNavigator({ navigation, route }: any) {
    const [ notSeenNotifications, setNotSeenNotifications ] = useState<boolean>(false)
    const { user } = useAuth()
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Photo"){
            navigation.setOptions({tabBarStyle: {display: 'none', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }});
        }else {
            navigation.setOptions({tabBarStyle: {
                backgroundColor: theme === Themes.DARK ? '#252931' : 'white',
                borderTopWidth: 0,
                elevation: 0
              }});
            
        }
    }, [navigation, route, theme]);
    
    useEffect(() => {
        getToken().then(t => ApiRequests.getNotifications(t).then(n => {
            n.filter(i => !i.seen).length >= 1 ? setNotSeenNotifications(true) : setNotSeenNotifications(false)
        }))
    }, [isFocused])
    
    
    const chooseText = getStringInCurrentLanguage('Выбрать', 'Choose', 'Seçmek', 'Tanlang')
    const findText = getStringInCurrentLanguage('Обнаружить', 'Discover', 'Keşfetmek', 'Juft')
    const filterText = getStringInCurrentLanguage('Фильтр', 'Filter', 'Filtreler', 'Filtr')
    const chooseCityText = getStringInCurrentLanguage('Выберите город', 'Choose a city', 'Bir şehir seç', 'Shaharni tanlang')
    const notificationsText = getStringInCurrentLanguage('Уведомления', 'Notifications', 'Bildirimler', 'Bildirishnomalar')
    const resetText = getStringInCurrentLanguage('Сбросить', 'Reset', 'Sıfırla', "Qayta o'rnatish")

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Gilroy-Bold',
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                 
            }}>
                <Stack.Screen name="Home" component={HomeScreen} options={({navigation}) => ({ title: findText, headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginRight: 15, flexDirection: 'row' }} onPress={() => navigation.push('Notifications')} activeOpacity={0.8}>
                            <NotificationsIcon width={23} height={23} />
                            { notSeenNotifications && <View style={{ height: 5, width: 5, backgroundColor: '#EF3672', borderRadius: 50, marginLeft: -5 }} /> }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.push('Filter')} activeOpacity={0.8}>
                            <FilterIcon />
                        </TouchableOpacity>
                    </View>
                ), headerLeft: () => <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}><Image style={{ width: 32, height: 32, borderRadius: 50, marginLeft: 5 }} source={{uri:user.avatar ? `${URL}/auth/pictures/${user.avatar}` : 'ss'}} /></TouchableOpacity>, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: '', headerTransparent: true }} />
                <Stack.Screen name="Filter" component={FilterScreen} options={({navigation}) =>({ title: filterText, headerRight: () => <TouchableOpacity onPress={() => {
                    getToken().then(token => axios.get(`${URL}/matching`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => dispatch(setUsers(r.data))))
                    navigation.navigate('Home')
                }}><StyledText style={{ color: '#757F8C' }}>{resetText}</StyledText></TouchableOpacity>, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="Cities" component={CitiesScreen} options={{ title: chooseCityText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  }} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: notificationsText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  }} />
                <Stack.Screen name="SelectPointOfDate" component={SelectPointOfDateScreen} options={{ title: chooseText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  }} />
                <Stack.Screen name="SelectLanguages" component={SelectLanguagesScreen} options={{ title: chooseText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  }} />
                <Stack.Screen name="Photo" component={PhotoScreen} options={{ title: '', headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white'   }} />
                
            </Stack.Navigator>
        </>
    )
}

export default HomeNavigator
