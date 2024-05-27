import React from 'react'
import { View, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import useAuth from '../../hooks/useAuth'
import { URL } from '../../service/api/api'
import VipBlack from '../../assets/images/vipblack.svg'
import VipWhite from '../../assets/images/vipwhite.svg'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import StyledText from '../../components/Typography/StyledText'
import StyledButton from '../../components/StyledButton'

function ConnectVipScreen({ navigation }: any) {
    const theme = useSelector(getCurrentTheme)
    const { user } = useAuth()

    const headerText = getStringInCurrentLanguage(
        'Откройте полный функционал вместе с VIP подпиской:',
        'Unlock full functionality with a VIP subscription:',
        'Bir VIP aboneliğiyle tam işlevselliğin kilidini açın:',
        "VIP obuna bilan to'liq funksiyani oching:"
    )

    const firstText = getStringInCurrentLanguage(
        'Оформление вашей анкеты эффектным знаком VIP в результатах поиска, списках друзей, гостей и в Вашем профиле.',
        'Making your profile with a spectacular VIP sign in search results, lists of friends, guests and in your profile.',
        'Arama sonuçlarında, arkadaş listelerinde, misafirlerde ve profilinizde muhteşem bir VIP girişi ile profilinizi oluşturun.',
        "Qidiruv natijalarida, do'stlar ro'yxatida, mehmonlar ro'yxatida va profilingizda ajoyib VIP kirish bilan profilingizni yaratish."
    )

    const secondText = getStringInCurrentLanguage(
        'Фильтр входящих сообщений: от VIP-пользователей, анкет с фото.',
        'Filter incoming messages: from VIP users, profiles with photos.',
        'Gelen mesajları filtreleyin: VIP kullanıcılardan, fotoğraflı profillerden.',
        "Kiruvchi xabarlarni filtrlash: VIP foydalanuvchilardan, fotosuratlar bilan profillar."
    )

    const thirdText = getStringInCurrentLanguage(
        'Автоматическое поднятие Вашей анкеты на первое место результатов поиска.',
        'Automatic raising of your profile to the first place of search results.',
        'Profilinizin otomatik olarak arama sonuçlarında ilk sıralara yükselmesi.',
        "Profilingizni avtomatik ravishda qidiruv natijalarida birinchi o'ringa ko'tarish."
    )

    const fourthText = getStringInCurrentLanguage(
        'Невидимка, возможность писать всем без ограничений.',
        'Invisibility, the ability to write to everyone without restrictions.',
        'Görünmezlik, kısıtlama olmadan herkese yazabilme.',
        "Ko'rinmaslik, har kimga cheklovsiz yozish qobiliyati."
    )

    const finalText = getStringInCurrentLanguage(
        '... и многое другое!',
        '... and much more!',
        '... ve daha fazlası!',
        '... va boshqalar!'
    )

    const connectVipText = getStringInCurrentLanguage(
        'Подключить VIP',
        'Connect VIP',
        "VIP'yi bağlayın",
        'VIP yoqish'
    )

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Image source = {{uri:user.avatar ? `${URL}/auth/pictures/${user.avatar}` : ''}}
                    style = {{ width: 80, height: 80, borderRadius: 100, marginRight: 20 }}
                />
                { theme === Themes.DARK ? <VipWhite width={87} height={80} /> : <VipBlack width={87} height={80} /> }
            </View>

            <View style={{ marginTop: 35, width: '88%' }}>
                <StyledText style={{ fontSize: 14 }}>{headerText}</StyledText>


                <StyledText style={{ fontSize: 14, color: '#757F8C', marginTop: 15 }}>{firstText}</StyledText>
                <StyledText style={{ fontSize: 14, color: '#757F8C', marginTop: 15 }}>{secondText}</StyledText>
                <StyledText style={{ fontSize: 14, color: '#757F8C', marginTop: 15 }}>{thirdText}</StyledText>
                <StyledText style={{ fontSize: 14, color: '#757F8C', marginTop: 15 }}>{fourthText}</StyledText>

                <StyledText style={{ fontSize: 14, marginTop: 15 }}>{finalText}</StyledText>
            </View>

            <StyledButton onPress={() => navigation.push('BuyVip')} style={{ position: 'absolute', bottom: 30 }}>{connectVipText}</StyledButton>
        </View>
    )
}

export default ConnectVipScreen
