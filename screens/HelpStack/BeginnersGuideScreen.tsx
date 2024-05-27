import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function BeginnersGuideScreen({ navigation }: any) {
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
        'Заявите о себе! Максимально заполните Свою анкету, расскажите о себе, Ваших планах и интересах. Моя анкета - редактировать, сохраните изменения. Не забывайте заполнять подробную анкету (типаж, знакомства и прочие данные). Добавьте изюминку в свою анкету, установите свой Статус. Моя анкета - Установить статус. По установленным статусам легко определить, в каком настроении и эмоциональном состоянии находится человек. Не скрывайте своих эмоций, особенно если они положительные! Обязательно добавьте свою Личную фотографию. Моя анкета - Мои фотографии - Добавить фото. Другие посетители хотят видеть, с кем они общаются. Выберите свою любимую картинку и загрузите ее в Ваш альбом. Моя анкета - Мои фотоальбомы - Добавить альбом. Лучший способ стать своим среди своих - проявлять активность! Общайтесь с другими людьми, не стесняйтесь, пишите личные сообщения, оставляйте',
        'If your password is a combination numbers (1234, 3333, 1122...), date of birth (1985, 01041988, 2204 ...), your phone number, or your password repeats your nobody consider that your profile has already been stolen! A strong password must consist of at least 6 characters and contain a set of both letters and numbers. Example: 3u4YY34, gh37cdmA, 38927kLh, 2104oLeg77 Configure the recovery mode Your password. Menu - Settings - Password Recovery: -Password recovery by phone number. A convenient way. When restoring the password, you need to enter your phone number mobile in international format and year of birth (not date). The shift code will be sent to your mobile. - Password recovery by email. An easy way with an additional security factor. The recovery code will be sent to your email, the password of which only you know. - Password recovery for a security question on the phone.',
        "Kendinizi tanıtın! Anketinizi olabildiğince doldurun, kendiniz hakkında konuşun, planlarınız ve ilgilerden. Profilim - düzenle, değişiklikleri kaydedin. Unutma ayrıntılı bir anketi doldurun (tip, tanışma ve diğer veriler). Profilinize bir vurgu ekleyin, Durumunuzu ayarlayın. Profilim - Durumu ayarla. Belirlenen şekilde durumların hangisinde olduğunu belirlemek kolaydır ruh hali ve duygusal durum bir insan var. Saklamayın duygularını, özellikle de onlar pozitif! Kişisel bilgilerinizi eklediğinizden emin olun fotoğrafı. Profilim - Fotoğraflarım - Fotoğraf ekle. Diğer ziyaretçiler ister kiminle konuştuklarını görmek için. En sevdiğiniz resmi seçin ve Albümünüze yükleyin. Profilim - Fotoğraf albümlerim bir albüm eklemektir. Kendi aralarında kendi olmanın en iyi yolu - Aktif olun! Görüşün diğer insanlarla, tereddüt etmeyin, özel mesajlar yazın, bırakın",
        "O'zingizni e'lon qiling! Anketangizni iloji boricha to'ldiring, o'zingiz, rejalaringiz va qiziqishlar. Mening anketam-tahrirlash, o'zgarishlarni saqlang. Unutmang batafsil anketani to'ldiring (turi, tanishuv va boshqa ma'lumotlar). Anketangizga burilish qo'shing, holatingizni belgilang. Mening anketam - Holatni o'rnating. Belgilangan tartibda statuslar qaysi birida ekanligini aniqlash oson kayfiyat va hissiy holat odam bor. Yashirmang ularning his-tuyg'ulari, ayniqsa ular ijobiy! Shaxsiy ma'lumotlaringizni qo'shganingizga ishonch hosil qiling rasm. Mening profilim-mening rasmlarim - Rasm qo'shing. Boshqa mehmonlar xohlashadi ular kim bilan gaplashayotganini ko'rish. Sevimli rasmingizni tanlang va uni albomingizga yuklang. Mening anketam - Mening fotoalbomlarim-albom Qo'shish. O'zingiznikidek bo'lishning eng yaxshi usuli - faol bo'ling ! Aloqa boshqa odamlar bilan, ikkilanmang, shaxsiy xabarlarni yozing, qoldiring"
    )

    const mainText2 = getStringInCurrentLanguage(
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
        `The application is prohibited: 
        - offers of a sexual nature; 
        - offers of any services; 
        - rudeness, insults; 
        - advertising; 
        - requests to top up your account; 
        - sale of photos/videos; 
        - publication of other people's photos and contact details; 
        - placement of e-mail addresses, phone numbers, links and other contact data in the public domain; 
        - collection of contact data (invitations to messengers, requests to leave a phone number or email address); 
        - placement of pornographic materials; 
        - manifestation of intolerance to racial and national differences; 
        - sexual perversions (incest, pedophilia, etc.); 
        - description of the means and methods of violence and suicide; 
        - betting services, loans, occult and magical services; 
        - distribution of drugs, recipes for the manufacture and tips on the use of narcotic substances;`,
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
        `Uygulama yasaktır:
        - jinsiy takliflar; 
        - har qanday xizmatlarning takliflari; 
        - qo'pollik, haqorat; 
        - reklama; 
        - hisobni to'ldirish uchun so'rovlar; 
        - rasmlar/videolarni sotish; 
        - boshqa odamlarning fotosuratlari va kontaktlarini nashr etish ma'lumotlar; 
        - manzillarni jamoat mulki sifatida joylashtirish elektron pochta pochta, telefon raqamlari, havolalar va boshqa aloqa ma'lumotlari; 
        - aloqa ma'lumotlarini yig'ish ( taklifnomalar yilda xabarchilar, raqamni qoldirish uchun so'rovlar telefon yoki elektron pochta manzili); 
        - pornografiyani joylashtirish materiallar; 
        - irqiy murosasizlikning namoyon bo'lishi va milliy farqlar; 
        - jinsiy buzuqlik ( incest, pedofiliya va boshqalar); 
        - zo'ravonlik vositalari va usullarining tavsifi va o'z joniga qasd qilish; giyohvand moddalar; 
        - Ta'riflangan boshqa har qanday qoidabuzarliklar foydalanuvchi shartnomasida`
    )

    const firstTimeText = getStringInCurrentLanguage('Впервые у нас? С чего начать?', 'For the first time with us? Where to start?', 'İlk defa burada mıyız? Nereden başlayayım?', 'Bizda birinchi marta? Qaerdan boshlash kerak?')
    const rulesText = getStringInCurrentLanguage('Правила сервиса', 'Service Rules', 'Hizmet Kuralları', "Xizmat qoidalari")

    

    switch(stage) {
        case 0:
            return (
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
                    <View style={{ marginLeft: 25 }}>
        
                        <TouchableOpacity onPress={() => setStage(1)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{firstTimeText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>
        
                        <TouchableOpacity onPress={() => setStage(2)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{rulesText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>
        
                        
                    </View>
                </View>
            )
        case 1: 
            
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '93%', flexWrap: 'nowrap'}}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText1}</StyledText>
                        </View>
                    </View>
                )
        case 2: 
            
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '93%', flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText2}</StyledText>
                        </View>
                    </View>
                )
    }
}

export default BeginnersGuideScreen
