import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LikeScreen from './LikeScreen';
import FilterIcon from '../../assets/images/filter.svg'
import FilterScreen from '../HomeStack/FilterScreen';
import CitiesScreen from '../HomeStack/CitiesScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

const Stack = createNativeStackNavigator();

function HomeNavigator() {
    const findText = getStringInCurrentLanguage('Обнаружить', 'Discover', 'Keşfetmek', 'Juft')
    const filterText = getStringInCurrentLanguage('Фильтр', 'Filter', 'Filtreler', 'Filtr')
    const chooseCityText = getStringInCurrentLanguage('Выберите город', 'Choose a city', 'Bir şehir seç', 'Shaharni tanlang')

    const theme = useSelector(getCurrentTheme)
    
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
                <Stack.Screen name="Home" component={LikeScreen} options={({navigation}) => ({ title: findText, headerRight: () => <TouchableOpacity onPress={() => navigation.push('Filter')} activeOpacity={0.8}><FilterIcon /></TouchableOpacity> })} />
                <Stack.Screen name="Filter" component={FilterScreen} options={({navigation}) => ({ title: filterText})} />
                <Stack.Screen name="Cities" component={CitiesScreen} options={{ title: chooseCityText }} />

            </Stack.Navigator>
        </>
    )
}

export default HomeNavigator
