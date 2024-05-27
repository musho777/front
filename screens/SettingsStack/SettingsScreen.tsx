import React from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import ArrowLeftBlack from '../../assets/images/arrowleftblack.svg'
import ArrowLeftWhite from '../../assets/images/arrowleftwhite.svg'


function SettingsScreen({ navigation }: any) {
    const theme = useSelector(getCurrentTheme)

    const appearanceText = getStringInCurrentLanguage('Внешний вид', 'Appearance', 'Dış görünüş', "Tashqi ko'rinish")
    const colorThemeText = getStringInCurrentLanguage('Тема', 'Color theme', 'Renk teması', "Rang mavzusi")
    const personalDataText = getStringInCurrentLanguage('Личные данные', 'Personal data', 'Kişisel veri', "Shaxsiy ma'lumotlar")
    const changeNameText = getStringInCurrentLanguage('Изменение имени', 'Change name', 'İsim değişikliği', "Ism o'zgarishi")
    const changeCityText = getStringInCurrentLanguage('Изменение города', 'City change', 'Şehir değişikliği', "Shahar o'zgarishi")
    const changeAgeText = getStringInCurrentLanguage('Изменение возраста', 'Change age', 'Yaş değişikliği', "Yosh o'zgarishi")
    const safetyText = getStringInCurrentLanguage('Безопасность', 'Safety', 'Emniyet', "Xavfsizlik")
    const changePasswordText = getStringInCurrentLanguage('Изменение пароля', 'Change password', 'Sifre değiştir', "Parolni o'zgartirish")
    const changePhoneNumberText = getStringInCurrentLanguage('Изменение номера телефона', 'Change phone number', 'Telefon numaranızı değiştirme', "Telefon raqamingizni o'zgartirish")
    const accountDeletionText = getStringInCurrentLanguage('Удаление аккаунта', 'Delete account', 'Hesap silme', "Hisobni o'chirish")
    const recentConnectionsText = getStringInCurrentLanguage('Последние подключения', 'Recent connections', 'Son bağlantılar', "Oxirgi ulanishlar")
    const notificationsText = getStringInCurrentLanguage('Уведомления', 'Notifications', 'Bildirimler', "Bildirishnomalar")
    const mailNotificationsText = getStringInCurrentLanguage('Оповещения по почте', 'Email notifications', 'E-posta uyarıları', "Elektron pochta xabarlari")
    const filterText = getStringInCurrentLanguage('Фильтр входящих сообщений', 'Inbox Filter', 'Gelen Kutusu Filtresi', "Kiruvchi quti filtri")
    const notificationSettingsText = getStringInCurrentLanguage('Настройка уведомлений', 'Notification settings', 'Bildirim ayarları', "Bildirishnoma sozlamalari")

    return (
        <ScrollView style={{ backgroundColor: theme === Themes.DARK ? '#252931' : '#F1F1F1', flex: 1 }}>
            <View>

                <View style={{ marginBottom: 5 }}>
                    <StyledText style={{ color: '#757F8C', marginBottom: 7, marginTop: 8, paddingLeft: 25 }}>{appearanceText}</StyledText>

                    <TouchableOpacity onPress={() => navigation.push('ColorTheme')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{colorThemeText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 5 }}>
                    <StyledText style={{ color: '#757F8C', marginBottom: 7, marginTop: 8, paddingLeft: 25 }}>{personalDataText}</StyledText>

                    <TouchableOpacity onPress={() => navigation.push('ChangeName')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{changeNameText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push('ChangeAge')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{changeAgeText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push('ChangeCity')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{changeCityText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 5 }}>
                    <StyledText style={{ color: '#757F8C', marginBottom: 7, marginTop: 8, paddingLeft: 25 }}>{safetyText}</StyledText>

                    <TouchableOpacity onPress={() => navigation.push('ChangePassword')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{changePasswordText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push('ChangePhoneNumber')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{changePhoneNumberText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push('RecentConnections')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{recentConnectionsText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 5 }}>
                    <StyledText style={{ color: '#757F8C', marginBottom: 7, marginTop: 8, paddingLeft: 25 }}>{notificationsText}</StyledText>

                    <TouchableOpacity onPress={() => navigation.push('NotificationSettings')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{notificationSettingsText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push('MailNotifications')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{mailNotificationsText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push('InboxFilter')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{filterText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 5 }}>
                    <StyledText style={{ color: '#757F8C', marginBottom: 7, marginTop: 8, paddingLeft: 25 }}>{accountDeletionText}</StyledText>

                    <TouchableOpacity onPress={() => navigation.push('DeleteAccount')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{accountDeletionText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>
                </View>

                {/* <View style={{ marginBottom: 5 }}>
                    <StyledText style={{ color: '#757F8C', marginBottom: 7, marginTop: 8, paddingLeft: 25 }}>{supportText}</StyledText>

                    <TouchableOpacity onPress={() => navigation.push('TechSupportScreen')} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme === Themes.DARK ? '#292D36' : 'white', paddingLeft: 25}}>
                        <StyledText style={{ fontSize: 16, paddingVertical: 12 }}>{supportText}</StyledText>
                        <View style={{ marginRight: 25, paddingVertical: 12, marginTop: 5 }}>
                            { theme === Themes.DARK ? <ArrowLeftWhite /> : <ArrowLeftBlack /> }
                        </View>
                    </TouchableOpacity>
                </View> */}
        
            </View>
        </ScrollView>
    )
}

export default SettingsScreen
