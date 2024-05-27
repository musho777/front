import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { View } from '../../components/Themed';
import StyledText from '../../components/Typography/StyledText';
import { Auth } from '../../store/ducks/auth/contracts/state';
import { useIsFocused } from '@react-navigation/native';
import { getToken } from '../../service/asyncStorage';
import { ApiRequests, URL } from '../../service/api/api';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import useAuth from '../../hooks/useAuth';

export default function NotificationsScreen({ navigation }: any) {
  const [ notifications, setNotifications ] = useState<Auth[]>([])
  const isFocused = useIsFocused()

  const { user } = useAuth()

  const theme = useSelector(getCurrentTheme)

  const likeText = getStringInCurrentLanguage('Отправил(а) вам лайк', 'Sent you a like', 'Sana bir beğeni gönderdim', "Sizga like yubordi")
  const friendText = getStringInCurrentLanguage('Добавил(а) вас в друзья', 'Added You to friends', 'Seni arkadaşlarına ekledi', "Sizni do'stlaringizga qo'shdi")
  const giftText = getStringInCurrentLanguage('Отправил(а) вам подарок', 'Sent you a gift', 'Sana bir hediye gönderdi', "Sizga sovg'a yubordi")
  const coinsText = getStringInCurrentLanguage('Вы получили монеты!', 'You got coins!', 'Paran var!', "Sizda tangalar bor!")
  const stikerText = getStringInCurrentLanguage('Вы получили новый стикер!', "You've got a new sticker!", 'Yeni bir çıkartmanız var!', "Sizda yangi stiker bor!")

  const getNotificationString = (type: string, user2Name?: string) => {
    switch (type) {
        case 'Like': return `${user2Name} ${likeText}`
        case 'Friend': return `${user2Name} ${friendText}`
        case 'Gift': return `${user2Name} ${giftText}`
        case 'Coins': return `${coinsText}`
        case 'Sticker': return `${stikerText}`
    }
  }

  useEffect(() => {
    getToken().then(t => ApiRequests.getNotifications(t).then(u => setNotifications(u)).catch(e => console.error(e))).catch(e => console.error(e))
  }, [isFocused])

  return (
    <ScrollView style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
      <View style={{ ...styles.container, backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}> 
        { notifications ? notifications.map(n => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <TouchableOpacity onPress={() => n.user2.id !== user.id && navigation.navigate('UserProfile', { screen: 'TabOne', id: n.user2.id })} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <Image source = {{uri: n.user2.avatar ? `${URL}/auth/pictures/${n.user2.avatar}` : ''}}
                        style = {{ width: 40, height: 40, borderRadius: 100, marginTop: 20 }}
                    />
                    <StyledText style={{ fontSize: 15, marginTop: 16, marginLeft: 10 }}>{getNotificationString(n.type, n.user2.id === user.id ? undefined : n.user2.fullName)}</StyledText>

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
