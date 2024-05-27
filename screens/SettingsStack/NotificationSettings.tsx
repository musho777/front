import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { setTheme } from '../../store/ducks/theme/actionCreators'
import SwitchEnabled from '../../components/SwitchEnabled'
import SwitchDisabled from '../../components/SwitchDisabled'


function NotificationSettings({ navigation }: any) {
    const [ active, setActive ] = useState<[]>([])
    const [ open, setIsOpen ] = useState<boolean>(false)
    const [ firstTime, setFirstTime ] = useState<string>('00:00')
    const [ secondTime, setSecondTime ] = useState<string>('00:00')

    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    const firstText = getStringInCurrentLanguage('Новые сообщения', 'New messages', 'Yeni mesajlar', "Yangi xabarlar")
    const secondText = getStringInCurrentLanguage('Новые гости', 'New guests', 'Şehrimden yeni profiller', "Mening shahrimdan yangi profillar")
    const thirdText = getStringInCurrentLanguage('Новые события', 'New events', 'Yeni etkinlikler', "Yangi voqealar")
    const fourthText = getStringInCurrentLanguage('Новые симпатии', 'New likes', 'Yeni beğeniler', "Yangi yoqtirishlar")
    const fifthText = getStringInCurrentLanguage('Прочие уведомления', 'Other notifications', 'Diğer bildirimler', "Boshqa bildirishnomalar")
    const sixText = getStringInCurrentLanguage('Выберите диапазон', 'Select range', 'Aralık Seçin', "Rangni tanlang")
    const nineText = getStringInCurrentLanguage('Время', 'Time', 'Zaman', "Vaqt")
   

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
            <View>
                <TouchableOpacity onPress={() => navigation.push('ChooseTime', { setFirstTime, setSecondTime, firstTime, secondTime })} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <StyledText style={{ fontSize: 14, paddingVertical: 12 }}>{nineText}</StyledText>
                    <View style={{ marginRight: 25, alignItems: 'center' }}>
                        <StyledText style={{ fontSize: 14, paddingVertical: 12 }}>{firstTime} - {secondTime}</StyledText>         
                    </View>
                </TouchableOpacity>  

                <TouchableOpacity onPress={() => {
                    if (active.includes(1)) {
                        const newArr = [...active]
                        newArr.splice(newArr.indexOf(1), 1)
                        setActive(newArr)
                    } else {
                        setActive([...active, 1])
                    }
                }} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <StyledText style={{ fontSize: 14, paddingVertical: 12 }}>{firstText}</StyledText>
                    <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { active.includes(1) ? <SwitchEnabled /> : <SwitchDisabled /> }
                    </View>
                </TouchableOpacity>  

                <TouchableOpacity onPress={() => {
                    if (active.includes(2)) {
                        const newArr = [...active]
                        newArr.splice(newArr.indexOf(2), 1)
                        setActive(newArr)
                    } else {
                        setActive([...active, 2])
                    }
                }} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <StyledText style={{ fontSize: 14, paddingVertical: 12 }}>{secondText}</StyledText>
                    <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { active.includes(2) ? <SwitchEnabled /> : <SwitchDisabled /> }
                    </View>
                </TouchableOpacity>  

                <TouchableOpacity onPress={() => {
                    if (active.includes(3)) {
                        const newArr = [...active]
                        newArr.splice(newArr.indexOf(3), 1)
                        setActive(newArr)
                    } else {
                        setActive([...active, 3])
                    }
                }} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <StyledText style={{ fontSize: 14, paddingVertical: 12 }}>{thirdText}</StyledText>
                    <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { active.includes(3) ? <SwitchEnabled /> : <SwitchDisabled /> }
                    </View>
                </TouchableOpacity>  

                <TouchableOpacity onPress={() => {
                    if (active.includes(4)) {
                        const newArr = [...active]
                        newArr.splice(newArr.indexOf(4), 1)
                        setActive(newArr)
                    } else {
                        setActive([...active, 4])
                    }
                }} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <StyledText style={{ fontSize: 14, paddingVertical: 12 }}>{fourthText}</StyledText>
                    <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { active.includes(4) ? <SwitchEnabled /> : <SwitchDisabled /> }
                    </View>
                </TouchableOpacity>  

                <TouchableOpacity onPress={() => {
                    if (active.includes(5)) {
                        const newArr = [...active]
                        newArr.splice(newArr.indexOf(5), 1)
                        setActive(newArr)
                    } else {
                        setActive([...active, 5])
                    }
                }} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <StyledText style={{ fontSize: 14, paddingVertical: 12 }}>{fifthText}</StyledText>
                    <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { active.includes(5) ? <SwitchEnabled /> : <SwitchDisabled /> }
                    </View>
                </TouchableOpacity>  

            </View>
        </View>
    )
}

export default NotificationSettings
