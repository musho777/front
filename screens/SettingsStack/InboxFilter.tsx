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


function InboxFilter({ navigation }: any) {
    const [ isTrue, setIsTrue ] = useState<boolean>(false)

    const dispatch = useDispatch()
    const theme = useSelector(getCurrentTheme)

    const firstText = getStringInCurrentLanguage('Получать сообщения от мужчин', 'Receive messages from men', 'Erkeklerden mesaj al', "Erkaklar xabarlarini qabul qilish")
    const secondText = getStringInCurrentLanguage('Могут ли Вам писать сообщения мужчины (помимо Ваших друзей и VIP).', 'Can men write messages to you (besides your friends and VIPs).', "Erkekler size mesaj yazabilir mi (arkadaşlarınız ve VIP'leriniz dışında).", "Erkaklar sizga xabar yozishi mumkinmi (do'stlaringiz va VIPlardan tashqari).")
    const thirdText = getStringInCurrentLanguage('Получать сообщения от анкет без фото', 'Receive messages from profiles without photos', 'Fotoğrafsız profillerden mesaj alın', "Fotosuratsiz profillardan xabarlar oling")
    const fourthText = getStringInCurrentLanguage('Могут ли Вам писать сообщения пользователи без фотографий (помимо Ваших друзей и VIP).', 'Can users write messages to you without photos (besides your friends and VIPs).', "Kullanıcılar size fotoğrafsız mesaj yazabilir mi (arkadaşlarınız ve VIP'leriniz dışında).", "Foydalanuvchilar sizga fotosuratlarsiz (do'stlaringiz va VIPlardan tashqari) xabar yozishlari mumkinmi?")

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
            <View>
                <TouchableOpacity onPress={() => setIsTrue(false)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <View style={{ width: 250 }}>
                        <StyledText style={{ fontSize: 14, paddingVertical: 12 }}>{firstText}</StyledText>
                        <StyledText style={{ fontSize: 12, paddingVertical: 12, color: '#757F8C', marginTop: -10 }}>{secondText}</StyledText>
                    </View>
                    <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { isTrue ? <SwitchDisabled /> : <SwitchEnabled /> }
                    </View>
                </TouchableOpacity>  

                <TouchableOpacity onPress={() => setIsTrue(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25}}>
                    <View style={{ width: 250 }}>
                        <StyledText style={{ fontSize: 14, paddingVertical: 12 }}>{thirdText}</StyledText>
                        <StyledText style={{ fontSize: 12, paddingVertical: 12, color: '#757F8C', marginTop: -10 }}>{fourthText}</StyledText>
                    </View>
                    <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { isTrue ? <SwitchEnabled /> : <SwitchDisabled /> }
                    </View>
                </TouchableOpacity>  
            </View>
        </View>
    )
}

export default InboxFilter
