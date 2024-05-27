import React, { useLayoutEffect, useEffect, useState } from 'react'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsScreen from './ChatsScreen';
import ChatScreen from './ChatScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import CallScreen from './Call';
import { getToken } from '../../service/asyncStorage';
import { ApiRequests, URL } from '../../service/api/api';
import { View, Image, TouchableOpacity } from 'react-native';
import StyledText from '../../components/Typography/StyledText';
import VideoIcon from '../../assets/images/video.svg'
import VideoWhiteIcon from '../../assets/images/video_white.svg'
import CallBlackIcon from '../../assets/images/call.svg'
import CallWhiteIcon from '../../assets/images/callwhite.svg'
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import VipWhite from '../../assets/images/vipwhite.svg'
import VipBlack from '../../assets/images/vipblack.svg'
import ComplaintScreen from './ComplaintScreen';

const Stack = createNativeStackNavigator();

function ChatsNavigator({ navigation, route }: any) {
    const [ currentUserName, setCurrentUserName ] = useState<string>('')
    const [ currentUserAvatar, setCurrentUserAvatar] = useState<string>('')
    const [ currentUserId, setCurrentUserId] = useState()
    
    const theme = useSelector(getCurrentTheme)
    
    const Icon = theme === Themes.DARK ? <VipWhite height={12} width={12} /> : <VipBlack height={12} width={12} />

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Chat" || routeName === "Call"){
            navigation.setOptions({tabBarStyle: {display: 'none', backgroundColor: theme === Themes.DARK ? '#252931' : 'white',}});
        }else {
            navigation.setOptions({tabBarStyle: {
                backgroundColor: theme === Themes.DARK ? '#252931' : 'white',
                borderTopWidth: 0,
                elevation: 0
              }});
            
        }
    }, [navigation, route, theme]);

    const getCurrentUser = async (id: number) => {
        const token = await getToken()
        const user = await ApiRequests.getUser(token, id)
        setCurrentUserName(user.fullName)
        setCurrentUserAvatar(user.avatar)
        setCurrentUserId(user.id)
    }

    const messagesText = getStringInCurrentLanguage('Сообщения', 'Messages', 'İleti', 'Xabarlar')
    const complaintText = getStringInCurrentLanguage('Жалоба', 'Complaint', 'Şikayet', 'Shikoyat')

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
                <Stack.Screen name="Chats" component={ChatsScreen} options={({navigation}) => ({ title: messagesText })} />
                <Stack.Screen name="Chat" component={ChatScreen} options={({navigation, route}) => {
                    getCurrentUser(route.params.receiverId)
                    return {headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('TabOne', { screen: 'UserProfile', params: { id: route.params.receiverId } })} style={{ flexDirection: 'row' }}><Image style={{ height: 38, width: 38, borderRadius: 50,  }} source={{ uri: `${URL}/auth/pictures/${currentUserAvatar}` }} /><StyledText style={{ fontSize: 17, marginLeft: 10 }}>{currentUserName}  {route.params.receiver.vip && Icon}</StyledText></TouchableOpacity>, headerBackVisible: true, title: '', headerRight: () => <View style={{ flexDirection: 'row', marginBottom: 10 }}><TouchableOpacity onPress={() => navigation.push('Call', { otherUserId: currentUserId, currentUserName, currentUserAvatar, callType: 'VIDEO' })} style={{ marginLeft: 20, marginRight: 20 }}>{ theme === Themes.DARK ? <VideoWhiteIcon /> : <VideoIcon />}</TouchableOpacity><TouchableOpacity onPress={() => navigation.push('Call', { otherUserId: currentUserId, currentUserName, currentUserAvatar, callType: 'AUDIO' })} style={{ marginRight: 20 }}>{ theme === Themes.DARK ? <CallWhiteIcon /> : <CallBlackIcon />}</TouchableOpacity></View>}
                }} />
                <Stack.Screen name="Call" component={CallScreen} options={({navigation}) => ({ headerShown: false })} />
                <Stack.Screen name="Complaint" component={ComplaintScreen} options={({navigation}) => ({ title: complaintText })} />
            </Stack.Navigator>
        </>
    )
}

export default ChatsNavigator
