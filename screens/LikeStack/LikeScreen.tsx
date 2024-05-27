import React, { useState, useEffect } from 'react'
import { StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Chip from '../../components/Chip';
import EditScreenInfo from '../../components/EditScreenInfo';
import Input from '../../components/Input';
import StyledButton from '../../components/StyledButton';
import { Text, View } from '../../components/Themed';
import { ApiRequests, URL } from '../../service/api/api';
import { RootTabScreenProps } from '../../types';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { getToken } from '../../service/asyncStorage';
import StyledText from '../../components/Typography/StyledText';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchingUsers } from '../../store/ducks/matching/selectors';
import { setUsers } from '../../store/ducks/matching/actionCreators';
import KrestIcon from '../../assets/images/krest.svg'
import { useIsFocused } from '@react-navigation/native';
import HeartIcon from '../../assets/images/heart.svg'
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import VipWhite from '../../assets/images/vipwhite.svg'

export default function LikeScreen({ navigation }: any) {
  const [ currentUser, setCurrentUser ] = useState<number>(0)
  const users = useSelector(getMatchingUsers).matching.users

  const theme = useSelector(getCurrentTheme)


    const handleIncreaseNumber = () => {
        if (users.length - 1 > currentUser) {
            setCurrentUser(currentUser + 1)
        }
    }

    const handleSendLike = (id: number) => {
      getToken().then(t => ApiRequests.like(t, id).then(d => handleIncreaseNumber()).catch(e => console.error(e))).catch(e => console.error(e))
    }

  return (
      <View style={{ ...styles.container, ...{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}}>
        { users ? [users[currentUser]].map(u => (
          <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <ImageBackground imageStyle={{ borderRadius: 8}} source={{uri: URL + '/auth/pictures/' + u.avatar}} resizeMode="cover" style={{ height: 460, width: 330, borderRadius: 8, marginLeft: -138, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('TabOne', { screen: 'UserProfile', params: { id: u.id } })} activeOpacity={1} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 8, overflow: 'hidden'}}>
                    <StyledText style={{ fontSize: 24, color: 'white', paddingBottom: 7, paddingLeft: 20 }}>{u.fullName}, {u.age} { u.vip ? <VipWhite style={{ marginTop: 13, marginLeft: 7 }} height={20} width={20} /> : <></> }</StyledText>
                    <StyledText style={{ fontSize: 14, color: 'white', paddingBottom: 30, paddingLeft: 20 }}>{u.cityName}</StyledText>
                </TouchableOpacity>
                </ImageBackground>
            </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 34, marginLeft: -50, backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
            <TouchableOpacity onPress={handleIncreaseNumber} style={{ ...styles.buttonShadow, ...{ backgroundColor: 'white' } }}><KrestIcon /></TouchableOpacity>
            <TouchableOpacity onPress={() => handleSendLike(u.id)} style={{ ...styles.buttonShadow, ...{ backgroundColor: '#EF3672', marginLeft: 30 }}}><HeartIcon /></TouchableOpacity>
          </View>
          </View>
        )) : <></> }


      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: 500,
    marginBottom: 30,
    flexDirection: 'column',
    paddingBottom: 200
  },
  buttonShadow: {
    shadowColor: "#a6aab4",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity:  0.18,
    shadowRadius: 4.59,
    elevation: 5,
    width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 50,
    // marginLeft: 24
  }
});
