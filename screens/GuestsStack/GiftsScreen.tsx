import React, { useState, useEffect } from 'react'
import { StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { View } from '../../components/Themed';
import axios from 'axios';
import { getToken } from '../../service/asyncStorage';
import StyledText from '../../components/Typography/StyledText';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchingUsers } from '../../store/ducks/matching/selectors';
import { setUsers } from '../../store/ducks/matching/actionCreators';
import { useIsFocused } from '@react-navigation/native';
import { ApiRequests, URL } from '../../service/api/api';
import CoinIcon from './../../assets/images/coin.svg'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import { setBalance } from '../../store/ducks/auth/actionCreators';
import useAuth from '../../hooks/useAuth';

export default function GiftsScreen({ navigation, route }: any) {
    const [ gifts, setGifts ] = useState<[]>([])

    const dispatch = useDispatch()

    const { user } = useAuth()

    const userToId = route.params.id

    const theme = useSelector(getCurrentTheme)
    useEffect(() => {
        getToken().then(token => ApiRequests.gifts(token).then(g => setGifts(g)))
    }, [])

    const costText = getStringInCurrentLanguage('Цена', 'Cost', 'Maliyet', 'Narxi')

    const handleSendGift = (giftId: number, giftCost: number) => {
      getToken().then(t => ApiRequests.sendGift(t, userToId, giftId).then(d => {
        dispatch(setBalance(user.balance - giftCost))
        navigation.goBack()
      }).catch(e => console.error(e))).catch(e => console.error(e))
    }

    return (
            <ScrollView style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
            <View style={{ ...styles.container, backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}>
                { gifts ? gifts.map(g => (
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <ImageBackground imageStyle={{ borderRadius: 8}} source={{uri: g.img ? URL + '/auth/pictures/' + g.img : 'ff'}} resizeMode="cover" style={{ height: 175, width: 160, borderRadius: 8, marginLeft: 13, marginTop: 15 }}>
                    <TouchableOpacity onPress={() => handleSendGift(g.id, g.cost)} activeOpacity={0.9} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 8, overflow: 'hidden'}}>
                        <StyledText style={{ fontSize: 18, color: 'white', paddingBottom: 5 }}>{g.name}</StyledText>
                            <StyledText style={{ fontSize: 12, color: 'white', paddingBottom: 12 }}>{costText}: {g.cost} <CoinIcon style={{ marginTop: 20 }} /></StyledText>
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
    alignSelf: 'center'
  },
});
