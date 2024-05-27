import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function HelpScreen({ navigation }: any) {
    const theme = useSelector(getCurrentTheme)

    const safetyText = getStringInCurrentLanguage('Безопасность', 'Safety', 'Güvenlik', 'Xavfsizlik')
    const beginnersGuideText = getStringInCurrentLanguage('Путеводитель для новичков', "Beginner's guide", 'Yeni başlayanlar için rehber', "Yangi boshlanuvchilar uchun qo'llanma")
    const fciText = getStringInCurrentLanguage('Дружба, переписка, игнор', 'Friendship, ignore', 'Arkadaşlık, yazışmalar, görmezden gelme', "Do'stlik, yozishmalar, e'tiborsizlik")
    const rocbText = getStringInCurrentLanguage('Пополнение баланса монет', 'Replenishment of the coin balance', 'Madeni paraların dengesini yenilemek', "Tangalar balansini to'ldirish")
    const servicesText = getStringInCurrentLanguage('Услуги и доп. сервисы', 'Services and additional services', 'Hizmetler ve ek hizmetler', "Xizmatlar va qo'shimcha xizmatlar")
    // const profileSettingsText = getStringInCurrentLanguage('Настройки профиля', 'Profile Settings', 'Profil ayarları', "Profil sozlamalari")
    const photosText = getStringInCurrentLanguage('Фотографии', 'Photos', 'Fotoğraflar', "Rasmlar")
    const siteRulesText = getStringInCurrentLanguage('Правила сервиса', 'Service rules', 'Site Kuralları', "Sayt qoidalari")
    const termsOfUseText = getStringInCurrentLanguage('Пользовательское соглашение', 'Terms of use', 'Kullanıcı Sözleşmesi', "Foydalanuvchi shartnomasi")
    const supportText = getStringInCurrentLanguage('Техподдержка', 'Tech Support', 'Destek', "Qo'llab-quvvatlash")

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
            <View style={{ marginLeft: 25 }}>

                <TouchableOpacity onPress={() => navigation.push('SafetyScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{safetyText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push('BeginnersGuideScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{beginnersGuideText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push('FCIScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{fciText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push('CoinBalanceScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{rocbText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push('ServicesScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{servicesText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{profileSettingsText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => navigation.push('PhotosScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{photosText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push('RulesScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{siteRulesText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{aboutTheAppText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => navigation.push('TermsOfUseScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{termsOfUseText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push('TechSupportScreen')} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 16 }}>{supportText}</StyledText>
                    <View style={{ marginRight: 25 }}>
                        { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                    </View>
                </TouchableOpacity>

                
            </View>
        </View>
    )
}

export default HelpScreen
