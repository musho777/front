import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { View } from '../../components/Themed';
import StyledText from '../../components/Typography/StyledText';
import { Auth } from '../../store/ducks/auth/contracts/state';
import { useIsFocused } from '@react-navigation/native';
import { getToken } from '../../service/asyncStorage';
import { ApiRequests, SocketURL, URL } from '../../service/api/api';
import GiftIcon from '../../assets/images/gift.svg'
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import io from 'socket.io-client'
import VipWhite from '../../assets/images/vipwhite.svg'
import VipBlack from '../../assets/images/vipblack.svg'

const socket = io(SocketURL)

export default function ChatsScreen({ navigation }: any) {
  const [ chats, setChats ] = useState<Auth[]>([])
  const theme = useSelector(getCurrentTheme)
  const { user } = useAuth()
  const isFocused = useIsFocused()

  const Icon = theme === Themes.DARK ? <VipWhite style={{ marginTop: 13, marginLeft: 7 }} height={12} width={12} /> : <VipBlack style={{ marginTop: 13, marginLeft: 7 }} height={12} width={12} />

  useEffect(() => {
    getToken().then(t => ApiRequests.chats(t).then(u => setChats(u)).catch(e => console.error(e))).catch(e => console.error(e))

    socket.on('recMessage', (m) => {
      if (m.receiverId === user.id) {
        getToken().then(t => ApiRequests.chats(t).then(u => setChats(u)).catch(e => console.error(e))).catch(e => console.error(e))
      }
    })

    return () => {
      socket.off("recMessage")
    };
  }, [isFocused])

  return (
    <ScrollView style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
      <View style={{ ...styles.container, ...{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}}> 
        { chats ? chats.map(c => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}>
                <TouchableOpacity onPress={() => navigation.push('Chat', { chatId: c.id, receiverId: c.user1.id == user.id ? c.user2.id : c.user1.id, receiver: c.user1.id == user.id ? c.user2 : c.user1 })} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <Image source = {{uri: c.user1.id == user.id ? `${URL}/auth/pictures/${c.user2.avatar}` : `${URL}/auth/pictures/${c.user1.avatar}`}}
                        style = {{ width: 50, height: 50, borderRadius: 100, marginTop: 20 }}
                    />
                    <View style={{ marginLeft: 15, backgroundColor: theme === Themes.DARK ? '#252931' : 'white', width: 200 }}>
                        <StyledText style={{ fontSize: 18, marginTop: 16 }}>{c.user1.id == user.id ? c.user2.fullName : c.user1.fullName} {c.user1.id == user.id ? c.user2.vip && Icon : c.user1.vip && Icon}</StyledText>
                        <StyledText style={{ fontSize: 12, marginTop: 5 }}>{c.messages.map(m => m.text)[c.messages.length - 1]?.slice(0, 30) || 'Начните общаться'}</StyledText>
                    </View>
                    { c.messages.filter(m => !m.seen && m.senderId !== user.id).length >= 1 ? <Text style={{ fontSize: 12, marginTop: 5, backgroundColor: '#EF3672', borderRadius: 50,  paddingBottom: 2, marginLeft: '22%', paddingVertical: 2, paddingHorizontal: 6, color: 'white' }}>{c.messages.filter(m => !m.seen && m.senderId !== user.id).length}</Text> : <></> }
                </TouchableOpacity>
            </View>
        )) : <></> }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        paddingLeft: 17,
        paddingRight: 17,
        alignSelf: 'center',
        marginBottom: 25,
    },
});
