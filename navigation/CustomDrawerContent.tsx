import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import StyledText from '../components/Typography/StyledText'
import useAuth from '../hooks/useAuth'
import { URL } from '../service/api/api'
import CoinIcon from './../assets/images/coin.svg'
import VipIcon from './../assets/images/vip.svg'
import ProfileIcon from './../assets/images/profileWhite.svg'
import MessageIcon from './../assets/images/message1.svg'
import NotificationIcon from './../assets/images/notification.svg'
import HeartIcon from './../assets/images/heartWhite.svg'
import FriendsIcon from './../assets/images/friends.svg'
import GuestsIcon from './../assets/images/guests.svg'
import ShopIcon from './../assets/images/shop.svg'
import SettingsIcon from './../assets/images/settings.svg'
import HelpIcon from './../assets/images/help.svg'
import DoorIcon from './../assets/images/door.svg'
import getStringInCurrentLanguage from '../service/getStringInCurrentLanguage'
import UzIcon from './../assets/images/uz.svg'
import TuIcon from './../assets/images/tu.svg'
import RuIcon from './../assets/images/ru.svg'
import EngIcon from './../assets/images/en.svg'
import LightThemeIcon from './../assets/images/lightthemeicon.svg'
import DarkThemeIcon from './../assets/images/darkthemeicon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentLanguage } from '../store/ducks/language/selectors'
import { Languages } from '../store/ducks/language/contracts/state'
import { setLanguage } from '../store/ducks/language/actionCreators'
import { getCurrentTheme } from '../store/ducks/theme/selectors'
import { Themes } from '../store/ducks/theme/contracts/state'
import { setTheme } from '../store/ducks/theme/actionCreators'
import VipWhite from '../assets/images/vipwhite.svg'
import SwitchEnabled from '../components/SwitchEnabled'
import SwitchDisabled from '../components/SwitchDisabled'
  
