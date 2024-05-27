import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Modal, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Chip from '../../components/Chip';
import StyledButton from '../../components/StyledButton';
import MessageIcon from './../../assets/images/message.svg'
import { View } from '../../components/Themed';
import StyledText from '../../components/Typography/StyledText';
import useAuth from '../../hooks/useAuth';
import { ApiRequests, URL } from '../../service/api/api';
import { getToken } from '../../service/asyncStorage';
import { getAuthPayload } from '../../store/ducks/auth/selectors';
import { Auth } from '../../store/ducks/auth/contracts/state';
import { useIsFocused } from '@react-navigation/native';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import VipWhite from '../../assets/images/vipwhite.svg'
import VipBlack from '../../assets/images/vipblack.svg'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;


export default function UserProfileScreen({ navigation, route }: any) {
    const isFocused = useIsFocused()
    const [ user, setUser ] = useState<Auth>({
        id: 0,
        fullName: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        age: 18,
        pointOfDate: [],
        info: '',
        avatar: '',
        familyStatus: '',
        children: false,
        sex: false,
        gallery: [],
        vip: false,
        balance: 0
    })

    const [ isVipError, setIsVipError ] = useState<boolean>(false)

    const id = route.params.id

    const theme = useSelector(getCurrentTheme)

    // const galleryText = getStringInCurrentLanguage('Галерея', 'Gallery', 'Galeri', 'Galereya')

    const cityText = getStringInCurrentLanguage('Город', 'City', 'Şehir', 'Shahar')
    const phoneText = getStringInCurrentLanguage('Телефон', 'Phone', 'Telefon', 'Telefon')
    const inphoText = getStringInCurrentLanguage('Инфо', 'Info', 'Hakkında', 'Ma’lumot')
    const ageText = getStringInCurrentLanguage('Возраст', 'Age', 'Yaş', 'Yosh')
    const sexText = getStringInCurrentLanguage('Пол', 'Sex', 'Cinsiyet', 'Jins')

    const manText = getStringInCurrentLanguage('Мужской', 'Man', 'Adam', 'Kishi')
    const womanText = getStringInCurrentLanguage('Женский', 'Woman', 'Kadın', 'Ayol')

    const pointOfDateText = getStringInCurrentLanguage('Цель знакомства', 'Point of date', 'Tanışma amacı', 'Tanishuv maqsadi')

    const addText = getStringInCurrentLanguage('Добавить', 'Add', 'Eklemek', `Qo'shish`)
    const yesText = getStringInCurrentLanguage('Есть', "Yes", 'Var', 'Bor')
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
    const giftsText = getStringInCurrentLanguage('Подарки', 'Gifts', 'Sunmak', 'Hozirgi')
    const galleryText = getStringInCurrentLanguage('Галерея', 'Gallery', 'Galeri', 'Galereya')

    const smokingText = getStringInCurrentLanguage('Курение', 'Smoking', 'Sigara içmek', 'Chekish')
    const alcoholText = getStringInCurrentLanguage('Употребление алкоголя', 'Alcohol', 'Alkol tüketimi', "Spirtli ichimliklarni iste'mol qilish")
    const drugsText = getStringInCurrentLanguage('Употребление запрещенных веществ', 'Drugs', 'Yasaklanmış maddelerin kullanımı', 'Taqiqlangan moddalardan foydalanish')
    const gamblingText = getStringInCurrentLanguage('Азартные игры', 'Gambling', 'Kumar', 'Qimor')

    const buyVipText = getStringInCurrentLanguage(
        'К сожалению, вы не можете написать этому пользователю, потому что вы уже написали 10 людям. VIP-статус позволяет снять это ограничение.',
        'Unfortunately, you cannot write to this user because you have already written to 10 people. VIP status allows you to remove this restriction.',
        'Maalesef bu kullanıcıya yazamazsınız çünkü daha önce 10 kişiye yazmışsınız. VIP statüsü, bu kısıtlamayı kaldırmanıza izin verir.',
        'Afsuski, siz bu foydalanuvchiga yoza olmaysiz, chunki siz allaqachon 10 kishiga yozgansiz. VIP statusi ushbu cheklovni olib tashlash imkonini beradi.'
    )

    const connectVipText = getStringInCurrentLanguage(
        'Подключить VIP',
        'Connect VIP',
        "VIP'yi bağlayın",
        'VIP yoqish'
    )

    useEffect(() => {
        getToken().then(t => ApiRequests.getUser(t, id).then(u => setUser(u)).catch(e => console.error(e))).catch(e => console.error(e))
    }, [isFocused]) 

    const handleCreateChat = (id: number) => {
        getToken().then(t => ApiRequests.createChat(t, id).then(r => navigation.navigate('TabFour')).catch(e => setIsVipError(true))).catch(e => console.error(e))
    }

  return (
    <View style={{ ...styles.container, backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}>
        { isVipError && 
           
                <View style={{ width: 260, height: 300, borderRadius: 17, backgroundColor: '#151624', position: 'absolute', zIndex: 999, top: '30%', shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 18,
                },
                shadowOpacity:  0.25,
                shadowRadius: 20,
                elevation: 200,
                alignItems: 'center',
                justifyContent: 'center'
                }}>
                    <VipWhite width={75} height={75} style={{ marginBottom: 20 }} />
                    <StyledText style={{ paddingLeft: 18, paddingRight: 18 }}>{buyVipText}</StyledText>

                    <TouchableOpacity style={{ backgroundColor: '#EF3672', width: '70%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 25 }}>
                        <StyledText>{connectVipText}</StyledText>
                    </TouchableOpacity>
                </View>
           
        }
        <TouchableOpacity onPress={() => navigation.push('Photo', { photosArray: [`${user.avatar}`] })} activeOpacity={0.9}>
            <ImageBackground source = {{uri:user.avatar ? `${URL}/auth/pictures/${user.avatar}` : 'v'}}
                style = {{ width: imageWidth, height: 270, marginTop: 0, borderBottomLeftRadius: 20 }} />
        </TouchableOpacity>
        <View style={{ marginTop: -20, borderRadius: 30, width: '100%', flex: 1, backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.infoContainer}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                        <StyledText style={styles.nameText}>{user.fullName.trim()}, {user.age}</StyledText>

                        { user.vip ? theme === Themes.DARK ? <VipWhite style={{ marginTop: -20, marginLeft: 7 }} height={25} width={25} /> : <VipBlack style={{ marginTop: -20, marginLeft: 7 }} height={25} width={25} /> : <></> }
                    </View>
                    <TouchableOpacity onPress={() => handleCreateChat(id)} style={{ backgroundColor: '#EF3672', width: 45, height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginRight: 20 }}><MessageIcon /></TouchableOpacity>
                </View>
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{cityText}</StyledText>
                    <StyledText style={styles.infoText}>{user.cityName}</StyledText>
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{inphoText}</StyledText>
                    <StyledText style={styles.infoText}>{user.info}</StyledText>
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{ageText}</StyledText>
                    <StyledText style={styles.infoText}>{user.age}</StyledText>
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{pointOfDateText}</StyledText>
                    <View style={{ backgroundColor: '#E9EBF1', marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        { user.pointOfDate ? user.pointOfDate.map(p => <Chip style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip>) : '' }
                    </View>
                </View>
                
                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{familyStatusText}</StyledText>
                    <StyledText style={styles.infoText}>{user.familyStatus}</StyledText>
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{childrenText}</StyledText>
                    <StyledText style={styles.infoText}>{user.children ? user.children : noText}</StyledText>
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{sexText}</StyledText>
                    <StyledText style={styles.infoText}>{user.sex ? manText : womanText}</StyledText>
                </View>

                { typeof(user.ownAparts) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{ownApartsText}</StyledText>
                    <StyledText style={styles.infoText}>{user.ownAparts ? yesText : noText}</StyledText>
                </View> }

                {typeof(user.ownCar) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{ownCarText}</StyledText>
                    <StyledText style={styles.infoText}>{user.ownCar ? yesText : noText}</StyledText>
                </View> }

                {typeof(user.moneyCondition) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{moneyConditionText}</StyledText>
                    <StyledText style={styles.infoText}>{user.moneyCondition ? prosperousText : nonProsperousText}</StyledText>
                </View>}

                {typeof(user.smoking) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{smokingText}</StyledText>
                    <StyledText style={styles.infoText}>{user.smoking ? yesText : noText}</StyledText>
                </View>}

                {typeof(user.alcohol) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{alcoholText}</StyledText>
                    <StyledText style={styles.infoText}>{user.alcohol ? yesText : noText}</StyledText>
                </View>}

                {typeof(user.drugs) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{drugsText}</StyledText>
                    <StyledText style={styles.infoText}>{user.drugs ? yesText : noText}</StyledText>
                </View>}

                {typeof(user.gambling) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{gamblingText}</StyledText>
                    <StyledText style={styles.infoText}>{user.gambling ? yesText : noText}</StyledText>
                </View>}

                {/* {user.vip && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{badHabitsText}</StyledText>
                    <StyledText style={styles.infoText}>{user.badHabits ? yesText : noText}</StyledText>
                </View>} */}

                {typeof(user.orientation) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{orientationText}</StyledText>
                    <StyledText style={styles.infoText}>{user.orientation ? traditionalText : nonTraditionalText}</StyledText>
                </View>}

                {user.height && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{heightText}</StyledText>
                    <StyledText style={styles.infoText}>{user.height}</StyledText>
                </View>}

                {user.weight && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{weightText}</StyledText>
                    <StyledText style={styles.infoText}>{user.weight}</StyledText>
                </View>}

                { user.education && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{educationText}</StyledText>
                    <StyledText style={styles.infoText}>{user.education}</StyledText>
                </View>}

                {user.religion && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{religionText}</StyledText>
                    <StyledText style={styles.infoText}>{user.religion}</StyledText>
                </View>}

                {user.typeOfAppearance && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{typeOfAppearanceText}</StyledText>
                    <StyledText style={styles.infoText}>{user.typeOfAppearance}</StyledText>
                </View>}

                {user.zodiac && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{zodiacText}</StyledText>
                    <StyledText style={styles.infoText}>{user.zodiac}</StyledText>
                </View>}

                {user.eastYear && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{eastYearText}</StyledText>
                    <StyledText style={styles.infoText}>{user.eastYear}</StyledText>
                </View>}

                { user.languages?.length !==0 && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{languagesText}</StyledText>
                    <View style={{ backgroundColor: '#E9EBF1', marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        { user.languages ? user.languages.map(p => <Chip style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip>) : '' }
                    </View>
                </View>}



                {/* <View>
            
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View> */}

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', marginBottom: 30 }}>
                    <StyledText style={styles.infoTitle}>{galleryText}</StyledText>
                    <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>

                        { user.gallery ? user.gallery.map(g =>  <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <ImageBackground imageStyle={{ borderRadius: 8 }} source={{uri: URL + '/auth/pictures/' + g }} resizeMode="cover" style={{ height: 100, width: 100, borderRadius: 8, marginTop: 15, marginRight: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TabOne', { screen: 'Photo', params: { photosArray: user.gallery, active: user.gallery.indexOf(g) } })} activeOpacity={0.9} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 8, overflow: 'hidden'}}></TouchableOpacity>
                    </ImageBackground>
                </View>) : <></> }
                    </ScrollView>
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', marginBottom: 30 }}>
                    <StyledText style={styles.infoTitle}>{giftsText}</StyledText>
                    <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>

                    { user.gifts ? user.gifts.map(g =>  <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                        <ImageBackground imageStyle={{ borderRadius: 8}} source={{uri: g.img ? URL + '/auth/pictures/' + g.img : 'ff'}} resizeMode="cover" style={{ height: 100, width: 100, borderRadius: 8, marginTop: 15, marginRight: 10 }}>
                            <TouchableOpacity activeOpacity={0.9} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 8, overflow: 'hidden'}}></TouchableOpacity>
                        </ImageBackground>
                    </View>) : <></> }
                    </ScrollView>
                </View>
        
            </ScrollView> 
        </View>
        
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  nameText: {
    fontSize: 24,
    marginTop: 5,
    marginBottom: 24,
    },
    cityText: {
        marginTop: 5,
        marginBottom: 24,
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
        fontSize: 18,
    },
    infoContainer: {
        display: 'flex',
        marginTop: 20,
        borderRadius: 30,
        marginLeft: 20
    },
    infoText: {
        fontSize: 13,
        color: '#757F8C',
        marginTop: 5,
        marginBottom: 15,
        textAlign: 'left'
    }
});
