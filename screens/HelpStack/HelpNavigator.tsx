import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import HelpScreen from './HelpScreen';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import SafetyScreen from './SafetyScreen';
import BeginnersGuideScreen from './BeginnersGuideScreen';
import FCIScreen from './FCIScreen';
import CoinBalanceScreen from './CoinBalanceScreen';
import ServicesScreen from './ServicesScreen';
import PhotosScreen from './PhotosScreen';
import RulesScreen from './RulesScreen';
import TermsOfUseScreen from './TermsOfUseScreen';
import TechSupportScreen from './TechSupportScreen';
import StyledText from '../../components/Typography/StyledText';
import { View, Image } from 'react-native';
import GGSIcon from '../../assets/images/team-img-2 2.svg'

const Stack = createNativeStackNavigator();

function HelpNavigator() {
    const theme = useSelector(getCurrentTheme)

    const helpText = getStringInCurrentLanguage('Помощь', 'Help', 'Yardım', 'Yordam')
    const safetyText = getStringInCurrentLanguage('Безопасность', 'Safety', 'Güvenlik', 'Xavfsizlik')
    const beginnersGuideText = getStringInCurrentLanguage('Путеводитель для новичков', "Beginner's guide", 'Yeni başlayanlar için rehber', "Yangi boshlanuvchilar uchun qo'llanma")
    const fciText = getStringInCurrentLanguage('Дружба, переписка, игнор', 'Friendship, ignore', 'Arkadaşlık, yazışmalar, görmezden gelme', "Do'stlik, yozishmalar, e'tiborsizlik")
    const rocbText = getStringInCurrentLanguage('Пополнение баланса монет', 'Replenishment of the coin balance', 'Madeni paraların dengesini yenilemek', "Tangalar balansini to'ldirish")
    const servicesText = getStringInCurrentLanguage('Услуги и доп. сервисы', 'Services and additional services', 'Hizmetler ve ek hizmetler', "Xizmatlar va qo'shimcha xizmatlar")
    const profileSettingsText = getStringInCurrentLanguage('Настройки профиля', 'Profile Settings', 'Profil ayarları', "Profil sozlamalari")
    const photosText = getStringInCurrentLanguage('Фотографии', 'Photos', 'Fotoğraflar', "Rasmlar")
    const siteRulesText = getStringInCurrentLanguage('Правила сервиса', 'Service rules', 'Site Kuralları', "Sayt qoidalari")
    const termsOfUseText = getStringInCurrentLanguage('Пользовательское соглашение', 'Terms of use', 'Kullanıcı Sözleşmesi', "Foydalanuvchi shartnomasi")
    const aboutTheAppText = getStringInCurrentLanguage('О приложении', 'About the app', 'Uygulama hakkında', "Ilova haqida")
    const supportText = getStringInCurrentLanguage('Техподдержка', 'Tech Support', 'Destek', "Qo'llab-quvvatlash")


    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    });

    if (fontsLoaded) {
        return (
            <>
                <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black', headerTitleStyle: { fontFamily: 'Gilroy-Bold' }, headerShadowVisible: false }}>
                    <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: helpText, headerTitleAlign: 'center' }} />
                    <Stack.Screen name="SafetyScreen" component={SafetyScreen} options={{ title: safetyText, headerTitleAlign: 'center' }} />
                    <Stack.Screen name="BeginnersGuideScreen" component={BeginnersGuideScreen} options={{ title: beginnersGuideText, headerTitleAlign: 'center' }} />
                    <Stack.Screen name="FCIScreen" component={FCIScreen} options={{ title: fciText, headerTitleAlign: 'center' }} />
                    <Stack.Screen name="CoinBalanceScreen" component={CoinBalanceScreen} options={{ title: rocbText, headerTitleAlign: 'center' }} />
                    <Stack.Screen name="ServicesScreen" component={ServicesScreen} options={{ title: servicesText, headerTitleAlign: 'center' }} />
                    <Stack.Screen name="PhotosScreen" component={PhotosScreen} options={{ title: photosText, headerTitleAlign: 'center' }} />
                    <Stack.Screen name="RulesScreen" component={RulesScreen} options={{ title: siteRulesText, headerTitleAlign: 'center' }} />
                    <Stack.Screen name="TermsOfUseScreen" component={TermsOfUseScreen} options={{ title: termsOfUseText, headerTitleAlign: 'center' }} />
                    <Stack.Screen name="TechSupportScreen" component={TechSupportScreen} options={({navigation}) => ({ title: '', headerBackVisible: true, headerStyle: { backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }, headerTintColor: theme === Themes.DARK ? 'white' : 'black', headerLeft: () => <View style={{ flexDirection: 'row' }}><GGSIcon height={45} width={45} /><StyledText style={{ fontSize: 17, marginLeft: 10 }}>{supportText}</StyledText></View>  })} />
                </Stack.Navigator>
            </>
        )
    }

}

export default HelpNavigator
