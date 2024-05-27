import React, { useLayoutEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import ChangeProfileScreen from './ChangeProfileScreen';
import { TouchableOpacity, View } from 'react-native';
import StyledText from '../../components/Typography/StyledText';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import SelectPointOfDateScreen from './SelectPointOfDateScreen';
import SelectLanguagesScreen from './SelectLanguagesScreen';
import PhotosScreen from './PhotosScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function ProfileNavigator({ navigation, route }: any) {
      const profileText = getStringInCurrentLanguage('Профиль', 'Profile', 'Profil', 'Profil')
      const changeProfileText = getStringInCurrentLanguage('Изменить профиль', 'Change profile', 'Profili değiştir', `Profilni o'zgartirish`)
      const changeText = getStringInCurrentLanguage('Изменить', 'Change', 'Değiştirmek', `O'zgartirish`)
      const chooseText = getStringInCurrentLanguage('Выбрать', 'Choose', 'Seçmek', 'Tanlang')
      const theme = useSelector(getCurrentTheme)

      useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Photos"){
            navigation.setOptions({tabBarStyle: {display: 'none', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }});
        }else {
            navigation.setOptions({tabBarStyle: {
                backgroundColor: theme === Themes.DARK ? '#252931' : 'white',
                borderTopWidth: 0,
                elevation: 0
              }});
            
        }
    }, [navigation, route, theme]);


      return (
          <>
              <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  }}>
                  <Stack.Screen name="Profile" component={ProfileScreen} options={({navigation} : any) => ({
                      headerRight: () => (
                          <TouchableOpacity onPress={() => navigation.push('ChangeProfile')}><StyledText style={{ color: '#757F8C', marginRight: 30, fontSize: 16 }}>{changeText}</StyledText></TouchableOpacity>
                        ),
                        title: profileText,
                        headerTitleStyle: {
                          fontFamily: 'Gilroy-SemiBold',
                        },
                        headerTitleAlign: 'center',
                        headerShadowVisible: false
                        
                  })} />
                  <Stack.Screen name="ChangeProfile" component={ChangeProfileScreen} options={({navigation} : any) => ({
                        title: changeProfileText,
                        headerTitleStyle: {
                          fontFamily: 'Gilroy-SemiBold',
                        },
                        headerTitleAlign: 'center',
                        headerShadowVisible: false
                        
                  })} />
                  <Stack.Screen name="SelectPointOfDate" component={SelectPointOfDateScreen} options={({navigation} : any) => ({
                        title: chooseText,
                        headerTitleStyle: {
                          fontFamily: 'Gilroy-SemiBold',
                        },
                        headerTitleAlign: 'center',
                        headerShadowVisible: false
                        
                  })} />
                  <Stack.Screen name="SelectLanguages" component={SelectLanguagesScreen} options={({navigation} : any) => ({
                        title: chooseText,
                        headerTitleStyle: {
                          fontFamily: 'Gilroy-SemiBold',
                        },
                        headerTitleAlign: 'center',
                        headerShadowVisible: false
                        
                  })} />
                  <Stack.Screen name="Photos" component={PhotosScreen} options={({navigation, route} : any) => ({ title: '', headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white', headerTransparent: true })} />
              </Stack.Navigator>
          </>
      )
}

export default ProfileNavigator
