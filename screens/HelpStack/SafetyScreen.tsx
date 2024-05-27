import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function SafetyScreen({ navigation }: any) {
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
        `Если Ваш пароль является комбинацией цифр (1234, 3333, 1122…), датой рождения (1985, 01041988, 2204…), номером Вашего телефона, или Ваш пароль повторяет Ваш никто считайте, что Вашу анкету уже украли! 
        Надежный пароль должен состоять не менее чем из 6 символов и содержать набор и букв, и цифр. Пример: 3u4YY34, gh37cdmA, 38927kLh, 2104oLeg77 
        Настройте режим восстановления Вашего пароля. Меню - Настройки - Восстановление пароля: -Восстановление пароля по номеру телефона. Удобный способ. 
        При восстановлении пароля надо ввести номер своего мобильного в международном формате и год рождения (не дату). Код смены поступит на Ваш мобильный. - Восстановление пароля по электронной почте`,
        `If ​​your password is a combination of numbers (1234, 3333, 1122…), date of birth (1985, 01041988, 2204…), your phone number, or your password repeats your no one consider that your profile has already been stolen!
        A strong password must be at least 6 characters long and contain both letters and numbers. Example: 3u4YY34, gh37cdmA, 38927kLh, 2104oLeg77
        Set up your password recovery mode. Menu - Settings - Password recovery: - Password recovery by phone number. Convenient way.
        When recovering your password, you must enter your mobile number in international format and the year of birth (not the date). The change code will be sent to your mobile. - Password recovery by e-mail`,
        `Parolanız bir sayı kombinasyonuysa (1234, 3333, 1122…), doğum tarihiniz (1985, 01041988, 2204…), telefon numaranız veya parolanız tekrarlanıyorsa, hiç kimse profilinizin zaten girildiğini düşünmesin. çalıntı!
        Güçlü bir parola en az 6 karakter uzunluğunda olmalı ve hem harf hem de rakam içermelidir. Örnek: 3u4YY34, gh37cdmA, 38927kLh, 2104oLeg77
        Parola kurtarma modunuzu ayarlayın. Menü - Ayarlar - Şifre kurtarma: - Telefon numarası ile şifre kurtarma. Uygun yol.
        Şifrenizi kurtarırken, cep telefonu numaranızı uluslararası formatta ve doğum yılını (tarihi değil) girmelisiniz. Değişiklik kodu cep telefonunuza gönderilecektir. - E-posta ile şifre kurtarma`,
        `Agar parolingiz raqamlar (1234, 3333, 1122...), tug'ilgan sana (1985, 01041988, 2204...) birikmasidan iborat bo'lsa, telefon raqamingiz yoki parolingiz takrorlansa, hech kim sizning profilingiz allaqachon o'rnatilgan deb hisoblamaydi. o'g'irlangan!
        Kuchli parol kamida 6 ta belgidan iborat bo'lishi va harflar va raqamlardan iborat bo'lishi kerak. Misol: 3u4YY34, gh37cdmA, 38927kLh, 2104oLeg77
        Parolni tiklash rejimini sozlang. Menyu - Sozlamalar - Parolni tiklash: - Telefon raqami bo'yicha parolni tiklash. Qulay yo'l.
        Parolni tiklashda siz mobil raqamingizni xalqaro formatda va tug'ilgan yilingizni (sana emas) kiritishingiz kerak. O'zgartirish kodi mobil telefoningizga yuboriladi. - E-mail orqali parolni tiklash`,
    )

    const mainText2 = getStringInCurrentLanguage(
        `Обязательно свяжите с анкетой текущий номер телефона и электронная почта-лучшая защита украсть ваш профиль. Внимание: не теряйте и не передавайте сим-карта никому с вашим номером телефон. Именно для этого числа отправьте пароль от вашего опроса, если вы его забудете. Свяжитесь с почтой. Главное меню-Настройки-изменить почтовый адрес. По электронной почте приходит письмо от монетного двора подробная инструкция. Если вы не получили электронное письмо от нас, проверить раздел спама на почту, письмо могло попасть туда по ошибке. Привязав адрес к вашей анкете электронная почта, вы держите ее в безопасности. Вы также можете настроить отправку приложение в уведомлениях по электронной почте важные события для вас. Никто из пользователей вас не увидит номер телефона и электронная почта.`,
        'Be sure to link to the questionnaire is the current phone number and email is the best protection steal your profile. Attention: do not lose and do not stretch SIM card to anyone with your number phone. It is for this number that send a password from your questionnaire if you forget him. Link with mail. Main menu-settings-change postal address. By email a letter from Mint comes detailed instructions. If you did not receive an email from us, check the spam section by mail, the letter could get there by mistake. By linking the address to your questionnaire email, you keep it safe. You can also customize the sending application in email notifications important events for you. None of the users will see you phone number and email.',
        "Ankete bağlantı verdiğinizden emin olun geçerli telefon numarası ve e-posta en iyi korumadır profilini çal. Dikkat: kaybetmeyin ve germeyin Numaranız olan herkese SIM kart telefon. Bu sayı için aşağıdaki durumlarda anketinizden bir şifre gönderin onu unutuyorsun. Posta ile bağlantı kurun. Ana menü-ayarlar-değiştir posta adresi. E-posta ile Mint'ten bir mektup geliyor ayrıntılı talimatlar. Bizden bir e-posta almadıysanız, posta yoluyla spam bölümünü kontrol edin, mektup yanlışlıkla oraya ulaşabilir. Adresi anketinize bağlayarak e-posta, güvende tut. Göndermeyi de özelleştirebilirsiniz e-posta bildirimlerinde uygulama sizin için önemli olaylar. Kullanıcıların hiçbiri sizi görmeyecek telefon numarası ve e-posta.",
        "Agar sizning parolingiz kombinatsiya bo'lsa raqamlar (1234, 3333, 1122...), tug'ilgan sana (1985, 01041988, 2204...), Sizning raqamingiz telefon yoki parolingiz sizni takrorlaydi hech kim sizning so'rovnomangiz allaqachon mavjud deb hisoblang o'g'irlangan! Kuchli parol bo'lmasligi kerak 6 ta belgidan kam va quyidagilarni o'z ichiga oladi ikkala harf va raqamlar to'plami. Misol: 3u4YY34, gh37cdmA, 38927kLh, 2104oLeg77 Qayta tiklash rejimini sozlang Sizning parolingiz. Menyu-Sozlamalar - Parolni tiklash: - Parolni raqam bo'yicha tiklash telefon. Qulay usul. Qayta tiklash paytida parol raqamingizni kiritishingiz kerak xalqaro formatda mobil va tug'ilgan yili (sana emas). Shift kodi mobil telefoningizga keladi. - Elektron parolni tiklash pochta. Qo'shimcha bilan oddiy usul xavfsizlik omili. Kod qayta tiklash sizning pochtangizga keladi, parolni faqat siz bilasiz. - Nazorat orqali parolni tiklash telefonda savol."
    )

    const mainText3 = getStringInCurrentLanguage(
        `В связи с участившимися случаями краж анкет пользователей соблюдайте следующие предосторожности: 
        1. Не передавайте данные своей учетной записи (логин, пароль) друзьям или случайным посетителям. 
        2. Администрация приложения НИКОГДА(!) не попросит сообщить ей Ваш логин и пароль. 
        3. Мы настоятельно не рекомендуем переходить по рекламным ссылкам, которые Вы можете получить в личной переписке или комментариях. Перейдя по рекламной ссылке, Вы рискуете: - загрузить в свой телефон вирус, который спишет с Вашего счета все Ваши деньги, либо сделает массовую СМС рассылку на короткие платные номера; - попасть на один из клонов Мяты, что может привести к потере учетной записи Googoosha.`,
        `Due to the increased frequency of cases when stealing user profiles, observe the following precautions: 
        1. Do not share your account details (login, password) with friends or random visitors. 
        2. Application Administration She will NEVER (!) ask you to tell her your username and password. 
        3. We strongly do not recommend clicking on advertising links that you can get in personal correspondence or comments. By clicking on the advertising link, you risk: - upload a virus to your phone that will write off all your money from your account, or he will make a mass SMS mailing to short paid numbers; - get on one of the Mint clones, which may lead to the loss of your account Googoosha.`,
        `Profillerin kırılması hakkında Sık görülen vakalarla bağlantılı olarak kullanıcı profillerinin çalınmasına dikkat edin aşağıdaki önlemler: 
        1. Hesap bilgilerinizi paylaşmayın arkadaşlara girişler (giriş, şifre) veya rastgele ziyaretçilere. 
        2. Uygulamanın yönetimi ASLA(!) Sizden ona söylemesini istemez giriş ve şifre. 
        3. Şiddetle tavsiye etmiyoruz reklam bağlantılarını takip et, Kişisel olarak alabileceğiniz şeyler yazışmalara veya yorumlara. Reklam bağlantısına giderek, Siz tehlikeye atmak: - Telefonunuza bir virüs yükleyin Tüm paranızı hesabınızdan yazacaktır, ya da toplu SMS gönderimi yapacaktır kısa ücretli odalar; - Nane klonlarından birine girmek için hesabınızı kaybetmenize neden olabilir Googoosha.`,
        `Ishlarning ko'payishi munosabati bilan foydalanuvchi anketalarini O'g'irlashga rioya qiling quyidagi ehtiyot choralari: 
        1. Hisob ma'lumotlarini uzatmang do'stlar uchun yozuvlar (Login, parol) yoki tasodifiy tashrif buyuruvchilar. 
        2. Ilova ma'muriyati Hech qachon(!) sizdan unga xabar berishingizni so'ramaydi foydalanuvchi nomi va parol. 
        3. Biz qat'iyan tavsiya etmaymiz reklama havolalarini bosing, siz shaxsiy ravishda olishingiz mumkin bo'lgan narsalar yozishmalar yoki sharhlar. Reklama havolasini bosish orqali siz xavf: - telefoningizga virusni yuklab oling sizning hisobingizdan barcha pullaringizni yozib oladi, yoki ommaviy SMS yuboradi qisqa pullik raqamlar; - Yalpiz klonlaridan biriga kiring, bu hisobni yo'qotishiga olib kelishi mumkin Googoosha.`
    )

    const mainText4 = getStringInCurrentLanguage(
        'Это наиболее распространенные виды мошенничества, при котором Вы просто теряете свои деньги и ничего не получаете взамен! Предлогов может быть много: от "бесплатных" интим-услуг за символическую цену ("вышли предоплату") и "вышли на дорогу", до откровенного выпрашивания на операцию или других не менее душераздирающих ситуаций. Продажа интим-фото/видео, просьбы занять до завтра, пополнить инет или счет - тот же самый обман! Обычно за просьбой сообщить пин-код (код активации карты оплаты) скрывается обычный мошенник, для которого это "бизнес". В случае получения Вами подобной информации достаточно добавить анкету отправителя в игнор, а также в этой анкете нажать "Пожаловаться" и выбрать причину жалобы. После этого анкета попадет на принудительную проверку к Модераторам приложения.',
        `These are the most common types of fraud in which you simply lose your money and get nothing in return! There can be many pretexts: from "free" sex services for a symbolic price ("paid in advance") and "went on the road", to outright begging for surgery or other equally heartbreaking situations. Sale of sex photos / videos, requests to borrow until tomorrow, top up the Internet or account - the same deception! Usually for a request to provide a PIN code (payment card activation code) hiding an ordinary fraudster, for whom this is a "business". If you receive such information, it is enough to add the sender's questionnaire to ignore, and also click "Complain" in this questionnaire and select the reason for the complaint. After that, the questionnaire will be submitted to the application Moderators for mandatory verification`,
        `Bu eng keng tarqalgan turlar siz oddiy bo'lgan firibgarlik pulingizni yo'qotib, hech narsa olmaysiz buning evaziga! Ko'p predloglar bo'lishi mumkin: "bepul" jinsiy aloqa xizmatlaridan ramziy narx ("oldindan to'langan") va" yo'lga chiqdik", ochiqchasiga operatsiya yoki boshqa narsalar uchun yolvorish kamroq yurakni xafa qiladigan vaziyatlar. Sotish uchun samimiy fotosuratlar/ videolar, so'rovlar ertaga qadar qarz oling, Internet yoki hisobni to'ldiring - xuddi shu aldash! Odatda PIN-kodni talab qilish uchun (to'lov kartasini faollashtirish kodi) yashiringan buning uchun oddiy firibgar "biznes". Agar siz shunga o'xshash narsani olsangiz ma'lumot faqat anketani qo'shadi yuboruvchini e'tiborsiz qoldiring, shuningdek ushbu anketada "shikoyat qilish" tugmasini bosing va sababini tanlang shikoyatlar. Shundan so'ng, anketa tushadi moderatorlar uchun majburiy tekshirish ilovalar.`,
        `Bu eng keng tarqalgan turlar siz oddiy bo'lgan firibgarlik pulingizni yo'qotib, hech narsa olmaysiz buning evaziga! Ko'p predloglar bo'lishi mumkin: "bepul" jinsiy aloqa xizmatlaridan ramziy narx ("oldindan to'langan") va" yo'lga chiqdik", ochiqchasiga operatsiya yoki boshqa narsalar uchun yolvorish kamroq yurakni xafa qiladigan vaziyatlar. Sotish uchun samimiy fotosuratlar/ videolar, so'rovlar ertaga qadar qarz oling, Internet yoki hisobni to'ldiring - xuddi shu aldash! Odatda PIN-kodni talab qilish uchun (to'lov kartasini faollashtirish kodi) yashiringan buning uchun oddiy firibgar "biznes". Agar siz shunga o'xshash narsani olsangiz ma'lumot faqat anketani qo'shadi yuboruvchini e'tiborsiz qoldiring, shuningdek ushbu anketada "shikoyat qilish" tugmasini bosing va sababini tanlang shikoyatlar. Shundan so'ng, anketa tushadi moderatorlar uchun majburiy tekshirish ilovalar.`
    )

    const mainText5 = getStringInCurrentLanguage(
        'Если вдруг, Вы получите сообщение вида: "для того чтобы (…какой-то предлог…) отправь SMS с текстом XXXX на номер NNNN", то знайте - этот пользователь МОШЕННИК! Никакому пользователю Мяты не нужно отправлять SMS, чтобы узнать что-либо о других анкетах и т.п. Результатом отправки подобных SMS будет потеря существенной суммы на Вашем счете и обогащение мошенника! В случае получения Вами подобной информации достаточно добавить анкету отправителя в игнор, а также в этой анкете нажать "Пожаловаться" и выбрать причину жалобы. После этого анкета попадет на принудительную проверку к Модераторам приложения.',
        `If suddenly, you will receive a message like: "in order to (... some excuse ...) send an SMS with the text XXXX to the number NNNN", then know - this user A FRAUD! No Mint user needs to send SMS to find out anything about other questionnaires, etc. The result of sending such SMS will be the loss of a substantial amount on your account and the enrichment of a fraudster! If you receive such information, it is enough to add the sender's questionnaire to ignore, and also click "Complain" in this questionnaire and select the reason complaints. After that, the questionnaire will be submitted to the application Moderators for mandatory verification`,
        `Aniden, bir tür mesaj alacaksınız: "(... bir bahane için...) Numaraya XXXX metniyle SMS gönder NNNN" sonra bilin - bu kullanıcı DOLANDIRICI! Nane kullanıcısının ihtiyacı yok hakkında bir şey öğrenmek için SMS gönder diğer anketlere vb. Gönderme sonucu benzer SMS önemli bir kayıp olacaktır Hesabınızdaki tutarlar ve zenginleştirmeler dolandırıcı! Eğer böyle bir şey alırsanız bilgi bir anket eklemek için yeterlidir göndereni görmezden gelmenin yanı sıra bu ankette de Şikayet Et'e tıklayın ve nedenini seçin şikayetler. Bundan sonra anket üzerine düşecek Moderatörlere zorla doğrulama uygulamalar.`,
        `Agar to'satdan sizga xabar keladi: "uchun (...qandaydir bahona...) raqamga XXXX matni bilan SMS yuboring Nnnn", keyin biling-bu foydalanuvchi Firibgar! Hech qanday Yalpiz foydalanuvchisiga kerak emas haqida biror narsa bilish uchun SMS yuboring boshqa anketalar va boshqalar. yuborish natijasi bunday SMS muhim yo'qotish bo'ladi hisobingizdagi miqdorlar va boyitish firibgar! Agar siz shunga o'xshash narsani olsangiz ma'lumot faqat anketani qo'shadi yuboruvchini e'tiborsiz qoldiring, shuningdek ushbu anketada "shikoyat qilish" tugmasini bosing va sababini tanlang shikoyatlar. Shundan so'ng, anketa tushadi moderatorlar uchun majburiy tekshirish ilovalar.`
    )

    const mainText6 = getStringInCurrentLanguage(
        'Мы настоятельно не рекомендуем общаться с пользователями, которые раздают "свой" номер телефона в самом начале переписки. Это особенно касается тех пользователей, чья анкета ориентирована на интим. Номер телефона может принадлежать ДРУГОМУ человеку. Позвонив по такому номеру, Вы не только обидите незнакомого человека, но и выслушаете массу неприятных слов в свой адрес. Имейте в виду, что звонок на такой номер может оказаться не менее дорогим, чем отправка SMS на короткий номер мошенника. В целях сохранения собственного спокойствия и безопасности не раздавайте свой номер телефона и контактные данные случайным пользователям, пока не убедитесь в их адекватности и нормальном психическом состоянии. Ваш мобильный могут выпрашивать и спамеры, с целью закидать Вас ненужной рекламой и ссылками на ресурсы с вирусами. Если все-таки это произошло - сообщите о проблеме своему мобильному',
        `We strongly do not recommend communicating with users who give out "their" phone number at the very beginning of the correspondence. This is especially true for those users whose profile is focused on intimacy. The phone number may belong to ANOTHER person. By calling this number, you will not only offend a stranger , but also listen to a lot of unpleasant words in your address. Keep in mind that a call to such a number may be no less expensive than sending an SMS to a fraudster's short number. In order to preserve your own do not give away peace and security your phone number and contact details to random users until you are sure of their adequacy and normal mental state. Spammers can also beg for your mobile phone in order to bombard you with unnecessary advertising and links to resources with viruses. If this still happened , report the problem to your mobile`,
        `Şiddetle tavsiye etmiyoruz kullanıcılarla iletişim kurun "kendi" telefon numaranızı dağıtın Yazışmaların en başında. Bu özellikle anketi olan kullanıcılar için geçerlidir samimiyete yöneliktir. Telefon numarası ait olabilir BAŞKA birine. Bunun için arayarak numaraya, sadece yabancıyı incitmekle kalmayacaksınız insanı, ama aynı zamanda çok şey dinleyeceksiniz adresinize hoş olmayan kelimeler. Böyle bir numaraya yapılan bir aramanın olduğunu unutmayın daha az pahalı olmayabilir, kısa bir numaraya SMS göndermekten ziyade dolandırıcının. Kendi iyiliğinizi korumak için huzur ve güvenliği dağıtmayın Telefon numaranızı ve iletişim bilgilerinizi girin rastgele kullanıcılara verilen veriler, henüz onların yeterli olduğundan emin olun ve normal bir zihinsel durum. Cep telefonunuz yalvarabilir ve spam gönderenler, sizi gereksiz yere atmak amacıyla reklamlarla ve kaynaklara bağlantılar ile virüslerle. Eğer yine de olduysa - sorunu cep telefonunuza bildirin`,
        `Biz qat'iyan tavsiya etmaymiz foydalanuvchilar bilan muloqot qilish "sizning" telefon raqamingizni bering yozishmalarning boshida. Bu ayniqsa anketasi bo'lgan foydalanuvchilarga tegishli jinsiy aloqaga qaratilgan. Telefon raqami tegishli bo'lishi mumkin Boshqa odamga. Bunga qo'ng'iroq qilish siz nafaqat notanish odamni xafa qilasiz odam, lekin siz ko'pchilikni tinglaysiz sizning manzilingizga yoqimsiz so'zlar. Shuni yodda tutingki, bunday raqamga qo'ng'iroq qilish bundan kam bo'lmasligi mumkin, qisqa raqamga SMS yuborishdan ko'ra scammer. O'zingizni saqlab qolish uchun tinchlik va xavfsizlikni tarqatmang telefon raqamingiz va kontaktlaringiz tasodifiy foydalanuvchilar uchun ma'lumotlar, ularning etarliligini hali aniqlamang va normal ruhiy holat. Sizning mobil telefoningiz yolvorishi mumkin va spamerlar, keraksiz narsalarni tashlash uchun reklama va manbalarga havolalar bilan viruslar. Agar shunday bo'lsa - muammo haqida mobil telefoningizga xabar bering`
    )

    const mainText7 = getStringInCurrentLanguage(
        'Если Вы получили сообщение, содержащее рекламу коммерческого характера, рекламу Интернет-ресурсов; сообщения, в которых Вас просят отправить SMS на короткий номер или иные рассылки, цель которых заключается в выманивании Ваших денег; письма, в которых Вас просят сообщить Ваши личные данные, пароли и т.п., достаточно добавить анкету отправителя в игнор, а также в этой анкете нажать "Пожаловаться" и выбрать причину жалобы. После этого анкета попадет на принудительную проверку к Модераторам приложения. Мы не можем просто потребовать от пользователей "быть хорошими" и не заниматься хулиганством. В виртуальном мире, как и оффлайн, есть преступники, нарушающие установленные для всех правила. Главное, что следует делать всем пользователям - это быть бдительными и не поддаваться на провокации. Тогда мошенникам здесь будет просто нечего делать.',
        `If you have received a message containing commercial advertising, advertising of Internet resources; messages in which you are asked to send SMS to a short number or other mailing lists, the purpose of which is to lure Your money; letters in which you are asked to provide your personal data, passwords, etc., it is enough to add the sender's questionnaire to ignore, and also click "Complain" in this questionnaire and select the reason for the complaint. After that, the questionnaire will be submitted to the application Moderators for mandatory verification We can't just demand from users should "be good" and not engage in hooliganism. In the virtual world, as well as offline, there are criminals who violate the rules set for everyone The main thing that all users should do is to be vigilant and not give in to provocations. Then the scammers will simply have nothing to do here.`,
        `Aşağıdakileri içeren bir mesaj aldıysanız ticari nitelikte reklamlar, İnternet kaynaklarının reklamını yapmak; mesajlar, Sizden bir SMS göndermeniz isteniyor kısa numara veya diğer postalar, amaç Bu, cezbedici olmaktan ibarettir Paranızı; içinde bulunduğunuz mektupları Kişisel bilgilerinizi bildirmeleri istenir, şifreler vb., bir anket eklemek yeterlidir göndereni görmezden gelmenin yanı sıra bu ankette de Şikayet Et'e tıklayın ve nedenini seçin şikayetler. Bundan sonra anket üzerine düşecek Moderatörlere zorla doğrulama uygulamalar. Sadece talep edemeyiz kullanıcılar "iyi ol" ve değil kabadayılık yapmak. Sanal olarak dünya, çevrimdışı olduğu gibi, suçlular da var, herkes için belirlenmiş olanları ihlal edenler Yönetmelik. Herkesin yapması gereken en önemli şey kullanıcılar uyanık olmaktır ve provokasyonlara boyun eğmemek için. O zaman dolandırıcıların burada hiçbir şeyi olmayacak yapmak.`,
        `Agar sizda quyidagi xabar bo'lsa tijorat reklama, Internet-resurslarni reklama qilish; xabarlar, unda sizdan SMS yuborish so'raladi qisqa raqam yoki boshqa pochta xabarlari, maqsad bu aldashdan iborat Sizning pulingiz; sizni o'z ichiga olgan xatlar shaxsiy ma'lumotlaringizni taqdim etish so'raladi, parollar va boshqalar, faqat anketa qo'shing yuboruvchini e'tiborsiz qoldiring, shuningdek ushbu anketada "shikoyat qilish" tugmasini bosing va sababini tanlang shikoyatlar. Shundan so'ng, anketa tushadi moderatorlar uchun majburiy tekshirish ilovalar. Biz faqat talab qila olmaymiz foydalanuvchilar "yaxshi bo'ling" va yo'q bezorilik bilan shug'ullaning. Virtualda dunyo, xuddi oflayn rejimda bo'lgani kabi, jinoyatchilar ham bor, hamma uchun o'rnatilganlarni buzish qoidalar. Hamma qilishi kerak bo'lgan asosiy narsa foydalanuvchilar hushyor bo'lishlari kerak va provokatsiyalarga berilmang. Keyin bu erda firibgarlar uchun hech narsa bo'lmaydi qilish.`
    )

    const passwordsText = getStringInCurrentLanguage('Все о паролях', 'All about passwords', 'Şifreler hakkında her şey', 'Parollar haqida hamma narsa')
    const hackingText = getStringInCurrentLanguage('О взломе анкет', 'About hacking profiles', 'Profillerin kırılması hakkında', "Anketalarni buzish haqida")
    const pinText = getStringInCurrentLanguage('Выманивание ПИН-кодов карт оплаты, просьбы пополнить счет', 'Enticing PIN codes of payment cards, requests to top up the account', 'Ödeme kartı PİN kodlarını cezbetmek, hesabınızı yenilemek için talepler', "To'lov kartalari PIN-kodlarini jalb qilish, hisobni to'ldirish uchun so'rovlar")
    const requestsText = getStringInCurrentLanguage('Просьбы отправить СМС на короткие номера', 'Requests to send SMS to short numbers', 'Kısa MESAJ göndermek için istekler numaralar', "Qisqa SMS yuborish uchun so'rovlar xonalar")
    const phoneNumbersText = getStringInCurrentLanguage('О номерах телефонов', 'About phone numbers', 'Telefon numaraları hakkında', "Telefon raqamlari haqida")
    const generalRecommendationsText = getStringInCurrentLanguage('Общие рекомендации', 'General recommendations', 'Genel öneriler', "Umumiy tavsiyalar")

    

    switch(stage) {
        case 0:
            return (
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
                    <View style={{ marginLeft: 25 }}>
        
                        <TouchableOpacity onPress={() => setStage(1)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{passwordsText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>
        
                        <TouchableOpacity onPress={() => setStage(3)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{hackingText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>
        
                        <TouchableOpacity onPress={() => setStage(4)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{pinText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>
        
                        <TouchableOpacity onPress={() => setStage(5)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{requestsText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>
        
                        <TouchableOpacity onPress={() => setStage(6)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{phoneNumbersText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>
        
                        <TouchableOpacity onPress={() => setStage(7)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{generalRecommendationsText}</StyledText>
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
        case 3: 
            
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '94%', flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText3}</StyledText>
                        </View>
                    </View>
                )

        case 4: 
            
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '94%', flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText4}</StyledText>
                        </View>
                    </View>
                )

        case 5: 
           
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '94%', flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText5}</StyledText>
                        </View>
                    </View>
                )
                case 6: 
           
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '94%', flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText6}</StyledText>
                        </View>
                    </View>
                )
                case 7: 
           
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '94%', flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText7}</StyledText>
                        </View>
                    </View>
                )
    }
}

export default SafetyScreen
