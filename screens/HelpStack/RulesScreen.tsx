import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function RulesScreen({ navigation }: any) {
    const theme = useSelector(getCurrentTheme)

    const mainText1 = getStringInCurrentLanguage(
        `В приложении запрещены: 
        - предложения сексуального характера; 
        - предложения любых услуг; 
        - хамство, оскорбления; 
        - реклама; 
        - просьбы пополнить счет; 
        - продажа фото/видео; 
        - публикация чужих фото и контактных данных; 
        - размещение в открытом доступе адресов эл. почты, телефонных номеров, ссылок и других контактных данных; 
        - сбор контактных данных (приглашения в мессенджеры, просьбы оставить номер телефона или адрес электронной почты); 
        - размещение порнографических материалов; 
        - проявление нетерпимости к расовым и национальным различиям; 
        - сексуальные извращения (инцест, педофилия и т.п.); 
        - описание средств и способов насилия и суицида; 
        - букмекерские услуги, кредиты, оккультные и магические услуги; 
        - распространение наркотиков, рецепты изготовления и советы по употреблению наркотических веществ; 
        - Любые другие нарушения, описанные в Пользовательском соглашении`,
        `The application does not allow:
        - offers of a sexual nature;
        - offers of any services;
        - rudeness, insults;
        - advertising;
        - requests to replenish the account;
        - sale of photo/video;
        - publication of other people's photos and contact details;
        - Placing publicly available e-mail addresses. mail, phone numbers, links and other contact details;
        - collection of contact data (invitations to instant messengers, requests to leave a phone number or email address);
        - placement of pornographic materials;
        - manifestation of intolerance to racial and national differences;
        - sexual perversions (incest, pedophilia, etc.);
        - description of the means and methods of violence and suicide;
        - betting services, loans, occult and magical services;
        - distribution of drugs, recipes for making and advice on the use of drugs;
        - Any other violations described in the User Agreement`,
        `Uygulama yasaktır: 
        - cinsel içerikli öneriler; 
        - Herhangi bir hizmetin teklifleri; 
        - kabalık, hakaret; 
        - reklam; 
        - Hesabınıza para yatırma talepleri; 
        - fotoğraf/video satışı; 
        - Başkalarının fotoğraflarını ve iletişimlerini yayınlama bunların; 
        - Adreslerin kamuya açık olarak yerleştirilmesi al. posta, telefon numaraları, bağlantılar ve diğer iletişim bilgileri; 
        - İletişim bilgilerinin toplanması (davetiyeler habercilere, lütfen numarayı bırakın telefon veya e-posta adresi); 
        - Pornografik konaklama malzemelerin; 
        - Irkçılara karşı hoşgörüsüzlüğün tezahürü ve ulusal farklılıklar; 
        - cinsel sapıklıklar (ensest, pedofili vb.); 
        - Şiddet araçlarının ve yöntemlerinin tanımı ve intihar; 
        - Bahis hizmetleri, krediler, gizli ve büyülü hizmetler; 
        - uyuşturucu dağıtımı, reçeteler imalatlar ve kullanım ipuçları narkotik maddeler;`,
        `Ilova quyidagilarga ruxsat bermaydi:
        - jinsiy xarakterdagi takliflar;
        - har qanday xizmatlar takliflari;
        - qo'pollik, haqorat qilish;
        - reklama;
        - hisobni to'ldirish uchun so'rovlar;
        - foto/video sotish;
        - boshqa odamlarning fotosuratlari va aloqa ma'lumotlarini nashr etish;
        - Hammaga ochiq elektron pochta manzillarini joylashtirish. pochta, telefon raqamlari, havolalar va boshqa aloqa ma'lumotlari;
        - aloqa ma'lumotlarini yig'ish (messenjerlarga taklifnomalar, telefon raqami yoki elektron pochta manzilini qoldirish so'rovlari);
        - pornografik materiallarni joylashtirish;
        - irqiy va milliy farqlarga toqat qilmaslikning namoyon bo'lishi;
        - jinsiy buzuqlik (insest, pedofiliya va boshqalar);
        - zo'ravonlik va o'z joniga qasd qilish vositalari va usullarini tavsiflash;
        - bukilish xizmatlari, kreditlar, okkultiv va sehrli xizmatlar;
        - dori vositalarini tarqatish, tayyorlash retseptlari va dori vositalaridan foydalanish bo'yicha tavsiyalar;
        - Foydalanuvchi shartnomasida tavsiflangan boshqa har qanday qoidabuzarliklar`
    )


            
    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
            <View style={{ width: '93%', flexWrap: 'nowrap'}}>
                <StyledText style={{ textAlign: 'left', fontSize: 14.5 }}>{`\t` + mainText1}</StyledText>
            </View>
        </View>
    )

}

export default RulesScreen
