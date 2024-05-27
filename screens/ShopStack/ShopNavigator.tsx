import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Themes } from '../../store/ducks/theme/contracts/state';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import MainScreen from './MainScreen';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import GiftsScreen from './GiftsScreen';
import FriendsScreen from './FriendsScreen';
import StickersScreen from './StickersScreen';



const Stack = createNativeStackNavigator();

function ShopNavigator() {
    const theme = useSelector(getCurrentTheme)

    const shopText = getStringInCurrentLanguage(
        "Магазин",
        "Shop",
        "Mağaza",
        "Do'kon"
    )
    const giftsText = getStringInCurrentLanguage('Подарки', 'Gifts', 'Hediyeler', 'Sovg’alar')
    const friendsText = getStringInCurrentLanguage('Друзья', 'Friends', 'Arkadaşlar', 'Do’stlar')
    const stickersText = getStringInCurrentLanguage('Стикеры', "Stickers", 'Cıkartmalar', "Stikerlar")

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Gilroy-Bold',
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                 
            }}>
                <Stack.Screen name="Home" component={MainScreen} options={({navigation}) => ({ title: shopText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="GiftsScreen" component={GiftsScreen} options={({navigation}) => ({ title: giftsText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={({navigation}) => ({ title: friendsText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
                <Stack.Screen name="StickersScreen" component={StickersScreen} options={({navigation}) => ({ title: stickersText, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black'  })} />
            </Stack.Navigator>
        </>
    )
}

export default ShopNavigator