export default function CustomDrawerContent(props: any) {
    const { user, signOut } = useAuth()
    const currentLang = useSelector(getCurrentLanguage)
    const dispatch = useDispatch()

    const theme = useSelector(getCurrentTheme)

    const balanceText = getStringInCurrentLanguage('Ваш баланс', 'Balance', 'Bakiyeniz', 'Sizning balans')
    const addText = getStringInCurrentLanguage('Пополнить', 'Top up', 'Dolgu', 'To’ldirish')
    const vipText = getStringInCurrentLanguage('VIP-статус', 'VIP-status', 'VIP-durumu', 'VIP-status')
    const profileText = getStringInCurrentLanguage('Профиль', 'Profile', 'Profil', 'Profil')
    const messagesText = getStringInCurrentLanguage('Сообщения', 'Messages', 'İleti', 'Xabarlar')
    const notificationText = getStringInCurrentLanguage('Уведомления', 'Notifications', 'Bildirim', 'Bildirishnomalar')
    const sympathiesText = getStringInCurrentLanguage('Симпатии', 'Sympathies', 'Sempati', 'Simpatiyalar')
    const friendsText = getStringInCurrentLanguage('Друзья', 'Friends', 'Arkadaşlar', 'Do’stlar')
    const guestsText = getStringInCurrentLanguage('Гости', 'Guests', 'Misafirler', 'Qiziquvchilar')
    const shopText = getStringInCurrentLanguage('Магазин', 'Shop', 'Puan', 'Magazin')
    const parametersText = getStringInCurrentLanguage('Параметры', 'Settings', 'Ayarlar', 'Sozlamalar')
    const helpText = getStringInCurrentLanguage('Помощь', 'Help', 'Yardım', 'Yordam')
    const signoutText = getStringInCurrentLanguage('Выйти', 'Sign Out', 'Çıkış', 'Chiqish')

    const handleToggleTheme = () => {
        if (theme === Themes.DARK) {
            dispatch(setTheme(Themes.LIGHT))
        } else {
            dispatch(setTheme(Themes.DARK))
        }
    }

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{uri : user.avatar ? `${URL}/auth/pictures/${user.avatar}` : 'sdf'}} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <StyledText style={styles.nameText}>{user.fullName.trim()}, {user.age}</StyledText>

                { user.vip ? <VipWhite style={{ marginTop: 13, marginLeft: 7 }} height={20} width={20} /> : <></> }
            </View>
            <TouchableOpacity onPress={handleToggleTheme} style={{ marginTop: 15, marginRight: 30 }}>
                { theme === Themes.DARK ? <LightThemeIcon /> : <DarkThemeIcon /> }
            </TouchableOpacity>
        </View>
        
        <View style={styles.balanceContainer}>
            <StyledText style={styles.balanceText}>{balanceText}: {user.balance}</StyledText>
            <CoinIcon style={{ marginTop: 1, marginLeft: 10 }} />
            <TouchableOpacity onPress={() => props.navigation.navigate('TabEleven')}>
                <StyledText style={styles.addBalanceText}>{addText}</StyledText>
            </TouchableOpacity>
        </View>

        <View style={styles.languages}>
            <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.UZ))} style={currentLang === Languages.UZ ? styles.langIconActive : styles.langIcon }><UzIcon /></TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.RU))} style={currentLang === Languages.RU ? styles.langIconActive : styles.langIcon }><RuIcon /></TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.TU))} style={currentLang === Languages.TU ? styles.langIconActive : styles.langIcon }><TuIcon /></TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(setLanguage(Languages.ENG))} style={currentLang === Languages.ENG ? styles.langIconActive : styles.langIcon }><EngIcon /></TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => user.vip ? {} : props.navigation.navigate('TabNine')} activeOpacity={0.8} style={styles.linkContainer}>
                <VipIcon />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={styles.linkText}>{vipText}</StyledText>
                    <View style={{ marginLeft: '33%', marginTop: 3 }}>
                    { user.vip ? <SwitchEnabled /> : <SwitchDisabled /> }
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('TabFive')} activeOpacity={0.8} style={styles.linkContainer}>
                <ProfileIcon />
                <StyledText style={styles.linkText}>{profileText}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('TabFour')} activeOpacity={0.8} style={styles.linkContainer}>
                <MessageIcon />
                <StyledText style={styles.linkText}>{messagesText}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.linkContainer}>
                <NotificationIcon />
                <StyledText style={styles.linkText}>{notificationText}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('TabThree')} activeOpacity={0.8} style={styles.linkContainer}>
                <HeartIcon />
                <StyledText style={styles.linkText}>{sympathiesText}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('TabSix')} activeOpacity={0.8} style={styles.linkContainer}>
                <FriendsIcon />
                <StyledText style={styles.linkText}>{friendsText}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('TabSeven')} activeOpacity={0.8} style={styles.linkContainer}>
                <GuestsIcon />
                <StyledText style={styles.linkText}>{guestsText}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('TabTwelve')} activeOpacity={0.8} style={styles.linkContainer}>
                <ShopIcon />
                <StyledText style={styles.linkText}>{shopText}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('TabTen')} activeOpacity={0.8} style={styles.linkContainer}>
                <SettingsIcon />
                <StyledText style={styles.linkText}>{parametersText}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('TabEight')} activeOpacity={0.8} style={styles.linkContainer}>
                <HelpIcon />
                <StyledText style={styles.linkText}>{helpText}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={signOut} activeOpacity={0.8} style={styles.linkContainer}>
                <DoorIcon />
                <StyledText style={styles.linkText}>{signoutText}</StyledText>
            </TouchableOpacity>
        </View>

      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EF3672',
        height: '100%',
        paddingLeft: 20
    },
    avatar: {
        height: 90,
        width: 90,
        borderRadius: 50,
        marginTop: 55
    },
    nameText: {
        color: 'white',
        fontSize: 18,
        marginTop: 12
    },
    balanceText: {
        color: 'white',
        fontSize: 14,
    },
    addBalanceText: {
        color: 'white',
        fontSize: 10,
        marginLeft: 14
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    languages: {
        flexDirection: 'row',
        marginTop: 7.5
    },
    linksContainer: {
        marginTop: 18
    },
    linkContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    linkText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10
    },
    langIcon: {
        marginRight: 10,
        paddingBottom: 3
    },
    langIconActive: {
        marginRight: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    }

})