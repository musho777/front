import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView, TouchableOpacity } from 'react-native'
import StyledText from '../../components/Typography/StyledText'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import { ApiRequests, URL } from '../../service/api/api'
import { getToken } from '../../service/asyncStorage'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'


function Stickers(props: any) {
    const [ stickers, setStickers ] = useState<[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const theme = useSelector(getCurrentTheme)

    const stickersText = getStringInCurrentLanguage(
        'У вас нет стикеров! Можете купить их в магазине.', 
        "You don't have stickers! You can buy them at the store.", 
        "Çıkartmanız yok! Bunları mağazadan satın alabilirsiniz.",
        "Sizda stikerlar yo'q! Siz ularni do'konda sotib olishingiz mumkin."
        )

    useEffect(() => {
        getToken().then(t => ApiRequests.getStickers(t).then(s => {
            setStickers(s)
            setIsLoading(false)
        }).catch(e => console.error(e))).catch(e => console.error(e))
    }, [])

    return (
        // <View style={{ height: '50%', width: '98%', backgroundColor: theme === Themes.DARK ? '#252931' : 'white', alignItems: 'center', marginTop: -20 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', marginBottom: 200 }} showsVerticalScrollIndicator={false} style={{ height: 200, width: '100%', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                { stickers.length === 0 && !isLoading && <View style={{ width: '93%' }}><StyledText>{stickersText}</StyledText></View>}
                <View style={{ display: 'flex',
                marginBottom: 30,
                flexDirection: 'row',
                flex: 1,
                flexWrap: 'wrap',
                alignSelf: 'center',
                justifyContent: 'center' }}>
                    { stickers && stickers.map(s => <TouchableOpacity onPress={() => props.sendSticker(s.id)}><Image style={{ height: 50, width: 50, marginRight: 10, marginBottom: 10 }} source = {{ uri: s.img ? `${URL}/auth/pictures/${s.img}` : ''}} /></TouchableOpacity> ) }

                    
                </View>
            </ScrollView>
        
    )
}

export default Stickers
