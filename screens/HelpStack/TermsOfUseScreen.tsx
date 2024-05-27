import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function TermsOfUseScreen() {
    const theme = useSelector(getCurrentTheme)

    const mainText1 = getStringInCurrentLanguage(
        'Настоящее Пользовательское соглашение и политика конфиденциальности (далее "Соглашение") заключено между сайтом " Mintapp.org " (далее "Администрация") и физическим лицом (далее "Пользователь"), надлежащим образом зарегистрировавшимся в соответствии с разделом 2. настоящего Соглашения, и регулирует отношения по пользованию сайтом с адресом https://mintapp.org/ (далее "Сайт") в сети Интернет (далее "Сеть") . Соглашение вступает в силу с момента выражения Пользователем согласия с его условиями путем регистрации на Сайте. 1. Предмет Соглашения 1. Администрация предлагает Пользователю услуги по использованию Сайта на условиях, предусмотренных настоящим Соглашением. 2. Соглашение может быть изменено Администрацией без какого-либо специального',
        `This User Agreement and Privacy Policy (hereinafter referred to as the "Agreement") are concluded between the site " Mintapp.org " (hereinafter referred to as the "Administration") and an individual (hereinafter referred to as the "User") who has duly registered in accordance with Section 2. of this Agreement, and regulates the relationship on the use of the site with the address https://mintapp.org / (hereinafter referred to as the "Site") on the Internet (hereinafter referred to as the "Network"). The Agreement comes into force from the moment the User expresses consent to its conditions by registering on the Website. 1. Subject of the Agreement 1. The administration offers To the User of the services for the use of the Site on the terms provided for in this Agreement. 2. The Agreement may be amended by the Administration without any special`,
        `Bu Kullanıcı Sözleşmesi ve Gizlilik politikası (bundan sonra anılacaktır "Anlaşma") site arasında imzalandı " Mintapp.org " (bundan sonra "Yönetim" olarak anılacaktır) ve birey tarafından (bundan sonra "Kullanıcı" olarak anılacaktır), uygun şekilde kayıt yaptıranlara göre Bölüm 2 ile. Bu Anlaşmanın ve kullanım ilişkisini düzenler adresi olan site https://mintapp.org / (sonraki İnternet'te "Site") (bundan böyle "Ağ" olarak anılacaktır). Anlaşma şu andan itibaren yürürlüğe girecek Kullanıcının onayı ile yaptığı ifadeler şartlar ve koşullar için siteye kayıt yaptırarak. 1. Anlaşmanın Konusu 1. Yönetim şunları önermektedir Kullanıcı yazılım hizmetleri Siteyi kullanarak öngörülen koşullar Bu Anlaşma ile. 2. Anlaşma olabilir Yönetim tarafından olmadan değiştirildi herhangi bir özel`,
        `Ushbu foydalanuvchi shartnomasi va maxfiylik siyosati (keyingi o'rinlarda "Shartnoma") sayt o'rtasida tuzilgan "Mintapp.org "(keyingi o 'rinlarda" Ma 'muriyat" deb ataladi) va jismoniy shaxs (keyingi o ' rinlarda "foydalanuvchi"deb ataladi), tegishli tarzda muvofiq ro 'yxatdan o' tkazildi 2-bo ' lim. ko ' rsatilgan shartnoma va foydalanish munosabatlarini tartibga soladi manzil bilan sayt https://mintapp.org /(keyingi o'rinlarda "Sayt") Internetda (keyingi o'rinlarda" tarmoq"). Shartnoma quyidagi paytdan boshlab kuchga kiradi foydalanuvchi tomonidan uning roziligini bildiradi saytda ro'yxatdan o'tish orqali shartlar. 1. Shartnoma Predmeti 1. Ma'muriyat taklif qiladi Xizmat foydalanuvchisiga saytdan foydalanish nazarda tutilgan shartlar ushbu shartnoma bilan. 2. Shartnoma bo'lishi mumkin ma'muriyat tomonidan o'zgartirilmagan har qanday maxsus`
    )


            
    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
            <View style={{ width: '93%', flexWrap: 'nowrap'}}>
                <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText1}</StyledText>
            </View>
        </View>
    )

}

export default TermsOfUseScreen
