import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTheme } from '../../store/ducks/theme/selectors'
import { Themes } from '../../store/ducks/theme/contracts/state'
import StyledText from '../../components/Typography/StyledText'
import getStringInCurrentLanguage from '../../service/getStringInCurrentLanguage'
import { getToken } from '../../service/asyncStorage'
import { ApiRequests } from '../../service/api/api'
import { setAge, setName } from '../../store/ducks/auth/actionCreators'


function RecentConnections({ navigation }: any) {
    const [ lastConnects, setLastConnects ] = useState<[]>([])

    const theme = useSelector(getCurrentTheme)

    useEffect(() => {
        getToken().then(t => {
            ApiRequests.me(t).then(u => setLastConnects(u.lastConnects))
        })
    }, [lastConnects])

    return (
        <View style={{ backgroundColor: theme === Themes.DARK ? '#252931' : 'white', flex: 1,  }}>
            {  
                lastConnects ? lastConnects.map(l => (
                    <View style={{ backgroundColor: theme === Themes.DARK ? '#292D36' : '#F1F1F1', width: '90%', height: 49, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <StyledText style={{ marginRight: 10, marginLeft: 10 }}>{l.split('-')[0]}</StyledText>
                        <StyledText style={{ marginRight: 10, marginLeft: 10 }}>{l.split('-')[1].split(':')[l.split('-')[1].split(':').length - 1]}</StyledText>
                    </View>
                )) : <></>
            }
            

            {/* <TouchableOpacity onPress={handleChangeName} activeOpacity={0.8} style={{ width: '90%', alignSelf: 'center', alignItems: 'center', height: 49, backgroundColor: '#EF3672', justifyContent: 'center', borderRadius: 50, marginTop: 20 }}><Text style={{ color: 'white', fontSize: 17 }}>OK</Text></TouchableOpacity> */}
        </View>
    )
}

export default RecentConnections
