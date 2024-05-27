import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function CoinBalanceScreen({ navigation }: any) {
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
        'При положительном балансе монет у Вас появляется доступ к многочисленным дополнительным Сервисам, которые призваны сделать Ваше пребывание в приложении более интересным и продуктивным! Пополнив баланс, Вы сможете: приобрести VIP-статус, дарить подарки, поднимать свою анкету в результатах поиска, размещать свою анкету в "Анкете дня" и т.п. Пополнение баланса не является обязательным требованием. Вы можете общаться, оставлять комментарии, размещать фото абсолютно бесплатно, но мы искренне рекомендуем попробовать наши дополнительные услуги, для того чтобы Ваше времяпрепровождение в приложении стало еще более комфортным.',
        'With a positive balance of coins, you have access to numerous additional services that are designed to make your stay in the application more interesting and productive! Having replenished the balance, you will be able to: acquire VIP status, give gifts, raise your profile in search results, post your profile in the "Profile of the Day", etc. Replenishment of the balance is not a mandatory requirement. You can chat, leave comments, post photos absolutely for free, but we sincerely recommend that you try our additional services, in order to make your pastime in the application even more comfortable.',
        "Madeni paraların pozitif dengesiyle, sahip olduğunuz paralar çok sayıda kişiye erişim var ek Hizmetlere konaklamanızı sağlamak için tasarlandı uygulamada daha ilginç ve üretken! Dengeyi yenileyerek, Siz şunları yapabilirsiniz: VIP statüsü satın alın, verin hediyeler, profilinizi yükseltin arama sonuçlarınızı gönderin, kendinizinkini gönderin Günün Anketindeki anket vb. Bakiyenin yenilenmesi değil zorunlu bir gereklilik. Yapabilirsin sohbet et, yorum bırak, fotoğraf göndermek tamamen ücretsizdir, ancak içtenlikle denemenizi öneririz ek hizmetlerimiz için eğlenceniz için uygulamada daha da fazlası var rahat.",
        `Tangalarning ijobiy balansi bilan sizda ko'p sonli kirish paydo bo'ladi qo'shimcha xizmatlar sizning turar joyingizni yaratish uchun mo'ljallangan ilova yanada qiziqarli va samarali! Balansni to'ldirish orqali siz siz qila olasiz: VIP holatini sotib oling, bering sovg'alar, anketangizni ko'taring qidiruv natijalari, o'zingizni joylashtiring "kun anketasi" dagi anketa va boshqalar. Balansni to'ldirish emas majburiy talab. Siz qila olasiz muloqot qiling, sharhlar qoldiring, fotosuratlarni joylashtirish mutlaqo bepul, ammo biz chin dildan sinab ko'rishni tavsiya qilamiz bizning qo'shimcha xizmatlarimiz, uchun sizning o'yin-kulgingiz uchun ilovada yanada ko'proq narsa bor qulay.`
    )

    const mainText2 = getStringInCurrentLanguage(
        'Цена одной монеты зависит от способа пополнения баланса и от суммы заказа. При пополнении счета по SMS, обратите внимание на то, что чем дороже короткий номер, тем выгоднее покупать монеты! Самыми выгодными способами пополнения баланса монет являются пополнения банковскими картами Visa или MasterCard и системы платежей WebMoney. Если Вы не из России, с карты будет списываться сумма в Вашей местной валюте по курсу Вашего банка',
        "The price of one coin depends on the method of replenishment of the balance and the amount of the order ( if you replenish the questionnaire account by sending SMS from a mobile phone). When depositing via SMS, pay attention to the fact that the more expensive the short number, the more profitable it is to buy coins! The most profitable ways to replenish the balance of coins are deposits with Visa or MasterCard bank cards and payment systems WebMoney. If you are not from Russia, the amount in your local currency will be debited from the card at the rate of your bank",
        "Bir madalyonun fiyatı, yola göre değişir bakiyenin yenilenmesi ve sipariş tutarından (içinde) Anketin hesabını doldurmanız durumunda cep telefonundan SMS gönderme yöntemi ile telefonun). Hesabı SMS ile doldururken lütfen ödeme yapın kısa olanın ne kadar pahalı olduğuna dikkat edin sayı, paraları satın almak daha karlı! En karlı yollar şarj paraları şunlardır Visa banka kartlarıyla ikmal veya MasterCard ve ödeme sistemleri WebMoney. Eğer Rusya'dan değilseniz, haritadan çıkacaksınız Yerel tutarınızdan tahsil edilecek tutar Bankanızın oranına göre para birimi",
        "Bitta tanga narxi usulga bog'liq balansni to ' ldirish va buyurtma summasidan (v agar siz anketani to'ldirsangiz mobil telefondan SMS yuborish usuli telefon). SMS orqali hisobni to'ldirishda quyidagilarni e'tiborga oling qisqa qanchalik qimmat bo'lsa, e'tibor bering raqam, tangalarni sotib olish qanchalik foydali bo'lsa! Eng foydali usullar tangalar balansini to'ldirish Visa bank kartalari bilan to'ldirish yoki MasterCard va to'lov tizimlari WebMoney. Agar siz Rossiyadan bo'lmasangiz, u kartadan chiqadi mahalliy hisob-kitob miqdori bankingiz kursi bo'yicha valyuta"
    )

    const whyText = getStringInCurrentLanguage('Зачем пополнять баланс анкеты?', 'Why replenish the balance of the questionnaire?', 'Madeni paraların dengesini yenilemek', "Nima uchun anketa balansini to'ldirish kerak?")
    const howMuchText = getStringInCurrentLanguage('Сколько стоит одна монета ?', 'How much does one coin cost ?', 'Neden anketin bakiyesini dolduruyorsunuz?', "Bitta tanga qancha turadi ?")

   

    switch(stage) {
        case 0:
            return (
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
                    <View style={{ marginLeft: 25 }}>
        
                        <TouchableOpacity onPress={() => setStage(1)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{whyText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>
        
                        <TouchableOpacity onPress={() => setStage(2)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{howMuchText}</StyledText>
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

export default CoinBalanceScreen
