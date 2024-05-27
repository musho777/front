import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { View } from '../../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import StyledText from '../../components/Typography/StyledText';
import useAuth from '../../hooks/useAuth';
import Chip from '../../components/Chip';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import StyledButton from '../../components/StyledButton';
import axios from 'axios';
import { getToken } from '../../service/asyncStorage';
import { setUsers } from '../../store/ducks/matching/actionCreators';
import { URL } from '../../service/api/api';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

export default function FilterScreen({ navigation, route }: any) {
    const [ children, setChildren ] = useState<string>('')
    const [ sex, setSex ] = useState<boolean>(false)
    const [ city, setCity ] = useState<string>('')
    const [ age, setAge ] = useState<number[]>([ 18, 50 ])
    const [ height, setHeight ] = useState<number[]>([ 0, 250 ])
    const [ weight, setWeight ] = useState<number[]>([ 0, 200 ])
    const [ distance, setDistance ] = useState<number>(20)
    const [ pointOfDate, setPointOfDate ] = useState<string[]>([])
    const [ languages, setLanguages ] = useState<string[]>([])
    const [ isFamilyStatusOpen, setIsFamilyStatusOpen ] = useState<boolean>(false)
    const [ isChildrenOpen, setIsChildrenOpen ] = useState<boolean>(false)
    const [ isEducationOpen, setIsEducationOpen ] = useState<boolean>(false)
    const [ isReligionOpen, setIsReligionOpen ] = useState<boolean>(false)
    const [ isTypeOfAppearanceOpen, setIsTypeOfAppearanceOpen ] = useState<boolean>(false)
    const [ isZodiacOpen, setIsZodiacOpen ] = useState<boolean>(false)
    const [ isEastYearOpen, setIsEastYearOpen ] = useState<boolean>(false)
    const [ typeOfAppearance, setTypeOfAppearance ] = useState<string>('')
    const [ religion, setReligion ] = useState<string>('')
    const [ zodiac, setZodiac ] = useState<string>('')
    const [ eastYear, setEastYear ] = useState<string>('')
    const [ familyStatus, setFamilyStatus ] = useState<string>('')
    const [ ownAparts, setOwnAparts ] = useState<boolean>(true)
    const [ ownCar, setOwnCar ] = useState<boolean>(true)
    const [ badHabits, setBadHabits ] = useState<boolean>(true)

    const [ smoking, setSmoking ] = useState<boolean>(true)
    const [ alcohol, setAlcohol ] = useState<boolean>(true)
    const [ drugs, setDrugs ] = useState<boolean>(true)
    const [ gambling, setGambling ] = useState<boolean>(true)

    const [ moneyCondition, setMoneyCondition ] = useState<boolean>(true)
    const [ education, setEducation ] = useState<string>('')
    const [ orientation, setOrientation ] = useState<boolean>(true)


    const dispatch = useDispatch()
    const { user } = useAuth()

    const theme = useSelector(getCurrentTheme)

    useEffect(() => {
        setCity(route.params ? route.params.city : user.city)
    }, [])

    const handleApplyFilter = () => {
        getToken().then(token => axios.get(`${URL}/matching?${children ? `children=${children}`: ``}&${sex ? `sex=true`: `sex=false`}&${city ? `cityName=${city}` : ``}&${age ? `ageT=${age[1]}&ageB=${age[0]}` : ``}&${distance ? `distance=${distance}` : ``}&${pointOfDate ? pointOfDate.map(p => `pointOfDate=${p}&`) : ``}&${user.vip && height ? `heightT=${height[1]}&heightB=${height[0]}` : ``}&${user.vip && weight ? `weightT=${weight[1]}&weightB=${weight[0]}` : ``}&${user.vip && ownAparts ? `ownAparts=true`: `ownAparts=false`}&${user.vip && ownCar ? `ownCar=true`: `ownCar=false`}&${user.vip && smoking ? `smoking=true`: `smoking=false`}&${user.vip && alcohol ? `alcohol=true`: `alcohol=false`}&${user.vip && drugs ? `drugs=true`: `drugs=false`}&${user.vip && gambling ? `gambling=true`: `gambling=false`}&${user.vip && moneyCondition ? `moneyCondition=true`: `moneyCondition=false`}&${user.vip && orientation ? `orientation=true`: `orientation=false`}&${user.vip && education ? `education=${education}` : ``}&${user.vip && typeOfAppearance ? `typeOfAppearance=${typeOfAppearance}` : ``}&${user.vip && religion ? `religion=${religion}` : ``}&${user.vip && zodiac ? `zodiac=${zodiac}` : ``}&${user.vip && eastYear ? `eastYear=${eastYear}` : ``}`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => dispatch(setUsers(r.data))))
        console.log(`${URL}/matching?${children ? `children=${children}`: ``}&${sex ? `sex=true`: `sex=false`}&${city ? `cityName=${city}` : ``}&${age ? `ageT=${age[1]}&ageB=${age[0]}` : ``}&${distance ? `distance=${distance}` : ``}&${pointOfDate ? pointOfDate.map(p => `pointOfDate=${p}&`) : ``}&${user.vip && height ? `heightT=${height[1]}&heightB=${height[0]}` : ``}&${user.vip && weight ? `weightT=${weight[1]}&weightB=${weight[0]}` : ``}&${user.vip && ownAparts ? `ownAparts=true`: `ownAparts=false`}&${user.vip && ownCar ? `ownCar=true`: `ownCar=false`}&${user.vip && smoking ? `smoking=true`: `smoking=false`}&${user.vip && alcohol ? `alcohol=true`: `alcohol=false`}&${user.vip && drugs ? `drugs=true`: `drugs=false`}&${user.vip && gambling ? `gambling=true`: `gambling=false`}&${user.vip && moneyCondition ? `moneyCondition=true`: `moneyCondition=false`}&${user.vip && orientation ? `orientation=true`: `orientation=false`}&${user.vip && education ? `education=${education}` : ``}&${user.vip && typeOfAppearance ? `typeOfAppearance=${typeOfAppearance}` : ``}&${user.vip && religion ? `religion=${religion}` : ``}&${user.vip && zodiac ? `zodiac=${zodiac}` : ``}&${user.vip && eastYear ? `eastYear=${eastYear}` : ``}`)
        navigation.navigate('Home')
    }

    const cityText = getStringInCurrentLanguage('Город', 'City', 'Şehir', 'Shahar')
    const ageText = getStringInCurrentLanguage('Возраст', 'Age', 'Yaş', 'Yosh')
    const distanceText = getStringInCurrentLanguage('Расстояние', 'Distance', 'Mesafe', 'Masofa')
    const sexText = getStringInCurrentLanguage('Пол', 'Sex', 'Cinsiyet', 'Jins')
    const manText = getStringInCurrentLanguage('Мужской', 'Man', 'Adam', 'Kishi')
    const womanText = getStringInCurrentLanguage('Женский', 'Woman', 'Kadın', 'Ayol')
    const yesText = getStringInCurrentLanguage('Да', "Yes", 'Var', 'Bor')
    const noText = getStringInCurrentLanguage('Нет', "No", 'Değil', `Yo'q`)
    const pointOfDateText = getStringInCurrentLanguage('Цель знакомства', 'Point of date', 'Tanışma amacı', 'Tanishuv maqsadi')
    const childrenText = getStringInCurrentLanguage('Дети', 'Children', 'Cocuklar', 'Olalar')
    
    const addText = getStringInCurrentLanguage('Добавить', 'Add', 'Eklemek', `Qo'shish`)
    const saveText = getStringInCurrentLanguage('Сохранить изменения', 'Save', 'Kaydetmek', 'Saqlash')
    const familyStatusText = getStringInCurrentLanguage('Семейное положение', 'Family status', 'Aile durumu', 'Oilaviy holat')
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
        getStringInCurrentLanguage('Кавказская', 'Caucasian', "Kafkas", "Kavkaz"),
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
        <ScrollView style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
            <View style={{ ...styles.infoContainer, ...{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}}>
                    <TouchableOpacity onPress={() => navigation.push('Cities')}>
                        <StyledText style={styles.infoTitle}>{cityText}</StyledText>
                        <StyledText style={styles.infoText}>{city}</StyledText>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                            <StyledText style={styles.infoTitle}>{distanceText}</StyledText>
                            <StyledText>{`${distance} km`}</StyledText>
                        </View>
                        <MultiSlider containerStyle={{ marginLeft: 8 }} onValuesChange={v => setDistance(v)} min={0} max={100} unselectedStyle={{ backgroundColor: '#D6D9E4' }} selectedStyle={{ backgroundColor: '#EF3672' }} markerStyle={{ backgroundColor: 'white', width: 16, height: 16, borderColor: '#EF3672', borderWidth: 2.5 }} />
                    </View>

                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                            <StyledText style={styles.infoTitle}>{ageText}</StyledText>
                            <StyledText>{`${age[0]} - ${age[1]}`}</StyledText>
                        </View>
                        <MultiSlider containerStyle={{ marginLeft: 8 }} onValuesChange={v => setAge(v)} values={age} unselectedStyle={{ backgroundColor: '#D6D9E4' }} selectedStyle={{ backgroundColor: '#EF3672' }} markerStyle={{ backgroundColor: 'white', width: 16, height: 16, borderColor: '#EF3672', borderWidth: 2.5 }} min={18} max={99} />
                    </View>

                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                        <StyledText style={styles.infoTitle}>{sexText}</StyledText>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                                {sex ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{manText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setSex(false)} style={{ width: 100 }}>{womanText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setSex(true)} style={{ width: 100 }}>{manText}</Chip><Chip style={{ width: 100 }}>{womanText}</Chip></View>}
                        </View>
                    </View>

                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                        <StyledText style={styles.infoTitle}>{childrenText}</StyledText>
                        <View style={{ marginTop: 10, backgroundColor: '#E9EBF1', marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => setIsChildrenOpen(true)}>
                                <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{children}</StyledText>
                            </TouchableOpacity>
                            { isChildrenOpen && childrenStatuses.filter(f => f !== children).map(f => <TouchableOpacity onPress={() => {
                                setChildren(f)
                                setIsChildrenOpen(false)
                            }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                        </View>
                    </View>
                        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                            <StyledText style={styles.infoTitle}>{pointOfDateText}</StyledText>
                            <View style={{ backgroundColor: '#E9EBF1', marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                { pointOfDate ? pointOfDate.map(p => <Chip onPress={() => {
                                    const newPointOfDateArr = [...pointOfDate]
                                    newPointOfDateArr.splice(newPointOfDateArr.indexOf(p), 1)
                                    setPointOfDate(newPointOfDateArr)
                                }} style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip>) : '' }
                                <Chip onPress={() => {
                                    navigation.push('SelectPointOfDate', { pointOfDate, setPointOfDate })
                                }} backgroundColor="#EF367280" style={{ width: 98, marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{addText}</Chip>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                        <StyledText style={styles.infoTitle}>{familyStatusText}</StyledText>
                        <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                            <TouchableOpacity onPress={() => setIsFamilyStatusOpen(true)}>
                                <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{familyStatus}</StyledText>
                            </TouchableOpacity>
                            { isFamilyStatusOpen && familyStatuses.filter(f => f !== familyStatus).map(f => <TouchableOpacity onPress={() => {
                                setFamilyStatus(f)
                                setIsFamilyStatusOpen(false)
                            }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                        </View>
                    </View>

                    {user.vip ? <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}>
                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                    <StyledText style={styles.infoTitle}>{heightText}</StyledText>
                                    <StyledText>{`${height[0]} - ${height[1]} cm`}</StyledText>
                                </View>
                                <MultiSlider containerStyle={{ marginLeft: 8 }} onValuesChange={v => setHeight(v)} values={height} unselectedStyle={{ backgroundColor: '#D6D9E4' }} selectedStyle={{ backgroundColor: '#EF3672' }} markerStyle={{ backgroundColor: 'white', width: 16, height: 16, borderColor: '#EF3672', borderWidth: 2.5 }} min={0} max={250} />
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                        <StyledText style={styles.infoTitle}>{weightText}</StyledText>
                                        <StyledText>{`${weight[0]} - ${weight[1]} kg`}</StyledText>
                                    </View>
                                    <MultiSlider containerStyle={{ marginLeft: 8 }} onValuesChange={v => setWeight(v)} values={weight} unselectedStyle={{ backgroundColor: '#D6D9E4' }} selectedStyle={{ backgroundColor: '#EF3672' }} markerStyle={{ backgroundColor: 'white', width: 16, height: 16, borderColor: '#EF3672', borderWidth: 2.5 }} min={0} max={200} />
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{ownApartsText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {ownAparts ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setOwnAparts(false)} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setOwnAparts(true)} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{ownCarText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {ownCar ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setOwnCar(false)} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setOwnCar(true)} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            {/* <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{badHabitsText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {badHabits ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setBadHabits(false)} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setBadHabits(true)} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View> */}

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{smokingText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {smoking ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setSmoking(false)} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setSmoking(true)} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{alcoholText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {alcohol ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setAlcohol(false)} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setAlcohol(true)} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{drugsText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {drugs ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setDrugs(false)} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setDrugs(true)} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{gamblingText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {gambling ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setGambling(false)} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setGambling(true)} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{moneyConditionText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {moneyCondition ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 150 }}>{prosperousText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setMoneyCondition(false)} style={{ width: 150 }}>{nonProsperousText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setMoneyCondition(true)} style={{ width: 150 }}>{prosperousText}</Chip><Chip style={{ width: 150 }}>{nonProsperousText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{educationText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsEducationOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{education}</StyledText>
                                    </TouchableOpacity>
                                    { isEducationOpen && educationStatuses.filter(f => f !== education).map(f => <TouchableOpacity onPress={() => {
                                        setEducation(f)
                                        setIsEducationOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{orientationText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {orientation ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 150 }}>{traditionalText}</Chip><Chip backgroundColor='#EF367280' onPress={() => setOrientation(false)} style={{ width: 150 }}>{nonTraditionalText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => setOrientation(true)} style={{ width: 150 }}>{traditionalText}</Chip><Chip style={{ width: 150 }}>{nonTraditionalText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{typeOfAppearanceText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsTypeOfAppearanceOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{typeOfAppearance}</StyledText>
                                    </TouchableOpacity>
                                    { isTypeOfAppearanceOpen && typesOfAppearance.filter(f => f !== typeOfAppearance).map(f => <TouchableOpacity onPress={() => {
                                        setTypeOfAppearance(f)
                                        setIsTypeOfAppearanceOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{religionText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsReligionOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{religion}</StyledText>
                                    </TouchableOpacity>
                                    { isReligionOpen && religions.filter(f => f !== religion).map(f => <TouchableOpacity onPress={() => {
                                        setReligion(f)
                                        setIsReligionOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{zodiacText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsZodiacOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{zodiac}</StyledText>
                                    </TouchableOpacity>
                                    { isZodiacOpen && zodiacs.filter(f => f !== zodiac).map(f => <TouchableOpacity onPress={() => {
                                        setZodiac(f)
                                        setIsZodiacOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{eastYearText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => setIsEastYearOpen(true)}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{eastYear}</StyledText>
                                    </TouchableOpacity>
                                    { isEastYearOpen && eastYears.filter(f => f !== eastYear).map(f => <TouchableOpacity onPress={() => {
                                        setEastYear(f)
                                        setIsEastYearOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                            <StyledText style={styles.infoTitle}>{languagesText}</StyledText>
                            <View style={{ backgroundColor: '#E9EBF1', marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                { languages ? languages.map(p => <Chip onPress={() => {
                                    const newLanguagesArr = [...languages]
                                    newLanguagesArr.splice(newLanguagesArr.indexOf(p), 1)
                                    setLanguages(newLanguagesArr)
                                }} style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip>) : '' }
                                <Chip onPress={() => {
                                    navigation.push('SelectLanguages', { languages, setLanguages })
                                }} backgroundColor="#EF367280" style={{ width: 98, marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{addText}</Chip>
                            </View>
                        </View>


                        </View>

                        :

                        <TouchableOpacity onPress={() => navigation.navigate('TabNine')} style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}>
                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                    <StyledText style={styles.infoTitle}>{heightText}</StyledText>
                                    <StyledText>{`${height[0]} - ${height[1]} cm`}</StyledText>
                                </View>
                                <MultiSlider containerStyle={{ marginLeft: 8 }} onValuesChange={v => navigation.navigate('TabNine')} values={height} unselectedStyle={{ backgroundColor: '#D6D9E4' }} selectedStyle={{ backgroundColor: '#EF3672' }} markerStyle={{ backgroundColor: 'white', width: 16, height: 16, borderColor: '#EF3672', borderWidth: 2.5 }} min={0} max={250} />
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                        <StyledText style={styles.infoTitle}>{weightText}</StyledText>
                                        <StyledText>{`${weight[0]} - ${weight[1]} kg`}</StyledText>
                                    </View>
                                    <MultiSlider containerStyle={{ marginLeft: 8 }} onValuesChange={v => navigation.navigate('TabNine')} values={weight} unselectedStyle={{ backgroundColor: '#D6D9E4' }} selectedStyle={{ backgroundColor: '#EF3672' }} markerStyle={{ backgroundColor: 'white', width: 16, height: 16, borderColor: '#EF3672', borderWidth: 2.5 }} min={0} max={200} />
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{ownApartsText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {ownAparts ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{ownCarText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {ownCar ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            {/* <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{badHabitsText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {badHabits ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View> */}

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{smokingText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {smoking ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{alcoholText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {alcohol ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{drugsText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {drugs ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{gamblingText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {gambling ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{yesText}</Chip><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{noText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 100 }}>{yesText}</Chip><Chip style={{ width: 100 }}>{noText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{moneyConditionText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {moneyCondition ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 150 }}>{prosperousText}</Chip><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 150 }}>{nonProsperousText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 150 }}>{prosperousText}</Chip><Chip style={{ width: 150 }}>{nonProsperousText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{educationText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('TabNine')}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{education}</StyledText>
                                    </TouchableOpacity>
                                    { isEducationOpen && educationStatuses.filter(f => f !== education).map(f => <TouchableOpacity onPress={() => {
                                        navigation.navigate('TabNine')
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <StyledText style={styles.infoTitle}>{orientationText}</StyledText>
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        {orientation ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 150 }}>{traditionalText}</Chip><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 150 }}>{nonTraditionalText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => navigation.navigate('TabNine')} style={{ width: 150 }}>{traditionalText}</Chip><Chip style={{ width: 150 }}>{nonTraditionalText}</Chip></View>}
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{typeOfAppearanceText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('TabNine')}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{typeOfAppearance}</StyledText>
                                    </TouchableOpacity>
                                    { isTypeOfAppearanceOpen && typesOfAppearance.filter(f => f !== typeOfAppearance).map(f => <TouchableOpacity onPress={() => {
                                        navigation.navigate('TabNine')
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{religionText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('TabNine')}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{religion}</StyledText>
                                    </TouchableOpacity>
                                    { isReligionOpen && religions.filter(f => f !== religion).map(f => <TouchableOpacity onPress={() => {
                                        navigation.navigate('TabNine')
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{zodiacText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('TabNine')}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{zodiac}</StyledText>
                                    </TouchableOpacity>
                                    { isZodiacOpen && zodiacs.filter(f => f !== zodiac).map(f => <TouchableOpacity onPress={() => {
                                        navigation.navigate('TabNine')
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white', marginBottom: 10 }}>
                                <StyledText style={styles.infoTitle}>{eastYearText}</StyledText>
                                <View style={{ marginTop: 10, backgroundColor: '#E9EBF1' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('TabNine')}>
                                        <StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{eastYear}</StyledText>
                                    </TouchableOpacity>
                                    { isEastYearOpen && eastYears.filter(f => f !== eastYear).map(f => <TouchableOpacity onPress={() => {
                                        setEastYear(f)
                                        setIsEastYearOpen(false)
                                    }} style={{ marginTop: 10 }}><StyledText style={{ fontSize: 16, marginLeft: 5, padding: 5, color: 'black' }}>{f}</StyledText></TouchableOpacity>) }
                                </View>
                            </View>

                            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                            <StyledText style={styles.infoTitle}>{languagesText}</StyledText>
                            <View style={{ backgroundColor: '#E9EBF1', marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                { languages ? languages.map(p => <Chip onPress={() => {
                                    const newLanguagesArr = [...languages]
                                    newLanguagesArr.splice(newLanguagesArr.indexOf(p), 1)
                                    setLanguages(newLanguagesArr)
                                }} style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip>) : '' }
                                <Chip onPress={() => {
                                    navigation.navigate('TabNine')
                                }} backgroundColor="#EF367280" style={{ width: 98, marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{addText}</Chip>
                            </View>
                        </View>


                        </TouchableOpacity>

                        }

                    <StyledButton onPress={handleApplyFilter} style={{ marginTop: 20 }}>{saveText}</StyledButton>           
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    infoTitle: {
        fontSize: 18,
    },
    infoContainer: {
        display: 'flex',
        width: 300,
        marginTop: 20,
        marginLeft: 25
    },
    infoText: {
        fontSize: 13,
        color: '#757F8C',
        marginTop: 5,
        marginBottom: 20,
        textAlign: 'left'
    }
});
