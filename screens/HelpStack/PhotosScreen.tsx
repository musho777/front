import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function PhotosScreen({ navigation }: any) {
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

    const mainText1 = getStringInCurrentLanguage(`  Если в анкете размещены личные фотографии, то количество гостей Вашей анкеты повышается в 10-15 раз! Настоятельно рекомендуем загрузить свои фотографии. Удачное фото дополнительно повысит шансы на успех в более короткие сроки встретить свою половинку! Ведь каждый из нас при выборе собеседника обращает внимание в первую очередь на наличие фото. Ваши фотографии будут оценивать и комментировать, также Вы сможете пользоваться многочисленными сервисами Мяты, которые помогут Вам обрести много новых знакомых и друзей. Скучать и грустить Вам точно не придется!`,
            `   If personal photos are placed in the questionnaire, then the number of guests of your questionnaire increases 10-15 times! We strongly recommend uploading your photos. A successful photo will further increase the chances of success in a shorter time to meet your soulmate! After all, each of us, when choosing an interlocutor , pays attention first of all to the presence of a photo. Your photos will be evaluated and commented on, and you will also be able to use numerous Mint services that will help you find many new acquaintances and friends. You will definitely not be bored and sad!`,
            `Ankette kişisel olanlar varsa fotoğraflar, sonra misafirlerinizin sayısı anketler 10-15 kat artırıldı! Sizinkileri indirmenizi şiddetle tavsiye ederiz fotoğraflar. Başarılı fotoğraf isteğe bağlı Başarı şansınızı daha kısa sürede artıracaktır ruh eşinizle tanışmak için zaman çizelgesi! Ki her birimiz bir muhatap seçerken öncelikle dikkat çekiyor fotoğrafın varlığı. Fotoğraflarınız değerlendirilecek ve Ayrıca yorum yapabilirsiniz çok sayıda kişinin tadını çıkarın Size yardımcı olacak nane servisleriyle yeni tanıdıklar ve arkadaşlar edinmek için. Sıkılmak ve üzülmek zorunda kalmayacaksınız!`,
            `Agar shaxsiy anketa joylashtirilgan bo'lsa rasmlar, keyin sizning mehmonlaringiz soni anketalar 10-15 marta ko'tariladi! O'zingizni yuklab olishingizni tavsiya qilamiz rasmlar. Muvaffaqiyatli fotosurat ixtiyoriy qisqa vaqt ichida muvaffaqiyat qozonish imkoniyatini oshiradi sizning turmush o'rtog'ingiz bilan uchrashish vaqti keldi! Axir, suhbatdoshni tanlashda har birimiz birinchi navbatda e'tibor beradi fotosuratning mavjudligi. Sizning rasmlaringiz baholanadi va shuningdek, sharh berishingiz mumkin ko'plardan foydalaning sizga yordam beradigan Yalpiz xizmatlari ko'plab yangi tanishlar va do'stlar orttiring. Siz zerikishingiz va xafa bo'lishingiz shart emas!`)

            const mainText2 = getStringInCurrentLanguage(`Фото с памяти устройства:
            1. Из главного меню нажмите на свое имя (ник) или иконку фотографии в левом верхнем углу - перейдите к редактированию профиля.
            2. Нажмите на иконку фотографии (добавить)
            3. Ознакомьтесь с правилами добавления фото.
            4. Нажмите Выбрать фото и разрешите приложению доступ к файлам Вашего устройства.
            5. Выберите на своем устройстве фото, на котором хорошо видно Ваше лицо, подтвердите кнопкой Загрузить фото.
            6. После успешной загрузки личного фото, перейдите к его обработке: выберите область показа, поверните, если это требуется, добавьте краткое описание к снимку (не обязательно), нажмите Далее.
            7. Фото загружено в папку Личные и появится в Вашей анкете после удачной проверки модераторами приложения. Проверить состояние своих фото Вы можете, нажав на кнопку Фотографии под статусом своей анкеты. Здесь Вы можете запретить комментирование фотографии, повернуть снимок или удалить фото.`,
            `Photos from the device's memory:
            1. From the main menu, click on your  name (nickname) or the photo icon in the upper left corner - go to edit your profile.
            2. Click on the photo icon (add)
            3. Read the rules for adding photos.
            4. Click Select Photo and allow the app to access your device's files.
            5. Select a photo on your device that clearly shows your face, confirm with the Upload Photo button.
            6. After successfully uploading a personal photo, proceed to its processing: select the display area, rotate if it is if required, add a short description to the snapshot (optional), click Next.
            7. The photo has been uploaded to the Personal folder and will appear in your profile after successful verification by the moderators of the application. You can check the status of your photos by clicking on the Photos button under the status of your profile. Here you can prohibit commenting on a photo, rotate a snapshot, or delete a photo.`,
            `Cihaz belleğindeki fotoğraf:
            1. Ana menüden kendinizinkine tıklayın fotoğrafın adı (takma adı) veya simgesi sol üst köşede - gidin profili düzenlerken.
            2. Fotoğraf simgesine tıklayın (eklemek)
            3. Ekleme kurallarını okuyun foto.
            4. Fotoğraf Seç'e tıklayın ve izin Ver'e tıklayın Uygulamanızın dosyalarına erişme cihazlar.
            5. Cihazınızdan bir fotoğraf seçin, üzerinde yüzünüzü açıkça görebileceğiniz bir yer, Fotoğrafı Yükle düğmesini onaylayın.
            6. Kişisel fotoğrafı başarıyla yükledikten sonra, işleme gidin: seçin ekran alanı, eğer varsa döndürün gerekli, kısa bir açıklama ekleyin fotoğrafı çekin (gerekli değil), İleri'yi tıklayın.
            7. Fotoğraf Kişisel klasörüne yüklendi ve başarılı olduktan sonra profilinizde görünecektir Uygulamanın moderatörleri tarafından yapılan kontroller. Fotoğraflarınızın durumunu kontrol edin aşağıdaki Fotoğraf düğmesine tıklayarak yapabilirsiniz profilimin statüsüyle. Burada yapabilirsiniz fotoğrafa yorum yapmayı engelle, fotoğrafı döndürün veya fotoğrafı silin.`,
            `Qurilma xotirasidan olingan fotosuratlar:
            1. Asosiy menyudan o'zingiznikiga teging ism (taxallus) yoki rasm belgisi yuqori chap-ga o'ting profilni tahrirlash.
            2. Rasm belgisini bosing (qo'shish)
            3. Qo'shish qoidalarini tekshiring rasm.
            4. Bosing rasmni tanlang va ruxsat bering ilova fayllaringizga kirish qurilmalar.
            5. Qurilmangizdagi rasmni tanlang, bu sizning yuzingizni aniq ko'rsatadi, fotosuratni yuklash tugmasi bilan tasdiqlang.
            6. Shaxsiy fotosuratni muvaffaqiyatli yuklaganingizdan so'ng, uni qayta ishlashga o'ting: tanlang ko'rsatish maydoni, agar shunday bo'lsa, aylantiring talab qilinadi, ga qisqacha tavsif qo'shing rasm (kerak emas), keyingiga bosing.
            7. Surat shaxsiy papkaga Yuklangan va muvaffaqiyatli bo'lganidan keyin sizning anketangizda paydo bo'ladi dastur moderatorlari tomonidan tekshiruvlar. Fotosuratlaringizning holatini tekshiring quyidagi fotosurat tugmachasini bosish orqali mumkin uning profilining holati. Bu erda siz fotosuratga izoh berishni taqiqlash, suratni aylantiring yoki fotosuratni olib tashlang.`)

            const mainText3 = getStringInCurrentLanguage(`  Из главного меню перейдите в Вашу анкету. Перейдите к списку своих фотографий в основном альбоме. Вызовите дополнительное меню действий с фотографией (правый верхний угол) Здесь Вы можете Сделать главной, Запретить комментировать, Удалить или Повернуть фото.`,
            `From the main menu, go to your the questionnaire. Go to the list of your photos in the main album. Open an additional menu of actions with a photo (upper right corner) Here you can make the main, Prohibit commenting, Delete, or Rotate the photo.`,
            `Ana menüden sizinkine gidin anketi. Kendi listenize gidin Ana albümdeki fotoğraflar. Ek eylemler menüsünü çağırın fotoğraflı (sağ üst köşe) Burada ana olanı yapabilirsiniz, Yorum yapmayı, Silmeyi veya Kaldırmayı yasakla Fotoğrafı döndürün.`,
            `Asosiy menyudan o'zingiznikiga o'ting anketa. O'zingizning ro'yxatingizga o'ting asosiy albomdagi fotosuratlar. Qo'shimcha harakatlar menyusini chaqiring fotosurat bilan (yuqori o'ng burchak) Bu erda siz asosiy narsani qilishingiz mumkin, Izoh berish, o'chirish yoki rad etish Suratni aylantiring.`)

        const mainText4 = getStringInCurrentLanguage(`
            Фотография может не выводится по двум причинам:
            1. Фотография отправлена на принудительное модерирование и модератор еще не успел проверить вашу фотографию на предмет соответствия правилам приложения.
            2. Ваша фотография была заблокирована модератором за нарушение правил добавления фотографий`,
            `The photo may not be displayed for two
            reasons:
            1. The photo has been sent for forced moderation and the moderator has not yet had time to check your photo for compliance with the rules of the application.
            2. Your photo was blocked by the moderator for violating the rules for adding photos`,
            `Fotoğraf her ikisinde de görüntülenmeyebilir nedenlere:
            1. Fotoğraf gönderildi zorla denetleme ve moderatör henüz sizinkini kontrol etmek için zamana sahip değil uygunluk için fotoğraf Uygulamanın kurallarına göre.
            2. Fotoğrafınız engellendi kuralları ihlal ettiği için moderatör olarak fotoğraf ekleme`,
            `Fotosurat ikkitadan ko'rsatilmasligi mumkin sabablari:
            1. Fotosurat yuborilgan majburiy moderatsiya va moderator hali sizni tekshirishga ulgurmagan muvofiqlik uchun fotosurat ilova qoidalari.
            2. Sizning suratingiz bloklangan qoidalarni buzganlik uchun moderator rasmlar qo'shish`)

            const mainText5 = getStringInCurrentLanguage(`
            Модерация проводится 24 часа в сутки и обычно проходит в среднем в течение 1-10 минут.`,
            `Moderation is carried out 24 hours a day and usually takes place on average within 1-10 minutes.`,
            `Moderasyon günde 24 saat yapılır ve genellikle ortalama olarak 1-10 arasında geçer dakikaların.`,
            `Moderatsiya kuniga 24 soat va odatda o'rtacha 1 dan 10 daqiqagacha davom etadi.`)

    const whyText = getStringInCurrentLanguage('Зачем размещать в анкете личные фотографии?', 'Why post personal photos in the questionnaire?', 'Neden ankete kişisel olanları koymalısınız fotoğraflar mı?', "Nima uchun shaxsiy anketani joylashtirish kerak rasmlar?")
    const howToAddText = getStringInCurrentLanguage('Как добавить фотографию?', 'How do I add a photo?', 'Fotoğraf nasıl eklenir?', "Fotosuratni qanday qo'shish kerak?")
    const howToChooseText = getStringInCurrentLanguage('Как выбрать фотографию, которая будет выводиться на главной странице моей  анкеты?', 'How do I choose a photo that will be displayed on the main page of my profile?', 'Bir fotoğrafı nasıl seçerim ana sayfada görüntülenecektir anketimi mi?', "Qaysi fotosuratni qanday tanlash kerak asosiy sahifada ko'rsatiladi mening anketam?")
    const whyNotDisplayedText = getStringInCurrentLanguage('Почему моя только что загруженная фотография не выводится в Моих фотографиях?', 'How do I choose a photo that will be displayed on the main page of my profile?', 'Neden benimki yeni indirildi fotoğraf benimkinde görüntülenmiyor fotoğraflar mı?', "Nima uchun mening yangi yuklanganim fotosurat mening rasmimda ko'rinmaydi rasmlar?")
    const howModerationText = getStringInCurrentLanguage('Как проходит модерация фотографий?', 'How is photo moderation going?', 'Fotoğrafların moderasyonu nasıl gidiyor?', "Fotosuratlar moderatsiyasi qanday amalga oshiriladi?")

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
                            <StyledText style={{ fontSize: 16 }}>{howToAddText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStage(3)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{howToChooseText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStage(4)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{whyNotDisplayedText}</StyledText>
                            <View style={{ marginRight: 25 }}>
                                { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStage(5)} style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledText style={{ fontSize: 16 }}>{howModerationText}</StyledText>
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
                        <View style={{ width: 360, flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText1}</StyledText>
                        </View>
                    </View>
                )
        case 2: 
            
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: 400, flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText2}</StyledText>
                        </View>
                    </View>
                )
        case 3: 
            
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: 360, flexWrap: 'nowrap' }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText3}</StyledText>
                        </View>
                    </View>
                )

        case 4: 
            
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: 360, flexWrap: 'nowrap', marginRight: 10 }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText4}</StyledText>
                        </View>
                    </View>
                )

        case 5: 
           
                return (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1, alignItems: 'center' }}>
                        <View style={{ width: 360, flexWrap: 'nowrap', marginRight: 10 }}>
                            <StyledText style={{ textAlign: 'center', fontSize: 14.5 }}>{`\t` + mainText5}</StyledText>
                        </View>
                    </View>
                )
    }
}

export default PhotosScreen
