import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, View, Image, ScrollView } from 'react-native';
import ImageViewer from "react-native-reanimated-image-viewer";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import ArrowLeftIcon from './../../assets/images/arrowleft.svg'
import ArrowRightIcon from './../../assets/images/arrowright.svg'
import KrestIcon from './../../assets/images/plus.svg'
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { URL, ApiRequests } from '../../service/api/api';
import { getToken } from '../../service/asyncStorage';
import { setGallery } from '../../store/ducks/auth/actionCreators';
import ImageView from "react-native-image-viewing";


function PhotoScreen({ navigation, route }: any) {
    const activeID = route.params.active | 0

    const [ active, setActive ] = useState<number>(activeID);

    const photoUrls = route.params.photosArray.map(p => ({ uri: URL + '/auth/pictures/' + p }))

    console.log(route.params.photosArray.map(p => ({ uri: URL + '/auth/pictures/' + p })))

    const dispatch = useDispatch()
    const { user } = useAuth()

    const [visible, setIsVisible] = useState(true);

    return (
        <ImageView
            images={photoUrls}
            imageIndex={activeID}
            visible={visible}
            onRequestClose={() => navigation.goBack()}
        />
    )
}

export default PhotoScreen
