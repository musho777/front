import React, { useState, useEffect } from 'react'
import { StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import StyledText from '../../components/Typography/StyledText';
import useAuth from '../../hooks/useAuth';
import Chip from '../../components/Chip';
import { Auth } from '../../store/ducks/auth/contracts/state';
import { useIsFocused } from '@react-navigation/native';
import { getToken } from '../../service/asyncStorage';
import { ApiRequests, URL } from '../../service/api/api';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

export default function MatchRequestScreen({ navigation }: any) {
  const [ matchRequests, setMatchRequests ] = useState<Auth[]>([])
  const isFocused = useIsFocused()

  const theme = useSelector(getCurrentTheme)

  const handleAccept = (id: number) => {
    getToken().then(t => ApiRequests.like(t, id).then(d => setMatchRequests(matchRequests.filter(u => u.id !== id))).catch(e => console.error(e))).catch(e => console.error(e))
  }

  useEffect(() => {
    getToken().then(t => ApiRequests.likesFrom(t).then(u => setMatchRequests(u)).catch(e => console.error(e))).catch(e => console.error(e))
  }, [isFocused])

  const requestText = getStringInCurrentLanguage('Отправил(а) запрос', 'Sent a request', 'İstek gönder', `Sizga so'rov yubordi`)
  const acceptText = getStringInCurrentLanguage('Принять', 'Accept', 'Kabul', `Tasdiqlash`)

  return (
    <ScrollView style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
      <View style={{ ...styles.container, ...{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' } }}> 
        { matchRequests ? matchRequests.map(u => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { screen: 'TabOne', id: u.id })} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <Image source = {{uri: u.avatar ? `${URL}/auth/pictures/${u.avatar}` : ''}}
                        style = {{ width: 40, height: 40, borderRadius: 100, marginTop: 20 }}
                    />
                    <StyledText style={{ fontSize: 16, marginTop: 16, marginLeft: 8 }}>{u.fullName}</StyledText>

                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 35, backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={{ fontSize: 14, color: '#757F8C', marginTop: 16, marginLeft: 10 }}>{requestText}</StyledText>
                </View>
                <TouchableOpacity onPress={() => handleAccept(u.id)} style={{ marginTop: 16, backgroundColor: '#EF3672', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 30 }}><StyledText style={{ color: 'white' }}>{acceptText}</StyledText></TouchableOpacity>
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
        paddingLeft: 22,
        paddingRight: 22,
        alignSelf: 'center'
    },
});
