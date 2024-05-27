import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, TextInput, Text, ScrollView, Platform  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StyledButton from '../../components/StyledButton';
import { View } from '../../components/Themed';
import StyledText from '../../components/Typography/StyledText';
import useAuth from '../../hooks/useAuth';
import CameraIcon from './../../assets/images/camera.svg'
import { setChildren, setFamilyStatus, setInfo, setCity, setPhone, setPointOfDate, setSex, setAge } from '../../store/ducks/auth/actionCreators';
import Chip from '../../components/Chip';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import mime from "mime";
import { ApiRequests, URL } from '../../service/api/api';
import * as Location from 'expo-location';
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';

export default function RegistrationSecondStepScreen({ navigation }: any) {
    const [ isAdding, setIsAdding ] = useState<boolean>(false)
    const [ isFamilyStatusOpen, setIsFamilyStatusOpen ] = useState<boolean>(false)
    const [ isChildrenOpen, setIsChildrenOpen ] = useState<boolean>(false)
    const [ newPointOfDate, setNewPointOfDate ] = useState<string>('')
    const [photo, setPhoto] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [ coords, setCoords ] = useState<{lon: string, lat: string}>({lon: '', lat: ''})
    const [ error, setIsError ] = useState<boolean>(false)

    const theme = useSelector(getCurrentTheme)

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
    ]

  useEffect(() => {
    
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location1 = await Location.getCurrentPositionAsync({});
      let regionName = await Location.reverseGeocodeAsync(location1.coords);
      setCoords({ lon: location1.coords.longitude.toString(), lat: location1.coords.latitude.toString() })
    //   console.log(location1)
      dispatch(setCity(regionName[0].city))
    })();
  }, []);

    // console.log(photo)

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
    const handleUploadPhoto = async () => {
        const newImageUri = photo.uri ? "file:///" + photo.uri.split("file:/").join("") : ''
        
        // console.log(photo)
        // console.log(data)

        const age = user.age.toString()
        
        const userCopy = {...user, ...coords}

        delete userCopy.id
        delete userCopy.age
        userCopy.age = age
        console.log(userCopy)
        console.log(photo)
        // console.log(data)
        ApiRequests.signup(userCopy).then(access_token => {
            console.log(access_token)
            const data = new FormData();

            data.append('file', {
                uri : newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            });
            console.log(photo)
            console.log(data)
            axios.post(
                URL + '/users/uploadAvatar',
                data,
                {headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                  "Authorization" : 'Bearer ' + access_token.access_token
                }},
              )
                .then(function (response) {
                    navigation.push('AuthHome')
           
                })
                .catch(e => {
                  setIsError(true)
                  console.error(e)
                });

                navigation.push('AuthHome')
        }).catch(e => setIsError(true))


    };
    const { user } = useAuth()
    const dispatch = useDispatch()
    dispatch(setFamilyStatus(getStringInCurrentLanguage('Холост', 'Single', "Bekar", "Yagona")))
    

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

    const registerText = getStringInCurrentLanguage('Зарегистрироваться', 'Sign up', 'Üye olmak', `Ro'yxatdan o'tish`)
    const errorText = getStringInCurrentLanguage('Заполните все поля верно!', 'Fill in all fields correctly!', 'Tüm alanları doğru bir şekilde doldurun!', "Barcha maydonlarni toʻgʻri toʻldiring!")

  return (
    <View style={{...styles.container, ...{backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}}>
        <View style={{...{ borderRadius: 50, display: 'flex', alignItems: 'center' }, ...{backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}}>
            <Image source = {{uri: photo ? photo.uri : 'https://www.w3schools.com/howto/img_avatar.png'}}
                style = {{ width: 130, height: 130, borderRadius: 100, marginTop: 30 }}
            />
            <TouchableOpacity onPress={handleChoosePhoto} activeOpacity={0.8} style={styles.cameraButton}><CameraIcon /></TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.infoContainer}>
            <View>
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
                    <TextInput value={user.age.toString()} onChangeText={t => dispatch(setAge(t))} style={{...styles.input, color: theme === Themes.DARK ? '#ffffff' : 'black'}} />
                </View>

                <View style={{ backgroundColor: theme === Themes.DARK ? '#252931': 'white' }}>
                    <StyledText style={styles.infoTitle}>{sexText}</StyledText>
                    <View style={{ marginTop: 10 }}>
                        {user.sex ? <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip style={{ width: 100 }}>{manText}</Chip><Chip backgroundColor='#EF367280' onPress={() => dispatch(setSex(false))} style={{ width: 100 }}>{womanText}</Chip></View> : <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}><Chip backgroundColor='#EF367280' onPress={() => dispatch(setSex(true))} style={{ width: 100 }}>{manText}</Chip><Chip style={{ width: 100 }}>{womanText}</Chip></View>}
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
                        <Chip onPress={() => navigation.push('SelectPointOfDate')} backgroundColor="#EF367280" style={{ width: 98, marginLeft: 10, paddingTop: 10, paddingBottom: 10 }}>{addText}</Chip>
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
            </View>
            { error ? <StyledText style={{ alignSelf: 'center', marginTop: 20 }}>{errorText}</StyledText> : <></> }
            <StyledButton onPress={handleUploadPhoto} style={{ marginTop: 30, marginBottom: 20 }}>{registerText}</StyledButton>
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
    cameraButton: { backgroundColor: '#EF3672', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 25, position: 'absolute', left: 105, top: 70 },
    
});
