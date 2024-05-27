import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function ServicesScreen({ navigation }: any) {
    const [ stage, setStage ] = useState<number>(0)

    const theme = useSelector(getCurrentTheme)

    React.useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (stage == 0) {
                return
            } else {
                e.preventDefault()
                setStage(0)
            }
          }),
        [stage]
      );

    const mainText1 = getStringInCurrentLanguage(
        'Активировав данную услугу, Вы переносите свою анкету на первое место в общем списке онлайна и списках результатов по Вашему городу и стране. Обратите внимание: при появлении каждого нового участника, Ваша анкета будет смещаться на одну позицию вниз. Также Ваша анкета будет смещаться вниз, при активации данной услуги другими участниками из Вашего города. Заказать активацию услуги Вы всегда можете, перейдя в Меню - Сервисы - Поднятие в поиске.',
        "By activating this service, you transfer your questionnaire to the first place in the general online list and lists of results for Your city and country. Please note: when each new participant appears, your profile will shift one position down. Also, your profile will shift downwards when activating this service by other participants from your city. You can always order the activation of the service by going to the Menu - Services - Raising in the search.",
        "Bu hizmeti etkinleştirdikten sonra aktarırsınız genel olarak ilk etapta anketinizi yapın çevrimiçi liste ve sonuç listeleri Şehrinize ve ülkenize. Lütfen dikkat: ortaya çıktığında Her yeni üyeye, profilinize bir pozisyon aşağı kayacaktır. Ayrıca anketiniz aşağı doğru kayacaktır, Bu hizmeti başkaları tarafından etkinleştirdiğinizde Şehrinizden gelen katılımcılar. Her zaman hizmetin aktivasyonunu sipariş edin Menüye giderek yapabilirsiniz - Hizmetler - Aramada yükselme.",
        "Ushbu xizmatni faollashtirish orqali siz uzatasiz sizning so'rovnomangiz umuman olganda birinchi o'rinda turadi onlayn ro'yxat va natijalar ro'yxati Sizning shahringiz va mamlakatingiz. E'tibor bering: paydo bo'lganda har bir yangi ishtirokchi, sizning anketangiz bir pozitsiyani pastga siljitadi. Shuningdek, sizning so'rovnomangiz pastga siljiydi, ushbu xizmatni boshqalar faollashtirganda sizning shahringizdan kelgan ishtirokchilar. Siz har doim xizmatni faollashtirishga buyurtma berasiz siz menyuga o'tishingiz mumkin - xizmatlar - Qidiruvda ko'tarilish."
    )

    const mainText2 = getStringInCurrentLanguage(
        `Для серьёзных людей, ценящих комфорт предусмотрен VIP-статус, который выгодно выделит анкету знаком VIP и подарит много эксклюзивных возможностей! Для пользователей VIP доступны: 
        - фильтр входящих сообщений: от VIP-пользователей, анкет с фото, анкет определенного пола, отбор по стране проживания и возрасту От и До; 
        - поиск по интересам и увлечениям, гороскопу, характеру, предпочтениям, телосложению, материальному положению и прочим важным параметрам; 
        - отправление друзьям фотографий в личных сообщениях;
        - поднятие анкеты на 1 место результатов поиска по стране и городу каждые 2 дня; 
        - набор премиум смайликов (стикеров); 
        - услуга Скрытие в результатах поиска (вкл/выкл по вашему желанию); 
        - услуга Невидимка (вкл/выкл по вашему желанию); 
        - симпатии без границ; 
        - неограниченное количество бесплатных оценок +5!`,
        `For serious people who appreciate comfort , VIP status is provided, which will favorably highlight the profile with a VIP sign and give a lot of exclusive opportunities! For VIP users, the following are available: 
        - filter incoming messages: from VIP users, questionnaires with photos, questionnaires of a certain gender, selection by country of residence and age From and To; 
        - search by interests and hobbies, horoscope, character, preferences, physique, financial status and other important parameters; 
        - sending photos to friends in private messages; 
        - raising the questionnaire to the 1st place of results search by country and city every 2 days; 
        - a set of premium emoticons (stickers); 
        - Hiding service in search results (on/off at your request); 
        - Invisible service (on/off at your request); 
        - likes without borders; 
        - unlimited number of free ratings +5!`,
        `Rahatlığı takdir eden ciddi insanlar için avantajlı olan VIP statüsü sağlanmıştır anketi VIP işareti ile vurgulayacak ve birçok özel özellik! VIP kullanıcıları için kullanılabilir: 
        - Gelen mesajları filtreleyin: gönderen VIP kullanıcıları, fotoğraflı anketler, anketler belirli cinsiyete göre, ülkeye göre seçim konaklama ve yaş arası ve Yukarı; 
        - İlgi alanlarına ve hobilere göre arama yapın, burç, karakter, tercihlere, fiziksel, maddi durum ve diğer önemli şeyler ayarlara; 
        - arkadaşlarınıza fotoğraf gönderme kişisel mesajlar; 
        - Anketi sonuçların 1 yerine yükseltmek Her 2 günde bir ülkeye ve şehre göre arama yapın; 
        - Premium emoji paketi (çıkartmalar); 
        - Arama sonuçlarında Gizleme hizmeti (isteğinize göre açık / kapalı); 
        - Hizmet Görünmez (isteğinize göre açık / kapalı arzuya); 
        - sınır tanımayan sempatiler; 
        - Sınırsız sayıda ücretsiz +5 puan!`,
        `Qulaylikni qadrlaydigan jiddiy odamlar uchun VIP holati taqdim etiladi, bu foydali anketani VIP belgisi bilan ajratib turadi va beradi ko'p eksklyuziv imkoniyatlar! VIP foydalanuvchilari uchun mavjud: 
        - kiruvchi xabarlar filtri: dan VIP foydalanuvchilar, fotosuratlar bilan anketalar, anketalar muayyan jins, mamlakat bo'yicha tanlov turar joy va yoshdan to yoshgacha; 
        - qiziqishlar va sevimli mashg'ulotlar bo'yicha qidiruv, munajjimlar bashorati, tabiati, afzalliklari, jismoniy, moddiy lavozim va boshqa muhim narsalar parametrlar; 
        - do'stlaringizga fotosuratlarni yuborish shaxsiy xabarlar; 
        - anketani natijalarning 1-joyiga ko'tarish har 2 kunda mamlakat va shahar bo'yicha qidiruv; 
        - premium kulgichlar to'plami (stikerlar); 
        - qidiruv natijalarida yashirish xizmati (xohlaganingizcha yoqish/o'chirish); 
        - ko'rinmas xizmat (siz uchun yoqish/o'chirish ixtiyoriy); 
        - chegarasiz hamdardlik; 
        - cheksiz bepul baholash + 5`
    )

    const raiseText = getStringInCurrentLanguage('Как поднять мою анкету в результатах поиска?', 'How do I raise my profile in the search results?', 'Sonuçlarda anketimi nasıl yükseltebilirim arama mı?', "Natijalarda mening anketamni qanday ko'tarish kerak  qidiruv?")
    const vipText = getStringInCurrentLanguage('Статус VIP', "VIP status", 'VIP Durumu', "VIP holati")
    // const sympathyText = getStringInCurrentLanguage('Симпатии', 'Sympathy', 'Sempatiler', "Qiziqish")


    switch(stage) {
        case 0:
            
            return (
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
                    <View style={{ marginLeft: 25 }}>

                        <TouchableOpacity onPress={() => setStage(1)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{raiseText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStage(2)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{vipText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{sympathyText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity> */}
                        
                    </View>
                </View>
            )
        case 1: 
            
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '94%', flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText1}</StyledText>
                        </View>
                    </View>
                )
        case 2: 
            
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '94%', flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText2}</StyledText>
                        </View>
                    </View>
                )
}
}

export default ServicesScreen
