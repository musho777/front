import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import AuthNavigator from '../screens/AuthStack/AuthNavigator';
import HomeIcon from './../assets/images/home.svg'
import HomeIconFocused from './../assets/images/homeFocused.svg'
import ChatIcon from './../assets/images/chat.svg'
import ChatIconFocused from './../assets/images/chatFocused.svg'
import ProfileIcon from './../assets/images/profile.svg'
import ProfileIconFocused from './../assets/images/profileFocused.svg'
import HeartIcon from './../assets/images/heartIcon.svg'
import { useFonts } from 'expo-font'
import { View } from 'react-native';
import HeartIconFocused from './../assets/images/heartIconFocused.svg'
import PlusIcon from './../assets/images/plus.svg'
import { RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProfileNavigator from '../screens/ProfileStack/ProfileStack';
import useAuth from '../hooks/useAuth';
import HomeNavigator from '../screens/HomeStack/HomeNavigator';
import LikeNavigator from '../screens/LikeStack/LikeNavigator';
import MatchRequestNavigator from '../screens/MatchRequestStack/MatchRequestNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import FriendsNavigator from '../screens/FriendsStack/FriendsNavigator';
import GuestsNavigator from '../screens/GuestsStack/GuestsNavigator';
import ChatsNavigator from '../screens/ChatsStack/ChatsNavigator';
import { useState } from 'react';
import SocketIOClient from 'socket.io-client';
import IncomingCallScreen from '../screens/ChatsStack/IncomingCallScreen';
import { ApiRequests, CallURL, SocketURL } from '../service/api/api';
import { getToken } from '../service/asyncStorage';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../store/ducks/theme/selectors';
import { Themes } from '../store/ducks/theme/contracts/state';
import HelpNavigator from '../screens/HelpStack/HelpNavigator';
import VipNavigator from '../screens/VipStack/VipNavigator';
import SettingsNavigator from '../screens/SettingsStack/SettingsNavigator';
import BalanceNavigator from '../screens/BalanceStack/BalanceNavigator';
import ShopNavigator from '../screens/ShopStack/ShopNavigator';

const Drawer = createDrawerNavigator();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [isBeingCalled, setIsBeingCalled] = useState<boolean>(false)
  const [callData, setCallData] = useState()
  const [caller, setCaller] = useState()
  const [callType, setCallType] = useState('')
  const { isAuthorized } = useAuth()
  const { user } = useAuth()

  if (isAuthorized) {
    const socket = SocketIOClient(CallURL, {
      transports: ['websocket'],
      query: {
        callerId: user.id,
      },
    });

    socket.on('newCall', data => {
      setCallType(data.callType)
      getToken().then(t => ApiRequests.getUser(t, data.callerId).then(u => {
        setCaller(u)
        setCallData(data)
        setIsBeingCalled(true)
      }).catch(e => console.error(e))).catch(e => console.error(e))
    });

  }


  const handleHangupIncomingCall = () => {
    setIsBeingCalled(false)
  }


  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isAuthorized ?
        isBeingCalled ? <IncomingCallScreen callType={callType} caller={caller} hangup={handleHangupIncomingCall} callData={callData} /> :
          <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Home" component={RootNavigator} />
          </Drawer.Navigator>
        : <AuthNavigator />
      }
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false)
  const { user } = useAuth()
  const isFocused = useIsFocused()

  getToken().then(t => ApiRequests.chats(t).then(c => {
    if (c.some(el => el.messages.some(message => !message.seen))) {
      setIsNewMessage(true)
      console.log('not seen')
    } else {
      setIsNewMessage(false)
      console.log('seen')
    }
  }))

  React.useEffect(() => {
    console.log('penis')
    const socket = SocketIOClient(SocketURL)

    socket.on('recMessage', m => {
      getToken().then(t => ApiRequests.chats(t).then(c => {
        if (c.some(el => el.messages.some(message => !message.seen))) {
          setIsNewMessage(true)
        }
      }))
    })

    getToken().then(t => ApiRequests.chats(t).then(c => {
      if (c.some(el => el.messages.some(message => !message.seen))) {
        setIsNewMessage(true)
        console.log('not seen')
      }
    }))
  }, [])

  const theme = useSelector(getCurrentTheme)

  let [fontsLoaded] = useFonts({
    'Gilroy-Bold': require('./../assets/fonts/Gilroy-Bold.ttf'),
  });


  if (fontsLoaded) {

    return (
      <BottomTab.Navigator
        initialRouteName="TabOne"
        screenOptions={{
          tabBarShowLabel: false,
          headerTitleStyle: {
            fontFamily: 'Gilroy-Bold',
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: theme === Themes.DARK ? '#252931' : 'white',
            borderTopWidth: 0,
            elevation: 0
          }

        }}>
        <BottomTab.Screen
          name="TabOne"
          component={HomeNavigator}
          options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
            tabBarIcon: ({ focused }) => focused ? <HomeIconFocused /> : <HomeIcon />,
            headerShown: false
          })}
        />

        <BottomTab.Screen
          name="TabThree"
          component={MatchRequestNavigator}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => focused ? <HeartIconFocused /> : <HeartIcon />,
            headerShown: false
          })}

        />

        <BottomTab.Screen
          name="TabTwo"
          component={LikeNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => <View style={{
              backgroundColor: '#FA2E69', padding: 17, borderRadius: 50, marginBottom: 40, shadowColor: "#fa2e69",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.21,
              shadowRadius: 6.65,
              elevation: 9
            }}><PlusIcon width={22} height={22} /></View>
          })}
        />


        <BottomTab.Screen
          name="TabFour"
          component={ChatsNavigator}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => focused ? isNewMessage ?
              <View style={{ marginBottom: 4 }}>
                <View style={{ backgroundColor: '#EF3672', width: 10, height: 10, marginBottom: -4, zIndex: 300, marginLeft: 14, borderRadius: 50 }} />
                <ChatIconFocused />
              </View> : <ChatIconFocused /> :
              isNewMessage ?
                <View style={{ marginBottom: 4 }}>
                  <View style={{ backgroundColor: '#EF3672', width: 10, height: 10, marginBottom: -4, zIndex: 300, marginLeft: 14, borderRadius: 50 }} />
                  <ChatIcon />
                </View> : <ChatIcon />,
            headerShown: false
          })}
        />

        <BottomTab.Screen
          name="TabFive"
          component={ProfileNavigator}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => focused ? <ProfileIconFocused /> : <ProfileIcon />,
            title: 'Профиль',
            headerShown: false,

          })}
        />

        <BottomTab.Screen
          name="TabSix"
          component={FriendsNavigator}
          options={({ navigation }) => ({
            tabBarItemStyle: { display: 'none' },
            headerShown: false
          })}
        />

        <BottomTab.Screen
          name="TabSeven"
          component={GuestsNavigator}
          options={({ navigation }) => ({
            tabBarItemStyle: { display: 'none' },
            headerShown: false
          })}
        />

        <BottomTab.Screen
          name="TabEight"
          component={HelpNavigator}
          options={({ navigation }) => ({
            tabBarItemStyle: { display: 'none' },
            headerShown: false
          })}
        />

        <BottomTab.Screen
          name="TabNine"
          component={VipNavigator}
          options={({ navigation }) => ({
            tabBarItemStyle: { display: 'none' },
            headerShown: false
          })}
        />

        <BottomTab.Screen
          name="TabTen"
          component={SettingsNavigator}
          options={({ navigation }) => ({
            tabBarItemStyle: { display: 'none' },
            headerShown: false
          })}
        />

        <BottomTab.Screen
          name="TabEleven"
          component={BalanceNavigator}
          options={({ navigation }) => ({
            tabBarItemStyle: { display: 'none' },
            headerShown: false
          })}
        />

        <BottomTab.Screen
          name="TabTwelve"
          component={ShopNavigator}
          options={({ navigation }) => ({
            tabBarItemStyle: { display: 'none' },
            headerShown: false
          })}
        />

      </BottomTab.Navigator>
    );
  }

}
