import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { getToken } from '../../service/asyncStorage'
import { ApiRequests } from '../../service/api/api'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CoinIcon from './../../assets/images/coin.svg'
import useAuth from '../../hooks/useAuth'
import { setVip } from '../../store/ducks/auth/actionCreators'



function BuyVipScreen({ navigation }: any) {
    const [ currentTarif, setCurrentTarif ] = useState<string>('1')
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isError, setIsError ] = useState<boolean>(false)

    const tarifs = {
        '1': getStringInCurrentLanguage('1 Месяц', '1 Month', '1 ay', '1 oy'),
        '3': getStringInCurrentLanguage('3 Месяца', '1 Months', '3 ay', '3 oy'),
        '12': getStringInCurrentLanguage('12 Месяцев', '12 Months', '12 ay', '12 oy'),
    }

    const amounts = {
        '1': 250,
        '3': 700,
        '12': 1000
    }

    const theme = useSelector(getCurrentTheme)

    const addText = getStringInCurrentLanguage('Подключить', 'Connect', 'Prize takmaya', 'Ulanish uchun')
    const periodText = getStringInCurrentLanguage('Период:', 'Period:', 'Dönem:', "Davr:")
    const errorText = getStringInCurrentLanguage('Недостаточно монет', 'Not enough coins', 'Hata', 'Xato')

    const Accordion = () => {
        switch(currentTarif) {
            case '1':
                return (
                    <View>
                        <TouchableOpacity onPress={toggleIsOpen} style={{ width: '90%', height: 49, alignSelf: 'center', backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', marginTop: 15, justifyContent: 'center' }}>                  
                            <StyledText style={{ marginLeft: 10, fontSize: 17 }}>{tarifs['1']}</StyledText>

                        </TouchableOpacity>
                        {isOpen ? <>
                        
                        <TouchableOpacity onPress={() => {
                            setCurrentTarif('3')
                            setIsOpen(false)
                        }} style={{ width: '90%', height: 49, alignSelf: 'center', backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', justifyContent: 'center' }}>                  
                            <StyledText style={{ marginLeft: 10, fontSize: 17 }}>{tarifs['3']}</StyledText>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setCurrentTarif('12')
                            setIsOpen(false)
                        }} style={{ width: '90%', height: 49, alignSelf: 'center', backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', justifyContent: 'center' }}>                  
                            <StyledText style={{ marginLeft: 10, fontSize: 17 }}>{tarifs['12']}</StyledText>

                        </TouchableOpacity>
                        </>: <></>}
                    </View>
                )
                case '3':
                    return (
                        <View>
                            <TouchableOpacity onPress={toggleIsOpen} style={{ width: '90%', height: 49, alignSelf: 'center', backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', marginTop: 15, justifyContent: 'center' }}>                  
                                <StyledText style={{ marginLeft: 10, fontSize: 17 }}>{tarifs['3']}</StyledText>
    
                            </TouchableOpacity>
                            {isOpen ? <>
                            
                            <TouchableOpacity onPress={() => {
                                setCurrentTarif('1')
                                setIsOpen(false)
                            }} style={{ width: '90%', height: 49, alignSelf: 'center', backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', justifyContent: 'center' }}>                  
                                <StyledText style={{ marginLeft: 10, fontSize: 17 }}>{tarifs['1']}</StyledText>
    
                            </TouchableOpacity>
    
                            <TouchableOpacity onPress={() => {
                                setCurrentTarif('12')
                                setIsOpen(false)
                            }} style={{ width: '90%', height: 49, alignSelf: 'center', backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', justifyContent: 'center' }}>                  
                                <StyledText style={{ marginLeft: 10, fontSize: 17 }}>{tarifs['12']}</StyledText>
    
                            </TouchableOpacity>
                            </>: <></>}
                        </View>
                    )
                    case '12':
                        return (
                            <View>
                                <TouchableOpacity onPress={toggleIsOpen} style={{ width: '90%', height: 49, alignSelf: 'center', backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', marginTop: 15, justifyContent: 'center' }}>                  
                                    <StyledText style={{ marginLeft: 10, fontSize: 17 }}>{tarifs['12']}</StyledText>
        
                                </TouchableOpacity>
                                {isOpen ? <>
                                
                                <TouchableOpacity onPress={() => {
                                    setCurrentTarif('1')
                                    setIsOpen(false)
                                }} style={{ width: '90%', height: 49, alignSelf: 'center', backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', justifyContent: 'center' }}>                  
                                    <StyledText style={{ marginLeft: 10, fontSize: 17 }}>{tarifs['1']}</StyledText>
        
                                </TouchableOpacity>
        
                                <TouchableOpacity onPress={() => {
                                    setCurrentTarif('3')
                                    setIsOpen(false)
                                }} style={{ width: '90%', height: 49, alignSelf: 'center', backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', justifyContent: 'center' }}>                  
                                    <StyledText style={{ marginLeft: 10, fontSize: 17 }}>{tarifs['3']}</StyledText>
        
                                </TouchableOpacity>
                                </>: <></>}
                            </View>
                        )
                    default:
                        return <></>
        }
    }

    const dispatch = useDispatch()

    const handleBuyVip = () => {
        getToken().then(t => ApiRequests.buyVipStatus(t, currentTarif).then(d => {
            dispatch(setVip(true))
            navigation.navigate('TabOne')
        }).catch(e => setIsError(true))).catch(e => setIsError(true))
    }

    const toggleIsOpen = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1 }}>
            <View style={{ marginLeft: '8%', justifyContent: 'space-between', flexDirection: 'row' }}>
                <StyledText>{periodText}</StyledText>

                <View style={{ flexDirection: 'row', marginRight: '8%' }}>
                    <StyledText style={{ marginRight: 1}}>{amounts[currentTarif]}</StyledText>
                    <CoinIcon style={{ marginTop: 3, marginRight: 3 }} />
                    <StyledText>{`= ${amounts[currentTarif]}₽ `}</StyledText>
                </View>
            </View>
            
            <Accordion />

            { isError && <StyledText style={{ alignSelf: 'center', marginTop: 10 }}>{errorText}</StyledText> }

            <TouchableOpacity onPress={handleBuyVip} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>{addText}</Text></TouchableOpacity>
        </View>
    )
}

export default BuyVipScreen
