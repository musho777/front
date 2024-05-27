import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { View } from '../../components/Themed';
import StyledText from '../../components/Typography/StyledText';
import { Auth } from '../../store/ducks/auth/contracts/state';
import { useIsFocused } from '@react-navigation/native';
import { getToken } from '../../service/asyncStorage';
import { ApiRequests, SocketURL, URL } from '../../service/api/api';
import MessageIcon from './../../assets/images/message.svg'
import io from 'socket.io-client'
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../store/ducks/theme/selectors';
import { Themes } from '../../store/ducks/theme/contracts/state';
import SmileBlack from '../../assets/images/smileblack.svg'

export default function TechSupportScreen({ navigation, route }: any) {
    const [ messages, setMessages ] = useState([])
    const [ messageText, setMessageText ] = useState<string>('')
    const [ isStickersOpen, setIsStickersOpen ] = useState<boolean>(false)
    const { user } = useAuth()
    const isFocused = useIsFocused()
    const scroll = useRef(null)

    const theme = useSelector(getCurrentTheme)

    const handleSendMessage = () => {
        if(messageText) {
            getToken().then(t => ApiRequests.sendSupportMessage(t, messageText).then(u => ApiRequests.getSupportMessages(t).then(u => setMessages(u)).catch(e => console.error(e))).catch(e => console.error(e))).catch(e => console.error(e))
            setMessageText('')
        }
    }

    useEffect(() => {
        getToken().then(t => ApiRequests.getSupportMessages(t).then(u => setMessages(u)).catch(e => console.error(e))).catch(e => console.error(e))

    }, [messages])

    const handleToggleStickers = () => {
        if (isStickersOpen) setIsStickersOpen(false)
        if (!isStickersOpen) setIsStickersOpen(true)
    }

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white'}}>
            <ScrollView ref={scroll} contentOffset={{ x: 0, y: 100000000 }} style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', height: isStickersOpen ? '60%' : '90%', marginTop: 10 }}>
                    { messages ? messages.map(m => (
                        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', marginBottom: 10 }}>
                            { m.fromSupport ? 
                            <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <View style={styles.messageToMe}>
                                    <StyledText style={styles.messageToMeText}>{m.text}</StyledText>
                                </View>
                            </TouchableOpacity>
                            : 
                            <View style={{ alignSelf: 'flex-end', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                <View style={{ flexDirection: 'row', backgroundColor: theme === Themes.DARK ? '#252931' : 'white' }}>
                                    <View style={styles.myMessage}>
                                        <StyledText style={styles.myMessageText}>{m.text}</StyledText>
                                    </View>
                                </View>
                            </View>
                            }                  
                        </View>
                    )) : <></> }
            </ScrollView>
            <View style={{ alignItems: 'center', backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flexDirection: 'row', justifyContent: 'center', marginTop: -60, marginBottom: 50 }}>
                <View style={{ ...styles.textInputContainer, ...{ backgroundColor: theme === Themes.DARK ? '#2f333d' : '#D6D9E473' }}}>
                    <TextInput style={{ width: 175, color: theme === Themes.DARK ? '#ffffff' : 'black', marginLeft: 8 }} placeholder='Введите сообщение' value={messageText} onChangeText={t => setMessageText(t)} />
                    <TouchableOpacity onPress={handleSendMessage} style={{ width: 45, height: 45, backgroundColor: '#EF3672', justifyContent: 'center', alignItems: 'center', borderRadius: 50, marginRight: 12 }}><MessageIcon style={{ width: 30, height: 30 }} /></TouchableOpacity>
                </View>
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '95%',
        paddingLeft: 17,
        paddingRight: 17,
        alignSelf: 'center',
        marginBottom: 25,
    },
    myMessage: {
        backgroundColor: '#EF3672',
        textAlign: 'right',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        color: 'white',
        marginRight: 20,
        maxWidth: 200,
        borderRadius: 6,
    },
    
    messageToMe: {
        backgroundColor: '#D6D9E480',
        marginLeft: 20,
        maxWidth: 200,
        alignSelf: 'flex-start',
        borderRadius: 6
    },

    myMessageText: {
        color: 'white',
        paddingRight: 20,
        paddingLeft: 20,
        paddingVertical: 17,
        
    },
    messageToMeText: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 17,
    },

    myMessageTextTime: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 5,
        marginBottom: 10,
        alignSelf: 'flex-end',
        color: '#757F8C',
        fontSize: 10
    },
    messageToMeTextTime: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 5,
        marginBottom: 10,
        color: '#757F8C',
        fontSize: 10
    },

    textInputContainer: {
        backgroundColor: '#D6D9E473',
        width: '88%',
        paddingVertical: 10,
        paddingLeft: 20,
        borderRadius: 30,
        marginBottom: 20,
        marginTop: 5,
        justifyContent: 'space-between', flexDirection: 'row'
    }
});
