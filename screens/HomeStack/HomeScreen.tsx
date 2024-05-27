import React, { useState, useEffect } from 'react'
import { StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { View } from '../../components/Themed';
import axios from 'axios';
import { getToken } from '../../service/asyncStorage';
import StyledText from '../../components/Typography/StyledText';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchingUsers } from '../../store/ducks/matching/selectors';
import { setUsers } from '../../store/ducks/matching/actionCreators';
import { useIsFocused } from '@react-navigation/native';
import { URL } from '../../service/api/api';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import VipWhite from '../../assets/images/vipwhite.svg'

export default function HomeScreen({ navigation }: any) {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const users = useSelector(getMatchingUsers).matching.users

  const theme = useSelector(getCurrentTheme)

  useEffect(() => {
    getToken().then(token => axios.get(`${URL}/matching`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => dispatch(setUsers(r.data))))
  }, [])

  return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
          <View style={{ ...styles.container, ...{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}}>
            { users ? users.map(u => (
              <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <ImageBackground imageStyle={{ borderRadius: 8}} source={{uri: u.avatar ? URL + '/auth/pictures/' + u.avatar : 'ff'}} resizeMode="cover" style={{ height: 175, width: 160, borderRadius: 8, marginRight: 6, marginLeft: 6, marginTop: 15 }}>
                  <TouchableOpacity onPress={() => {
                    navigation.push('UserProfile', { id: u.id })
                  }} activeOpacity={0.9} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 8, overflow: 'hidden'}}>
                    <StyledText style={{ fontSize: 18, color: 'white', paddingBottom: 5 }}>{u.fullName} { u.vip ? <VipWhite style={{ marginTop: 13, marginLeft: 7 }} height={12} width={12} /> : <></> }</StyledText>
                    <StyledText style={{ fontSize: 12, color: 'white', paddingBottom: 12 }}>{u.cityName}</StyledText>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )) : <></> }
          </View>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 30,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center'
  },
});
