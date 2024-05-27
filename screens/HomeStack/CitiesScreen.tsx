import React, { useState, useEffect } from 'react'
import { StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import StyledText from '../../components/Typography/StyledText';
import useAuth from '../../hooks/useAuth';
import Chip from '../../components/Chip';
import { getToken } from '../../service/asyncStorage';
import { ApiRequests } from '../../service/api/api';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

interface City {
    id: number,
    createdAt: string,
    updatedAt: string,
    name: string
}

export default function CitiesScreen({ navigation }: any) {
  const [ cities, setCities ] = useState<City[]>([])

  const theme = useSelector(getCurrentTheme)

  useEffect(() => {
    getToken().then(t => ApiRequests.cities(t).then(c => setCities(c)).catch(e => console.error(e))).catch(e => console.error(e))
  }, []) 

  return (
    <ScrollView style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
      <View style={styles.infoContainer}>
        { cities ? cities.map(c => (
            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <TouchableOpacity onPress={() => navigation.push('Filter', { city: c.name })}>            
                    <StyledText style={styles.infoTitle}>{c.name}</StyledText>
                </TouchableOpacity>    
                <View style={{ borderBottomColor: '#757F8C', width: '100%', borderBottomWidth: 1 }}>
                </View>
            </View>
        )) : <></> }

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

    infoTitle: {
        fontSize: 18,
        marginVertical: 10,
        // color: '#151624'
    },
    infoContainer: {
        display: 'flex',
        width: '85%',
        // marginTop: 20,
        marginLeft: 25
    },
});
