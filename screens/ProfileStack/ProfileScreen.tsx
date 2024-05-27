import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Chip from '../../components/Chip';
import { View } from '../../components/Themed';
import StyledText from '../../components/Typography/StyledText';
import useAuth from '../../hooks/useAuth';
import { ApiRequests, URL } from '../../service/api/api';
import { getToken } from '../../service/asyncStorage';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { getAuthPayload } from '../../store/ducks/auth/selectors';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import mime from "mime";
import { setAge, setAlcohol, setAvatar, setBalance, setChildren, setCity, setDrugs, setEastYear, setEducation, setFamilyStatus, setGallery, setGambling, setHeight, setId, setInfo, setLanguages, setMoneyCondition, setName, setOrientation, setOwnAparts, setOwnCar, setPhone, setPointOfDate, setSex, setSmoking, setTypeOfAppearance, setVip, setWeight, setZodiac } from '../../store/ducks/auth/actionCreators';
import VipBlack from '../../assets/images/vipblack.svg'
import * as ImagePicker from 'expo-image-picker';
import VipWhite from '../../assets/images/vipwhite.svg'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import KrestIcon from '../../assets/images/plus.svg'


export default function ProfileScreen({ navigation }: any) {
    const [ activeTab, setActiveTab ] = useState<number>(1)
    const [ gifts, setGifts ] = useState([])

    const dispatch = useDispatch()

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [3, 5],
            quality: 1,
          });
      
          if (!result.canceled) {
            handleUploadToGallery(result.assets[0])
          } else {
            alert('You did not select any image.');
          }
    }
    const handleUploadToGallery = async (uploadedPhoto: any) => {
        const access_token = await getToken()
        if (uploadedPhoto) {
            const newImageUri = uploadedPhoto.uri ? "file:///" + uploadedPhoto.uri.split("file:/").join("") : ''
            // console.log(newImageUri)
            const data = new FormData();
            data.append('file', {
                uri : newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
               });
    
            axios({
                url: URL + '/users/uploadToGallery',
                method: 'POST',
                data: data,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                  "Authorization" : 'Bearer ' + access_token
                },
              })
                .then(function (response) {
                    dispatch(setGallery([ ...user.gallery, response.data ]))
           
                })
                .catch(function (response) {
                  console.error(response);
                });
        } 

    };

    const isFocused = useIsFocused()

    const { user } = useAuth()

    const theme = useSelector(getCurrentTheme)

    useEffect(() => {
        getToken().then(t => {
            ApiRequests.getGifts(t).then(g => setGifts(g)).catch(e => console.error(e))
            ApiRequests.me(t).then(d => {
                dispatch(setAvatar(d.avatar))
                dispatch(setChildren(d.children))
                dispatch(setAge(d.age))
                dispatch(setName(d.fullName))
                dispatch(setInfo(d.info))
                dispatch(setCity(d.cityName))
                dispatch(setPhone(d.phone))
                dispatch(setFamilyStatus(d.familyStatus))
                dispatch(setPointOfDate(d.pointOfDate))
                dispatch(setSex(d.sex))
                dispatch(setId(d.id))
                dispatch(setBalance(d.balance))
                dispatch(setVip(d.vip))
                dispatch(setZodiac(d.zodiac))
                dispatch(setEastYear(d.eastYear))
                dispatch(setTypeOfAppearance(d.typeOfAppearance))
                dispatch(setEducation(d.education))
                dispatch(setWeight(d.weight))
                dispatch(setHeight(d.height))
                dispatch(setMoneyCondition(d.moneyCondition))
                dispatch(setOrientation(d.orientation))
                dispatch(setOwnCar(d.ownCar))
                dispatch(setOwnAparts(d.ownAparts))
                dispatch(setLanguages(d.languages))
                dispatch(setGallery(d.gallery))
                dispatch(setSmoking(d.smoking))
                dispatch(setAlcohol(d.alcohol))
                dispatch(setDrugs(d.drugs))
                dispatch(setGambling(d.gambling))
            })
        }).catch(e => console.error(e))
    }, [isFocused])

    const handleSetFirstTabActive = () => {
        setActiveTab(1)
    }

    const handleSetSecondTabActive = () => {
        setActiveTab(2)
    }

    const handleSetThirdTabActive = () => {
        setActiveTab(3)
    }

    const giftsText = getStringInCurrentLanguage('Подарки', 'Gifts', 'Sunmak', 'Hozirgi')

    const cityText = getStringInCurrentLanguage('Город', 'City', 'Şehir', 'Shahar')
    const phoneText = getStringInCurrentLanguage('Телефон', 'Phone', 'Telefon', 'Telefon')
    const inphoText = getStringInCurrentLanguage('Инфо', 'Info', 'Hakkında', 'Ma’lumot')
    const ageText = getStringInCurrentLanguage('Возраст', 'Age', 'Yaş', 'Yosh')
    const sexText = getStringInCurrentLanguage('Пол', 'Sex', 'Cinsiyet', 'Jins')
    const galleryText = getStringInCurrentLanguage('Галерея', 'Gallery', 'Galeri', 'Galereya')

    const manText = getStringInCurrentLanguage('Мужской', 'Man', 'Adam', 'Kishi')
    const womanText = getStringInCurrentLanguage('Женский', 'Woman', 'Kadın', 'Ayol')

    const pointOfDateText = getStringInCurrentLanguage('Цель знакомства', 'Point of date', 'Tanışma amacı', 'Tanishuv maqsadi')

    const yesText = getStringInCurrentLanguage('Да', "Yes", 'Var', 'Bor')
    const noText = getStringInCurrentLanguage('Нет', "No", 'Değil', `Yo'q`)

    const smokingText = getStringInCurrentLanguage('Курение', 'Smoking', 'Sigara içmek', 'Chekish')
    const alcoholText = getStringInCurrentLanguage('Употребление алкоголя', 'Alcohol', 'Alkol tüketimi', "Spirtli ichimliklarni iste'mol qilish")
    const drugsText = getStringInCurrentLanguage('Употребление запрещенных веществ', 'Drugs', 'Yasaklanmış maddelerin kullanımı', 'Taqiqlangan moddalardan foydalanish')
    const gamblingText = getStringInCurrentLanguage('Азартные игры', 'Gambling', 'Kumar', 'Qimor')

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

  return (
    <View style={{ ...styles.container, ...{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}}>
        <TouchableOpacity onPress={() => navigation.push('Photos', { photosArray: [`${user.avatar}`] } )} activeOpacity={0.9} style={{ borderRadius: 50, backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
            <Image source = {{uri:user.avatar ? `${URL}/auth/pictures/${user.avatar}` : ''}}
                style = {{ width: 100, height: 100, borderRadius: 100, marginTop: 15 }}
            />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
            <StyledText style={styles.nameText}>{`${user.fullName.trim()}, ${user.age.toString()}`}</StyledText>

            { user.vip ? theme === Themes.DARK ? <VipWhite style={{ marginTop: 13, marginLeft: 7 }} height={20} width={20} /> : <VipBlack style={{ marginTop: 13, marginLeft: 7 }} height={20} width={20} /> : <></> }
        </View>
        <StyledText style={styles.cityText}>{user.city}</StyledText>
        <View style={{ ...styles.blockHeader, ...{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleSetFirstTabActive}>
                <StyledText style={activeTab == 1 ? styles.blockHeaderTextActive : styles.blockHeaderText}>{inphoText}</StyledText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={handleSetSecondTabActive}>
                <StyledText style={activeTab == 2 ? styles.blockHeaderTextActive : styles.blockHeaderText}>{giftsText}</StyledText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={handleSetThirdTabActive}>
                <StyledText style={activeTab == 3 ? styles.blockHeaderTextActive : styles.blockHeaderText}>{galleryText}</StyledText>
            </TouchableOpacity>
        </View>

        {activeTab == 1 ? <ScrollView showsVerticalScrollIndicator={false} style={styles.infoContainer}>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <StyledText style={styles.infoTitle}>{cityText}</StyledText>
                <StyledText style={styles.infoText}>{user.city}</StyledText>
            </View>

            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <StyledText style={styles.infoTitle}>{inphoText}</StyledText>
                <StyledText style={styles.infoText}>{user.info}</StyledText>
            </View>

            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <StyledText style={styles.infoTitle}>{ageText}</StyledText>
                <StyledText style={styles.infoText}>{user.age.toString()}</StyledText>
            </View>

            <StyledText style={styles.infoTitle}>{pointOfDateText}</StyledText>
            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : '#E9EBF1', marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                { user.pointOfDate ? user.pointOfDate.map(p => <Chip style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip>) : '' }
            </View>
            
            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <StyledText style={styles.infoTitle}>{familyStatusText}</StyledText>
                <StyledText style={styles.infoText}>{user.familyStatus}</StyledText>
            </View>

            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <StyledText style={styles.infoTitle}>{childrenText}</StyledText>
                <StyledText style={styles.infoText}>{user.children ? yesText : noText}</StyledText>
            </View>

            <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <StyledText style={styles.infoTitle}>{sexText}</StyledText>
                <StyledText style={styles.infoText}>{user.sex ? manText : womanText}</StyledText>
            </View>

            { typeof(user.ownAparts) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{ownApartsText}</StyledText>
                    <StyledText style={styles.infoText}>{user.ownAparts ? yesText : noText}</StyledText>
                </View> }

                {typeof(user.ownCar) == 'boolean'&& <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{ownCarText}</StyledText>
                    <StyledText style={styles.infoText}>{user.ownCar ? yesText : noText}</StyledText>
                </View> }

                {typeof(user.moneyCondition) == 'boolean' && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{moneyConditionText}</StyledText>
                    <StyledText style={styles.infoText}>{user.moneyCondition ? prosperousText : nonProsperousText}</StyledText>
                </View>}

                {/* {user.vip && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{badHabitsText}</StyledText>
                    <StyledText style={styles.infoText}>{user.badHabits ? yesText : noText}</StyledText>
                </View>} */}

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

                { user.languages.length !==0 && <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                    <StyledText style={styles.infoTitle}>{languagesText}</StyledText>
                    <View style={{ backgroundColor: '#E9EBF1', marginTop: 10, marginBottom: 10, width: 300, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        { user.languages ? user.languages.map(p => <Chip style={{ marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{p}</Chip>) : '' }
                    </View>
                </View>}
    
        </ScrollView> 
        
        : 
        activeTab == 2 ?
        <View style={{ alignItems: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }} >

            <ScrollView style={{ marginBottom: 250 }} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: theme === Themes.DARK ? '#252931' : 'white', justifyContent : 'center' }}>

            { gifts ? gifts.map(g =>  <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <ImageBackground imageStyle={{ borderRadius: 8 }} source={{uri: g.img ? URL + '/auth/pictures/' + g.img : 'ff'}} resizeMode="cover" style={{ height: 100, width: 100, borderRadius: 8, marginTop: 15, marginRight: 10 }}>
                <TouchableOpacity activeOpacity={0.9} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 8, overflow: 'hidden'}}></TouchableOpacity>
                </ImageBackground>
            </View>) : <></> }
            </ScrollView>
        </View>

        : <View style={{ alignItems: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }} >

        <ScrollView style={{ marginBottom: 250 }} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: theme === Themes.DARK ? '#252931' : 'white', justifyContent : 'center' }}>

            { user.gallery ? user.gallery.map(g =>  <TouchableOpacity onPress={() => navigation.navigate('Photos', { photosArray: user.gallery, active: user.gallery.indexOf(g) } )} activeOpacity={0.9} style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                <ImageBackground imageStyle={{ borderRadius: 8 }} source={{uri: URL + '/auth/pictures/' + g }} resizeMode="cover" style={{ height: 130, width: 115, borderRadius: 8, marginTop: 15, marginRight: 10 }}>
                    <TouchableOpacity onPress={() => {
                        const newGallery = user.gallery.filter(p => p !== g)
                        dispatch(setGallery(newGallery))
                        getToken().then(t => {
                            ApiRequests.updateUser(t, {gallery: newGallery}).then(() => {
                                navigation.navigate('Profile')
                            })
                        })

                    }} activeOpacity={1} style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}><KrestIcon height={20} width={20} style={{ transform: [{rotate: '45deg'}], marginLeft: 5, marginTop: 5 }} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Photos', { photosArray: user.gallery, active: user.gallery.indexOf(g) } )} activeOpacity={0.9} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, overflow: 'hidden'}}></TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>) : <></> }
            <View style={{ height: 130, width: 115, borderRadius: 8, marginTop: 15, marginRight: 10 }}>
                <TouchableOpacity onPress={handleChoosePhoto} activeOpacity={0.9} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 8, overflow: 'hidden'}}><Text style={{ color: 'white', fontSize: 60 }}>+</Text></TouchableOpacity>
            </View>
            </ScrollView>
        </View>
        }
        
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#252931'
  },
  nameText: {
    fontSize: 18,
    marginTop: 15
    },
    cityText: {
        marginTop: 5,
        fontSize: 13,
        color: '#757F8C',
    },
    blockHeader: {
        marginTop: 17,
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: '#252931'
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
        width: 300,
        marginTop: 20,
        marginLeft: -15,
        
    },
    infoText: {
        fontSize: 13,
        color: '#757F8C',
        marginTop: 5,
        marginBottom: 15,
        textAlign: 'left'
    },
});
