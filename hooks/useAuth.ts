import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApiRequests } from '../service/api/api';
import { getToken, storeToken } from '../service/asyncStorage';
import { setAge, setAlcohol, setAvatar, setBalance, setChildren, setCity, setDrugs, setEastYear, setEducation, setFamilyStatus, setGallery, setGambling, setHeight, setId, setInfo, setLanguages, setMoneyCondition, setName, setOrientation, setOwnAparts, setOwnCar, setPhone, setPointOfDate, setSex, setSmoking, setTypeOfAppearance, setVip, setWeight, setZodiac } from '../store/ducks/auth/actionCreators';
import { getAuthPayload } from '../store/ducks/auth/selectors';
import { setIsAuthorized } from '../store/ducks/authorization/actionCreators';
import { getIsAuthorized } from '../store/ducks/authorization/selectors';

export default function useAuth() {
    const [ tokenS, setTokenS ] = useState<string>('')
    const dispatch = useDispatch()
    const user = useSelector(getAuthPayload)
    const isAuthorized = useSelector(getIsAuthorized)

    useEffect(() => {
        getToken().then(t => {
            setTokenS(t)
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
                dispatch(setIsAuthorized(true))
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
            }).catch(e => dispatch(setIsAuthorized(false)))
        })
    }, [])

    const signOut = () => { 
        storeToken('').then(t => dispatch(setIsAuthorized(false)))
    }

    const signIn = () => {
        dispatch(setIsAuthorized(true))
    }
    
    return { user, token: tokenS, signIn, isAuthorized, signOut }
}