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

export default function FriendsScreen({ navigation }: any) {
  const [ friends, setFriends ] = useState<Auth[]>([])
  const isFocused = useIsFocused()

  const theme = useSelector(getCurrentTheme)

  const handleRemoveFromFriends = (id: number) => {
    getToken().then(t => ApiRequests.removeFromFriends(t, id).then(d => setFriends(friends.filter(u => u.id !== id))).catch(e => console.error(e))).catch(e => console.error(e))
  }

  useEffect(() => {
    getToken().then(t => ApiRequests.friends(t).then(u => setFriends(u)).catch(e => console.error(e))).catch(e => console.error(e))
  }, [isFocused])

  const removeFromFriendsText = getStringInCurrentLanguage('Удалить из друзей', 'Remove from friends', 'Arkadaşlardan kaldır', `Do'stlardan o’chirish`)

  return (
    <ScrollView style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
      <View style={{ ...styles.container, backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}> 
        { friends ? friends.map(u => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { screen: 'TabOne', id: u.id })} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <Image source = {{uri: u.avatar ? `${URL}/auth/pictures/${u.avatar}` : ''}}
                        style = {{ width: 40, height: 40, borderRadius: 100, marginTop: 20 }}
                    />
                    <StyledText style={{ fontSize: 18.44, marginTop: 16, marginLeft: 15 }}>{u.fullName}</StyledText>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveFromFriends(u.id)} style={{ marginTop: 16, backgroundColor: '#EF3672', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 4 }}><StyledText style={{ color: 'white' }}>{removeFromFriendsText}</StyledText></TouchableOpacity>
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
