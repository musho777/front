import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function FCIScreen({ navigation }: any) {
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
        `1. Если у Вас нет ни одной личной фотографии, добавьте обязательно. Другие посетители хотят видеть, с кем они общаются. 
        2. Максимально заполните свою анкету, расскажите о себе, Ваших планах и интересах. Не забывайте заполнять типаж, цели знакомства и сексуальную анкету. Будьте как можно больше честны при заполнении. Не стоит выдумывать себе нереальные образы с целью удивить всех. 
        3. Для того, чтобы привлечь посетителей в свою анкету, настоятельно рекомендуем воспользоваться такими услугами, как: Анкета дня, Поднять анкету (на первое место в результатах поиска), Напиши мне, Симпатии. 
        4. Не стесняйтесь, пишите другим пользователям, оставляйте комментарии к их фотографиям, голосуйте за фото! Станьте особенным - подключите VIP-статус! С полной уверенностью можем заявить, после всего этого Вы привлечете к себе большое внимание и скучать точно времени не будет!`,
        `1. If you don't have any personal photos, be sure to add them. Other visitors want to see who they are communicating with. 
        2. Fill out your questionnaire as much as possible, tell us about yourself, your plans and interests. Do not forget to fill in the type, dating goals and sexual questionnaire. Be as honest as possible when filling out. Do not invent unreal images for yourself in order to surprise everyone. 
        3. In order to attract visitors to your profile, we strongly recommend using such services as: Questionnaire of the day, Raise the questionnaire (to the first place in the search results), Write to me, Sympathy. 
        4. Do not hesitate to write to other users, leave comments on their photos, vote for the photo! Become special - connect VIP status! We can say with full confidence that after all this you will attract a lot of attention to yourself and there will definitely be no time to be bored!`,
        `1. Kişisel biriniz yoksa fotoğraflar, mutlaka ekleyin. Diğer ziyaretçiler kiminle olduklarını görmek istiyor görüşüyorlar. 
        2. Anketinizi olabildiğince doldurun, kendiniz hakkında konuşun, planlarınız ve ilgilerden. Türü doldurmayı unutmayın, randevu hedefleri ve cinsel anket. Mümkün olduğunca dürüst olun doldurma. Kendini uydurmamalısın herkesi şaşırtmak amacıyla gerçekçi olmayan görüntüler. 
        3. Ziyaretçileri çekmek için profilinize, şiddetle tavsiye ediyoruz aşağıdaki hizmetleri kullanmak için: Günün anketi, Anketi yükseltin (ilk önce arama sonuçlarında yer), Bana yaz, Sempatiler. 
        4. Başkalarına yazmaktan çekinmeyin kullanıcılara yorum bırakın Fotoğraflarına oy verin, fotoğraflara oy verin! Özel ol - bağlan VIP statüsü! Tam güvenle beyan edebiliriz, Bütün bunlardan sonra kendinize çekeceksiniz çok dikkat edin ve kesin olarak sıkılın zamanımız olmayacak!`,
        `1. Agar sizda bitta shaxsiy bo'lmasa rasmlar, ishonch hosil qiling. Boshqa mehmonlar kim bilan ekanliklarini ko'rishni xohlashadi aloqa. 
        2. Anketangizni iloji boricha to'ldiring, o'zingiz, rejalaringiz va qiziqishlar. Turni to'ldirishni unutmang, tanishuv maqsadlari va jinsiy anketa. Iloji boricha halol bo'ling to'ldirish. O'zingizni ixtiro qilmang barchani hayratda qoldirish uchun haqiqiy bo'lmagan tasvirlar. 
        3. Mehmonlarni jalb qilish uchun so'rovnomangizda tavsiya etiladi quyidagi xizmatlardan foydalaning: Kunning anketasi, anketani ko'taring (birinchisiga qidiruv natijalaridagi joy), menga yozing, Hamdardlik. 
        4. Ikkilanmang, boshqalarga yozing foydalanuvchilarga sharhlar qoldiring ularning fotosuratlariga, fotosuratga ovoz bering! Maxsus bo'ling-ulang VIP holati! To'liq ishonch bilan aytishimiz mumkin, bularning barchasidan keyin siz o'zingizni jalb qilasiz katta e'tibor va aniq zerikish vaqt bo'lmaydi!`
    )

    const mainText2 = getStringInCurrentLanguage(
        'Переписка хранится не менее 1 года, а комментарии без ограничения по времени. Но все пропадет, если анкета будет удалена Вами самостоятельно, или по причине Вашего отсутствия на сайте более 1 года, или заблокирована Модератором за нарушение Правил приложения и Пользовательского соглашения',
        "Correspondence is stored for at least 1 year, and comments are without time limit. But everything will be lost if the questionnaire is deleted by you yourself, or because of your absence from the site for more 1 year, or blocked by a Moderator for violating the Rules of the application and User Agreement.",
        "Yazışmalar en az 1 yıl saklanır ve zaman sınırı olmayan yorumlar. Ancak anket yapılırsa her şey kaybolacak Kendiniz veya yazılımınız tarafından silindi sitede bulunmamanızın nedeni daha fazladır 1 yaşında veya Moderatör tarafından engellendi Uygulama Kurallarını ihlal ettiğiniz için ve Kullanıcı sözleşmesi",
        "Yozishmalar kamida 1 yil saqlanadi va vaqt cheklovisiz sharhlar. Ammo anketa bo'lsa, hamma narsa yo'qoladi siz o'zingiz yoki dasturiy ta'minot bilan o'chirib tashladingiz saytda yo'qligingizning sababi ko'proq 1 yil yoki Moderator tomonidan bloklangan ilova qoidalarini buzganlik uchun va Foydalanuvchi shartnomasi."
    )

    const mainText3 = getStringInCurrentLanguage(
        'Все сообщения приложения отправляются мгновенно после того, как Вы подтвердили отправку и увидели свой текст на экране переписки. Обратите внимание, уведомляющая надпись (фон) хранится три недели. Если за это время сообщение осталось непрочитанным, надпись "не прочитано" исчезнет фон станет прежним, но само сообщение останется в переписке.',
        `All messages of the application are sent instantly after you have confirmed the sending and have seen your text on the correspondence screen. Please note that the notification label (background) is stored for three weeks. If the message remains unread during this time , the inscription "not read" will disappear, the background will become the same, but the message itself will remain in the correspondence.`,
        `Uygulamanın tüm mesajları gönderilir onayladıktan hemen sonra gönderme ve metninizi ekranda gördüm yazışmalar. Lütfen dikkat, bildirici yazıt (arka plan) üç hafta boyunca saklanır. Bu süre zarfında mesaj kalırsa okunmamış, "okunmamış" yazıtı arka plan kaybolacak, aynı olacak, ama kendisi olacak mesaj yazışmalarda kalacaktır.`,
        `Ilovaning barcha xabarlari yuboriladi tasdiqlaganingizdan so'ng darhol yuborish va ekrandagi matningizni ko'rish yozishmalar. Bildirishnomaga e'tibor bering yozuv (fon) uch hafta davomida saqlanadi. Agar bu vaqt ichida xabar qolsa o'qilmagan, "o'qilmagan"yozuvi fon yo'qoladi bir xil bo'ladi, lekin o'zi xabar yozishmalarda qoladi.`
    )

    const mainText4 = getStringInCurrentLanguage(
        'Spam - массовая вредоносная рассылка информации (сообщений), лицам, не выражавшим желания ее получать. К спаму относят коммерческую, политическую рекламу, рекламу Интернет-ресурсов; сообщения, в которых Вас просят отправить SMS на короткий номер или иные методы, цель которых заключается в выманивании Ваших денег; письма, в которых, Вас просят сообщить Ваши личные данные, телефоны, пароли и Т.П. В случае получения Вами подобной информации достаточно добавить анкету отправителя в игнор, а также в этой анкете нажать "Пожаловаться" и выбрать причину жалобы. После этого анкета попадет на принудительную проверку к Модераторам приложения',
        `Spam is a mass malicious mailing of information (messages) to persons who have not expressed a desire to receive it. Spam includes commercial, political advertising, advertising Internet resources; messages in which You are asked to send SMS to a short number or other methods, the purpose of which is to lure your money; letters in which you are asked to inform Your personal data, phone numbers, passwords, etc. If you receive such information, it is enough to add the sender's questionnaire to ignore, and also click "Complain" in this questionnaire and select the reason complaints. After that, the questionnaire will be submitted to the application Moderators for mandatory verification`,
        `Spam - toplu kötü amaçlı posta bilgi (mesajlar), kişiler, olmayanlar Onu almak istediklerini ifade edenlere. Spam, ticari olarak sınıflandırılır, siyasi reklam, reklam İnternet kaynakları; hangi mesajlar Sizden kısa bir SMS göndermeniz isteniyor amacı olan sayı veya diğer yöntemler paranızı çekmekle ilgilidir; Size bildirmeniz gereken mektuplar Kişisel bilgileriniz, telefonlarınız, şifreleriniz ve T.P. Eğer böyle bir şey alırsanız bilgi bir anket eklemek için yeterlidir göndereni görmezden gelmenin yanı sıra bu ankette de Şikayet Et'e tıklayın ve nedenini seçin şikayetler. Bundan sonra anket üzerine düşecek Moderatörlere zorla doğrulama uygulamalar.`,
        `Spam - ommaviy zararli pochta axborot (xabarlar), uni olish istagini bildirgan. Spamga tijorat kiradi, siyosiy reklama, reklama Internet-resurslar; quyidagi xabarlar Sizdan SMS yuborish so'raladi qisqa maqsadi bo'lgan raqam yoki boshqa usullar bu sizning pulingizni jalb qilishdan iborat; sizdan xabar berishni so'ragan xatlar Sizning shaxsiy ma'lumotlaringiz, telefonlaringiz, parollaringiz va T. P. Agar siz shunga o'xshash narsani olsangiz ma'lumot faqat anketani qo'shadi yuboruvchini e'tiborsiz qoldiring, shuningdek ushbu anketada "shikoyat qilish" tugmasini bosing va sababini tanlang shikoyatlar. Shundan so'ng, anketa tushadi moderatorlar uchun majburiy tekshirish ilovalar.`
    )

    const fewGuestsText = getStringInCurrentLanguage('Мало гостей, Вам никто не пишет, Вам скучно, что делать?', 'There are few guests, no one writes to you, you are bored, what to do?', 'Pek misafir yok, kimse size yazmıyor, size sıkıldım, ne yapmalıyım?', 'Mehmonlar kam, hech kim sizga SMS yozmaydi, sizga zerikarli, nima qilish kerak?')
    const howLongText = getStringInCurrentLanguage('Сколько времени хранится переписка и комментарии?', 'How long is correspondence and comments stored?', 'Yazışmalar ne kadar süre saklanır ve yorumlar?', "Yozishmalar qancha vaqt saqlanadi va sharhlar?")
    const notReadText = getStringInCurrentLanguage('Сообщение не прочитано', 'Message not read', 'Mesaj okunmadı', "Xabar o'qilmaydi")
    const spamText = getStringInCurrentLanguage('Что такое спам?', 'What is spam?', 'Spam nedir?', "Spam nima?")


    switch(stage) {
        case 0:
            return (
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
                    <View style={{ marginLeft: 25 }}>

                        <TouchableOpacity onPress={() => setStage(1)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{fewGuestsText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStage(2)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{howLongText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStage(3)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{notReadText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStage(4)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{spamText}</StyledText>
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
}
}

export default FCIScreen
