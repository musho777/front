import { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, TextInput, Text, ScrollView, Platform  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StyledButton from '../../components/StyledButton';
import { View } from '../../components/Themed';
import StyledText from '../../components/Typography/StyledText';
import useAuth from '../../hooks/useAuth';
import CameraIcon from './../../assets/images/camera.svg'
import { setAge, setAlcohol, setAvatar, setBadHabits, setChildren, setCity, setDrugs, setEastYear, setEducation, setFamilyStatus, setGambling, setInfo, setLanguages, setMoneyCondition, setOrientation, setOwnAparts, setOwnCar, setPhone, setPointOfDate, setReligion, setSex, setSmoking, setTypeOfAppearance, setZodiac } from '../../store/ducks/auth/actionCreators';
import Chip from '../../components/Chip';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import mime from "mime";
import { ApiRequests, URL } from '../../service/api/api';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { getToken } from '../../service/asyncStorage';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

export default function ChangeProfileScreen({ navigation }: any) {
    const [ isAdding, setIsAdding ] = useState<boolean>(false)
    const [ isFamilyStatusOpen, setIsFamilyStatusOpen ] = useState<boolean>(false)
    const [ isChildrenOpen, setIsChildrenOpen ] = useState<boolean>(false)
    const [ isEducationOpen, setIsEducationOpen ] = useState<boolean>(false)
    const [ isReligionOpen, setIsReligionOpen ] = useState<boolean>(false)
    const [ isTypeOfAppearanceOpen, setIsTypeOfAppearanceOpen ] = useState<boolean>(false)
    const [ isZodiacOpen, setIsZodiacOpen ] = useState<boolean>(false)
    const [ isEastYearOpen, setIsEastYearOpen ] = useState<boolean>(false)
    const [ newPointOfDate, setNewPointOfDate ] = useState<string>('')
    const [photo, setPhoto] = useState(null);

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.canceled) {
            setPhoto(result.assets[0])
          } else {
            alert('You did not select any image.');
          }
    }
    const handleUpdateUser = async () => {
        const access_token = await getToken()
        if (photo) {

            const newImageUri = photo.uri ? "file:///" + photo.uri.split("file:/").join("") : ''
            const data = new FormData();
            data.append('file', {
                uri : newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
               });
            //    console.log(userCopy)
        console.log(photo)
        console.log(data)
    
            axios({
                url: URL + '/users/uploadAvatar',
                method: 'POST',
                data: data,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                  "Authorization" : 'Bearer ' + access_token
                },
              })
                .then(function (response) {
                    const userCopy = { ...user }
                    dispatch(setAvatar(response.data.avatar))
                    delete userCopy.city
                    delete userCopy.password
                    delete userCopy.avatar
                    delete userCopy.email
                    ApiRequests.updateUser(access_token, userCopy).then(d => navigation.goBack()).catch(e => console.error(e))
           
                })
                .catch(function (response) {
                  console.error(response);
                });
        } else {
            const userCopy = { ...user }
            delete userCopy.city
            delete userCopy.password
            delete userCopy.email
            console.log(userCopy)
            ApiRequests.updateUser(access_token, userCopy).then(d => navigation.goBack()).catch(e => console.error(e))
        }

    };
    const { user } = useAuth()
    const dispatch = useDispatch()

    const theme = useSelector(getCurrentTheme)

    const cityText = getStringInCurrentLanguage('Город', 'City', 'Şehir', 'Shahar')
    const phoneText = getStringInCurrentLanguage('Телефон', 'Phone', 'Telefon', 'Telefon')
    const inphoText = getStringInCurrentLanguage('Инфо', 'Info', 'Hakkında', 'Ma’lumot')
    const ageText = getStringInCurrentLanguage('Возраст', 'Age', 'Yaş', 'Yosh')
    const sexText = getStringInCurrentLanguage('Пол', 'Sex', 'Cinsiyet', 'Jins')

    const manText = getStringInCurrentLanguage('Мужской', 'Man', 'Adam', 'Kishi')
    const womanText = getStringInCurrentLanguage('Женский', 'Woman', 'Kadın', 'Ayol')

    const pointOfDateText = getStringInCurrentLanguage('Цель знакомства', 'Point of date', 'Tanışma amacı', 'Tanishuv maqsadi')

    const addText = getStringInCurrentLanguage('Добавить', 'Add', 'Eklemek', `Qo'shish`)
    const yesText = getStringInCurrentLanguage('Да', "Yes", 'Var', 'Bor')
    const noText = getStringInCurrentLanguage('Нет', "No", 'Değil', `Yo'q`)

    const familyStatusText = getStringInCurrentLanguage('Семейное положение', 'Family status', 'Aile durumu', 'Oilaviy holat')
    const childrenText = getStringInCurrentLanguage('Дети', 'Children', 'Cocuklar', 'Olalar')
    
    const heightText = getStringInCurrentLanguage('Рост', "Height", 'Yükseklik', 'Balandligi')
    const weightText = getStringInCurrentLanguage('Вес', "Weight", 'Ağırlık', "Og'irligi")

    const ownApartsText = getStringInCurrentLanguage('Своё жилье', "Own housing", 'Kendi konutunuz', "O'zingizning uy-joyingiz")
    const ownCarText = getStringInCurrentLanguage('Своя машина', "Own car", 'Araba sahibi', "O'z mashinasi")
    const badHabitsText = getStringInCurrentLanguage('Плохие привычки', "Bad habits", 'Kötü alışkanlıklar', "Yomon odatlar")
    const moneyConditionText = getStringInCurrentLanguage('Денежное состояние', "Money condition", 'Para durumu', "Pul holati")
    const educationText = getStringInCurrentLanguage('Образование', "Education", 'Eğitim', "Ta'lim")
    const orientationText = getStringInCurrentLanguage('Ориентация', "Orientation", 'Oryantasyon', "Orientatsiya")

    const prosperousText = getStringInCurrentLanguage('Обеспеченный', 'Prosperous', 'Zengin', "Farovon")
    const nonProsperousText = getStringInCurrentLanguage('Необеспеченный', 'Not rosperous', 'Müreffeh değil', "Farovon emas")
    const traditionalText = getStringInCurrentLanguage('Традиционная', 'Traditional', 'Geleneksel', "An'anaviy")
    const nonTraditionalText = getStringInCurrentLanguage('Нетрадиционная', 'Unconventional', 'Alışılmadık', "Noan'anaviy")
    const typeOfAppearanceText = getStringInCurrentLanguage('Тип внешности', 'Type of appearance', 'Görünüm tipi', "Tashqi ko'rinish turi")
    const religionText = getStringInCurrentLanguage('Религия', 'Religion', 'Din', "Din")
    const zodiacText = getStringInCurrentLanguage('Знак зодиака', 'Zodiac sign', 'Burç', "Zodiak belgisi")
    const eastYearText = getStringInCurrentLanguage('Год по восточному календарю', 'Eastern calendar year', 'Doğu takvim yılı', "Sharqiy kalendar yili")
    const languagesText = getStringInCurrentLanguage('Знание языков', 'Language skills', 'Dil becerileri', "Tillarni bilishi")

    const smokingText = getStringInCurrentLanguage('Курение', 'Smoking', 'Sigara içmek', 'Chekish')
    const alcoholText = getStringInCurrentLanguage('Употребление алкоголя', 'Alcohol', 'Alkol tüketimi', "Spirtli ichimliklarni iste'mol qilish")
    const drugsText = getStringInCurrentLanguage('Употребление запрещенных веществ', 'Drugs', 'Yasaklanmış maddelerin kullanımı', 'Taqiqlangan moddalardan foydalanish')
    const gamblingText = getStringInCurrentLanguage('Азартные игры', 'Gambling', 'Kumar', 'Qimor')

    const familyStatuses = [
        getStringInCurrentLanguage('Холост', 'Single', "Bekar", "Yagona"),
        getStringInCurrentLanguage('В браке', 'Married', "Evli", "Uylangan"),
        getStringInCurrentLanguage('Встречаюсь', 'Dating', "Flört", "Tanishuv"),
        getStringInCurrentLanguage('В гражданском браке', 'In a civil marriage', "Resmi nikahta", "Fuqarolik nikohida"),
        getStringInCurrentLanguage('', "", "", "")
    ]

    const childrenStatuses = [
        getStringInCurrentLanguage('Нет', 'No', "Hayir", "Yo'q"),
        getStringInCurrentLanguage('Нет, но хотелось бы', 'No, but I would like', "Hayır ama isterim", "Yo'q, lekin men xohlayman"),
        getStringInCurrentLanguage('Есть, живем вместе', 'Yes, we live together', "Уvet beraber yaşıyoruz", "Ha, biz birga yashaymiz"),
        getStringInCurrentLanguage('Есть, живем раздельно', 'Yes, we live apart', "Уvet ayrı yaşıyoruz", "Ha, biz alohida yashaymiz"),
        getStringInCurrentLanguage('Взрослые дети', 'Adult children', "Yetişkin çocuklar", "Katta yoshli bolalar"),
        getStringInCurrentLanguage('', "", "", "")
    ]

    const educationStatuses = [
        getStringInCurrentLanguage('Среднее образование', 'Secondary education', "Orta öğretim", "O'rta ma'lumot"),
        getStringInCurrentLanguage('Средне-техническое образование', 'Secondary technical education', "Orta teknik eğitim", "O'rta texnik ta'lim"),
        getStringInCurrentLanguage('Высшее образование', 'Higher education', "Yüksek öğretim", "Oliy ma'lumot"),
        getStringInCurrentLanguage('Ученая степень', 'Academic degree', "Akademik derece", "Ilmiy daraja"),
        getStringInCurrentLanguage('Младший специалист', 'Junior Specialist', "Kıdemsiz Uzman", "Kichik mutaxassis"),
        getStringInCurrentLanguage('Бакалавр', 'Bachelor', "Üniversite mezunu", "Üniversite mezunu"),
        getStringInCurrentLanguage('Магистр', 'Higher education', "Yüksek öğretim", "Oliy ma'lumot"),
        getStringInCurrentLanguage('Степень магистра', `Master's degree`, "Yüksek lisans", "Magistr diplomi"),
        getStringInCurrentLanguage('Специалист', 'Specialist', "Uzman", "Mutaxassis"),
        getStringInCurrentLanguage('Неполное', 'Incomplete', "Eksik", "To'liqsiz"),
        getStringInCurrentLanguage('', "", "", "")
    ]

    const typesOfAppearance = [
        getStringInCurrentLanguage('Американский индеец', 'American indian', "kızılderili", "amerikalik hind"),
        getStringInCurrentLanguage('Арабская', 'Arabic', "Arapça", "Arabcha"),
        getStringInCurrentLanguage('Азиатская', 'Asian', "Asya", "Osiyolik"),
        getStringInCurrentLanguage('Афроамериканец', 'African American', "Afrikan Amerikan", "Afro-amerikalik"),
        getStringInCurrentLanguage('Индийская', 'Indian', "Hintli", "Hind"),
        getStringInCurrentLanguage('Коренной гавайец', 'Native Hawaiian', "yerli Hawaii", "Mahalliy Gavayi"),
        getStringInCurrentLanguage('Европейская', 'European', "Avrupalı", "Нevropalik"),
        getStringInCurrentLanguage('Кавказская', 'Caucasian', "Kafkas", "Лavkaz"),
        getStringInCurrentLanguage('Другое', 'Other', "Diğer", "Boshqa"),
        getStringInCurrentLanguage('', "", "", "")
    ]

    const religions = [
        getStringInCurrentLanguage('Христианство', 'Christianity', "Hıristiyanlık", "Xristianlik"),
        getStringInCurrentLanguage('Ислам', 'Islam', "İslâm", "Islom"),
        getStringInCurrentLanguage('Иудаизм', 'Judaism', "Yahudilik", "Yahudiylik"),
        getStringInCurrentLanguage('Буддизм', 'Buddhism', "Budizm", "Buddizm"),
        getStringInCurrentLanguage('Язычество', 'Paganism', "putperestlik", "Butparastlik"),
        getStringInCurrentLanguage('Атеизм', 'Atheism', "ateizm", "Ateizm"),
        getStringInCurrentLanguage('', "", "", "")
    ]

    const zodiacs = [
        getStringInCurrentLanguage('Овен', 'Aries', "Koç burcu", "Qo'y"),
        getStringInCurrentLanguage('Телец', 'Taurus', "Boğa burcu", "Toros"),
        getStringInCurrentLanguage('Близнецы', 'Twins', "ikizler", "Egizaklar"),
        getStringInCurrentLanguage('Рак', 'Cancer', "Kanser", "Saraton"),
        getStringInCurrentLanguage('Лев', 'Lion', "bir aslan", "sher"),
        getStringInCurrentLanguage('Дева', 'Virgo', "Başak", "Bokira"),
        getStringInCurrentLanguage('Весы', 'Libra', "Terazi", "Tarozilar"),
        getStringInCurrentLanguage('Скорпион', 'Scorpio', "Akrep", "Chayon"),
        getStringInCurrentLanguage('Стрелец', 'Sagittarius', "yay Burcu", "Sagittarius"),
        getStringInCurrentLanguage('Козерог', 'Capricorn', "Oğlak", "Uloq"),
        getStringInCurrentLanguage('Водолей', 'Aquarius', "Kova", "Kova"),
        getStringInCurrentLanguage('Рыбы', 'Pisces', "Balık", "Baliq"),
        getStringInCurrentLanguage('', "", "", "")
    ]

    const eastYears = [
        getStringInCurrentLanguage('Обезьяна', 'Monkey', "Maymun", "Maymun"),
        getStringInCurrentLanguage('Петух', 'Cock', "Horoz", "Xo'roz"),
        getStringInCurrentLanguage('Собака', 'Dog', "Köpek", "It"),
        getStringInCurrentLanguage('Свинья', 'Pig', "Domuz", "Cho'chqa"),
        getStringInCurrentLanguage('Крыса', 'Rat', "Fare", "Kalamush"),
        getStringInCurrentLanguage('Бык', 'Bull', "Boğa", "Buqa"),
        getStringInCurrentLanguage('Тигр', 'Tiger', "Kaplan", "Yo'lbars"),
        getStringInCurrentLanguage('Кролик', 'Rabbit', "Tavşan", "Quyon"),
        getStringInCurrentLanguage('Дракон', 'Dragon', "Ejderha", "Ajdaho"),
        getStringInCurrentLanguage('Змея', 'Snake', "Yılan", "Ilon"),
        getStringInCurrentLanguage('Лошадь', 'Horse', "Atış", "Ot"),
        getStringInCurrentLanguage('Овца', 'Sheep', "Koyun", "Koyun"),
        getStringInCurrentLanguage('', "", "", "")
    ]


  return (
    <View style={{...styles.container, ...{backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}}>
        <View style={{...{ borderRadius: 50, display: 'flex', alignItems: 'center' }, ...{backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}}>
            <Image source = {{uri: photo ? photo.uri : `${URL}/auth/pictures/${user.avatar}`}}
                style = {{ width: 130, height: 130, borderRadius: 100, marginTop: 30 }}
            />
            <TouchableOpacity onPress={handleChoosePhoto} activeOpacity={0.8} style={styles.cameraButton}><CameraIcon /></TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.infoContainer}>
            <View>
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                    <StyledText style={styles.infoTitle}>{cityText}</StyledText>
                    <TextInput value={user.city} onChangeText={t => dispatch(setCity(t))} style={{...styles.input, color: theme === Themes.DARK ? '#ffffff' : 'black'}} />
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                    <StyledText style={styles.infoTitle}>{phoneText}</StyledText>
                    <TextInput value={user.phone} onChangeText={t => dispatch(setPhone(t))} style={{...styles.input, color: theme === Themes.DARK ? '#ffffff' : 'black'}} />
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                    <StyledText style={styles.infoTitle}>{inphoText}</StyledText>
                    <TextInput value={user.info} onChangeText={t => dispatch(setInfo(t))} style={{...styles.input, color: theme === Themes.DARK ? '#ffffff' : 'black'}} />
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                    <StyledText style={styles.infoTitle}>{ageText}</StyledText>
                    <TextInput value={user.age.toString()} onChangeText={t => dispatch(setAge(parseInt(t)))} style={{...styles.input, color: theme === Themes.DARK ? '#ffffff' : 'black'}} />
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                    <StyledText style={styles.infoTitle}>{sexText}</StyledText>
                    <View style={{ marginTop: 10 }}>
                        {user.sex ? <View style={{ display: 'flex', flexDirection: 'row' }}><Chip style={{ width: 100 }}>{manText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setSex(false))} style={{ width: 100 }}>{womanText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setSex(true))} style={{ width: 100 }}>{manText}</Chip><Chip style={{ width: 100 }}>{womanText}</Chip></View>}
                    </View>
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                    <StyledText style={styles.infoTitle}>{pointOfDateText}</StyledText>   
                    <View style={{ backgroundColor: '#E9EBF1', marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        { user.pointOfDate ? user.pointOfDate.map(p => <Chip onPress={() => {
                            const newPointOfDateArr = [...user.pointOfDate]
                            newPointOfDateArr.splice(newPointOfDateArr.indexOf(p), 1)
                            dispatch(setPointOfDate(newPointOfDateArr))
                        }} style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip>) : '' }
                        { isAdding ? <Chip value={newPointOfDate} onChangeText={t => setNewPointOfDate(t)} input style={{ width: 98, marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}></Chip> : <></>}
                        <Chip onPress={() => {
                            navigation.push('SelectPointOfDate', { pointOfDate: user.pointOfDate })
                        }} backgroundColor="#EF367280" style={{ width: 98, marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{addText}</Chip>
                    </View>
                </View>
                
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                    <StyledText style={styles.infoTitle}>{familyStatusText}</StyledText>
                    <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                        <TouchableOpacity onPress={() => setIsFamilyStatusOpen(true)}>
                            <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{user.familyStatus}</StyledText>
                        </TouchableOpacity>
                        { isFamilyStatusOpen && familyStatuses.filter(f => f !== user.familyStatus).map(f => <TouchableOpacity onPress={() => {
                            dispatch(setFamilyStatus(f))
                            setIsFamilyStatusOpen(false)
                        }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                    </View>
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                    <StyledText style={styles.infoTitle}>{childrenText}</StyledText>
                    <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                        <TouchableOpacity onPress={() => setIsChildrenOpen(true)}>
                            <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{user.children}</StyledText>
                        </TouchableOpacity>
                        { isChildrenOpen && childrenStatuses.filter(f => f !== user.children).map(f => <TouchableOpacity onPress={() => {
                            dispatch(setChildren(f))
                            setIsChildrenOpen(false)
                        }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                    </View>
                </View>

                {
                    user.vip 
                    
                    && 
                    
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{ownApartsText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {user.ownAparts ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setOwnAparts(false))} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setOwnAparts(true))} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{ownCarText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {user.ownCar ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setOwnCar(false))} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setOwnCar(true))} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            {/* <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{badHabitsText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {user.badHabits ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setBadHabits(false))} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setBadHabits(true))} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View> */}

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{smokingText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {user.smoking ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setSmoking(false))} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setSmoking(true))} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{alcoholText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {user.alcohol ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setAlcohol(false))} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setAlcohol(true))} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{drugsText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {user.drugs ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setDrugs(false))} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setDrugs(true))} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{gamblingText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {user.gambling ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setGambling(false))} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setGambling(true))} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{moneyConditionText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {user.moneyCondition ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 150 }}>{prosperousText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setMoneyCondition(false))} style={{ width: 150 }}>{nonProsperousText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setMoneyCondition(true))} style={{ width: 150 }}>{prosperousText}</Chip><Chip style={{ width: 150 }}>{nonProsperousText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{orientationText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {user.orientation ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 150 }}>{traditionalText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setOrientation(false))} style={{ width: 150 }}>{nonTraditionalText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setOrientation(true))} style={{ width: 150 }}>{traditionalText}</Chip><Chip style={{ width: 150 }}>{nonTraditionalText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{educationText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsEducationOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{user.education}</StyledText>
                                    </TouchableOpacity>
                                    { isEducationOpen && educationStatuses.filter(f => f !== user.education).map(f => <TouchableOpacity onPress={() => {
                                        dispatch(setEducation(f))
                                        setIsEducationOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{typeOfAppearanceText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsTypeOfAppearanceOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{user.typeOfAppearance}</StyledText>
                                    </TouchableOpacity>
                                    { isTypeOfAppearanceOpen && typesOfAppearance.filter(f => f !== user.typeOfAppearance).map(f => <TouchableOpacity onPress={() => {
                                        dispatch(setTypeOfAppearance(f))
                                        setIsTypeOfAppearanceOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{religionText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsReligionOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{user.religion}</StyledText>
                                    </TouchableOpacity>
                                    { isReligionOpen && religions.filter(f => f !== user.religion).map(f => <TouchableOpacity onPress={() => {
                                        dispatch(setReligion(f))
                                        setIsReligionOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{zodiacText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsZodiacOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{user.zodiac}</StyledText>
                                    </TouchableOpacity>
                                    { isZodiacOpen && zodiacs.filter(f => f !== user.zodiac).map(f => <TouchableOpacity onPress={() => {
                                        dispatch(setZodiac(f))
                                        setIsZodiacOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{eastYearText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsEastYearOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{user.eastYear}</StyledText>
                                    </TouchableOpacity>
                                    { isEastYearOpen && eastYears.filter(f => f !== user.eastYear).map(f => <TouchableOpacity onPress={() => {
                                        dispatch(setEastYear(f))
                                        setIsEastYearOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                            <StyledText style={styles.infoTitle}>{languagesText}</StyledText>
                            <View style={{ backgroundColor: '#E9EBF1', marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                { user.languages ? user.languages.map(p => <Chip onPress={() => {
                                    const newLanguagesArr = [...user.languages]
                                    newLanguagesArr.splice(newLanguagesArr.indexOf(p), 1)
                                    dispatch(setLanguages(newLanguagesArr))
                                }} style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip>) : '' }
                                <Chip onPress={() => {
                                    navigation.push('SelectLanguages')
                                }} backgroundColor="#EF367280" style={{ width: 98, marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{addText}</Chip>
                            </View>
                        </View>
                    </View>
                }

            </View>
            <StyledButton onPress={handleUpdateUser} style={{ marginTop: 20, marginBottom: 30 }}>OK</StyledButton>
        </ScrollView>
    </View>


  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
  nameText: {
    fontSize: 18,
    marginTop: 20
    },
    cityText: {
        marginTop: 5,
        fontSize: 13,
        color: '#757F8C',
    },
    blockHeader: {
        marginTop: 24,
        display: 'flex',
        flexDirection: 'row'
    },
    blockHeaderText: {
        fontSize: 16,
        color: '#757F8C',
        marginRight: 16,
        marginLeft: 16,
    },
    blockHeaderTextActive: {
        fontSize: 16,
        color: '#757F8C',
        marginRight: 16,
        marginLeft: 16,
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        paddingBottom: 5,
    },
    infoTitle: {
        fontSize: 16,
        marginTop: 10,
        color: '#757F8C'
    },
    infoContainer: {
        display: 'flex',
        width: 320,
        marginTop: 20,
        marginLeft: 0
    },
    infoText: {
        fontSize: 13,
        color: '#757F8C',
        marginTop: 5,
        textAlign: 'left'
    },
    input: {
        borderBottomColor: '#D6D9E4',
        borderBottomWidth: 1,
        width: 300,
        height: 35
    },
    cameraButton: { backgroundColor: '#EF3672', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 25, position: 'absolute', left: 105, top: 70 }
});
