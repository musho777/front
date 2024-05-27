import { Action } from "redux";
import { Auth } from "./contracts/state";

export enum AuthActionsType {
    SET_NAME = 'auth/SET_NAME',
    SET_EMAIL = 'auth/SET_EMAIL',
    SET_PASSWORD = 'auth/SET_PASSWORD',
    SET_PHONE = 'auth/SET_PHONE',
    SET_CITY = 'auth/SET_CITY',
    SET_AGE = 'auth/SET_AGE',
    SET_POINTOFDATE = 'auth/SET_POINTOFDATE',
    SET_INFO = 'auth/SET_INFO',
    SET_AVATAR = 'auth/SET_AVATAR',
    SET_FAMILYSTATUS = 'auth/SET_FAMILYSTATUS',
    SET_CHILDREN = 'auth/SET_CHILDREN',
    SET_SEX = 'auth/SET_SEX',
    SET_ID = 'auth/SET_ID',
    SET_BALANCE = 'auth/SET_BALANCE',
    SET_VIP = 'auth/SET_VIP',
    SET_HEIGHT = 'auth/SET_HEIGHT',
    SET_WEIGHT = 'auth/SET_WEIGHT',
    SET_OWNAPARTS = 'auth/SET_OWNAPARTS',
    SET_OWNCAR = 'auth/SET_OWNCAR',
    SET_BADHABITS = 'auth/SET_BADHABITS',
    SET_MONEYCONDITION = 'auth/SET_MONEYCONDITION',
    SET_EDUCATION = 'auth/SET_EDUCATION',
    SET_ORIENTATION = 'auth/SET_ORIENTATION',
    SET_TYPEOFAPPEARANCE = 'auth/SET_TYPEOFAPPEARANCE',
    SET_RELIGION = 'auth/SET_RELIGION',
    SET_ZODIAC = 'auth/SET_ZODIAC',
    SET_EASTYEAR = 'auth/SET_EASTYEAR',
    SET_LANGUAGES = 'auth/SET_LANGUAGES',
    SET_GALLERY = 'auth/SET_GALLERY',

    SET_SMOKING = 'auth/SET_SMOKING',
    SET_DRUGS = 'auth/SET_DRUGS',
    SET_ALCOHOL = 'auth/SET_ALCOHOL',
    SET_GAMBLING = 'auth/SET_GAMBLING',
}

export interface SetNameActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_NAME,
    payload: Auth['fullName']
}

export interface SetEmailActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_EMAIL,
    payload: Auth['email']
}

export interface SetPasswordActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_PASSWORD,
    payload: Auth['password']
}

export interface SetPhoneActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_PHONE,
    payload: Auth['phone']
}

export interface SetLocationActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_CITY,
    payload: Auth['city']
}

export interface SetAgeActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_AGE,
    payload: Auth['age']
}

export interface SetVipActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_VIP,
    payload: Auth['vip']
}

export interface SetPointOfDateActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_POINTOFDATE,
    payload: Auth['pointOfDate']
}

export interface SetInfoActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_INFO,
    payload: Auth['info']
}

export interface SetGalleryActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_GALLERY,
    payload: Auth['gallery']
}

export interface SetAvatarActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_AVATAR,
    payload: Auth['avatar']
}

export interface SetFamilyStatusActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_FAMILYSTATUS,
    payload: Auth['familyStatus']
}

export interface SetChildrenActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_CHILDREN,
    payload: Auth['children']
}

export interface SetSexActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_SEX,
    payload: Auth['sex']
}

export interface SetIdActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_ID,
    payload: Auth['id']
}

export interface SetBalanceActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_BALANCE,
    payload: Auth['balance']
}

export interface SetHeightActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_HEIGHT,
    payload: Auth['height']
}

export interface SetWeightActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_WEIGHT,
    payload: Auth['weight']
}

export interface SetOwnApartsActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_OWNAPARTS,
    payload: Auth['ownAparts']
}

export interface SetOwnCarActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_OWNCAR,
    payload: Auth['ownCar']
}

export interface SetBadHabitsActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_BADHABITS,
    payload: Auth['badHabits']
}

export interface SetMoneyConditionActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_MONEYCONDITION,
    payload: Auth['moneyCondition']
}

export interface SetEducationActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_EDUCATION,
    payload: Auth['education']
}

export interface SetOrientationActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_ORIENTATION,
    payload: Auth['orientation']
}

export interface SetTypeOfAppearanceActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_TYPEOFAPPEARANCE,
    payload: Auth['typeOfAppearance']
}

export interface SetReligionActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_RELIGION,
    payload: Auth['religion']
}

export interface SetReligionActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_RELIGION,
    payload: Auth['religion']
}

export interface SetZodiacActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_ZODIAC,
    payload: Auth['zodiac']
}

export interface SetEastYearActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_EASTYEAR,
    payload: Auth['eastYear']
}

export interface SetLanguagesActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_LANGUAGES,
    payload: Auth['languages']
}

export interface SetSmokingActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_SMOKING,
    payload: Auth['smoking']
}

export interface SetAlcoholActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_ALCOHOL,
    payload: Auth['alcohol']
}

export interface SetDrugsActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_DRUGS,
    payload: Auth['drugs']
}

export interface SetGamblingActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_GAMBLING,
    payload: Auth['gambling']
}

export const setName = (payload: Auth['fullName']): SetNameActionInterface => ({
    type: AuthActionsType.SET_NAME,
    payload
})

export const setEmail = (payload: Auth['email']): SetEmailActionInterface => ({
    type: AuthActionsType.SET_EMAIL,
    payload
})

export const setPassword = (payload: Auth['email']): SetPasswordActionInterface => ({
    type: AuthActionsType.SET_PASSWORD,
    payload
})

export const setPhone = (payload: Auth['phone']): SetPhoneActionInterface => ({
    type: AuthActionsType.SET_PHONE,
    payload
})

export const setCity = (payload: Auth['city']): SetLocationActionInterface => ({
    type: AuthActionsType.SET_CITY,
    payload
})

export const setAge = (payload: Auth['age']): SetAgeActionInterface => ({
    type: AuthActionsType.SET_AGE,
    payload
})

export const setVip = (payload: Auth['vip']): SetVipActionInterface => ({
    type: AuthActionsType.SET_VIP,
    payload
})

export const setPointOfDate = (payload: Auth['pointOfDate']): SetPointOfDateActionInterface => ({
    type: AuthActionsType.SET_POINTOFDATE,
    payload
})

export const setInfo = (payload: Auth['info']): SetInfoActionInterface => ({
    type: AuthActionsType.SET_INFO,
    payload
})

export const setAvatar = (payload: Auth['avatar']): SetAvatarActionInterface => ({
    type: AuthActionsType.SET_AVATAR,
    payload
})

export const setFamilyStatus = (payload: Auth['familyStatus']): SetFamilyStatusActionInterface => ({
    type: AuthActionsType.SET_FAMILYSTATUS,
    payload
})

export const setChildren = (payload: Auth['children']): SetChildrenActionInterface => ({
    type: AuthActionsType.SET_CHILDREN,
    payload
})

export const setSex = (payload: Auth['sex']): SetSexActionInterface => ({
    type: AuthActionsType.SET_SEX,
    payload
})

export const setId = (payload: Auth['id']): SetIdActionInterface => ({
    type: AuthActionsType.SET_ID,
    payload
})

export const setBalance = (payload: Auth['balance']): SetBalanceActionInterface => ({
    type: AuthActionsType.SET_BALANCE,
    payload
})

export const setHeight = (payload: Auth['height']): SetHeightActionInterface => ({
    type: AuthActionsType.SET_HEIGHT,
    payload
})

export const setWeight = (payload: Auth['weight']): SetWeightActionInterface => ({
    type: AuthActionsType.SET_WEIGHT,
    payload
})

export const setOwnAparts = (payload: Auth['ownAparts']): SetOwnApartsActionInterface => ({
    type: AuthActionsType.SET_OWNAPARTS,
    payload
})

export const setOwnCar = (payload: Auth['ownCar']): SetOwnCarActionInterface => ({
    type: AuthActionsType.SET_OWNCAR,
    payload
})

export const setBadHabits = (payload: Auth['badHabits']): SetBadHabitsActionInterface => ({
    type: AuthActionsType.SET_BADHABITS,
    payload
})

export const setMoneyCondition = (payload: Auth['moneyCondition']): SetMoneyConditionActionInterface => ({
    type: AuthActionsType.SET_MONEYCONDITION,
    payload
})

export const setEducation = (payload: Auth['education']): SetEducationActionInterface => ({
    type: AuthActionsType.SET_EDUCATION,
    payload
})

export const setOrientation = (payload: Auth['orientation']): SetOrientationActionInterface => ({
    type: AuthActionsType.SET_ORIENTATION,
    payload
})

export const setTypeOfAppearance = (payload: Auth['typeOfAppearance']): SetTypeOfAppearanceActionInterface => ({
    type: AuthActionsType.SET_TYPEOFAPPEARANCE,
    payload
})

export const setReligion = (payload: Auth['religion']): SetReligionActionInterface => ({
    type: AuthActionsType.SET_RELIGION,
    payload
})

export const setZodiac = (payload: Auth['zodiac']): SetZodiacActionInterface => ({
    type: AuthActionsType.SET_ZODIAC,
    payload
})

export const setEastYear = (payload: Auth['eastYear']): SetEastYearActionInterface => ({
    type: AuthActionsType.SET_EASTYEAR,
    payload
})

export const setLanguages = (payload: Auth['languages']): SetLanguagesActionInterface => ({
    type: AuthActionsType.SET_LANGUAGES,
    payload
})

export const setGallery = (payload: Auth['gallery']): SetGalleryActionInterface => ({
    type: AuthActionsType.SET_GALLERY,
    payload
})

export const setSmoking = (payload: Auth['smoking']): SetSmokingActionInterface => ({
    type: AuthActionsType.SET_SMOKING,
    payload
})

export const setAlcohol = (payload: Auth['alcohol']): SetAlcoholActionInterface => ({
    type: AuthActionsType.SET_ALCOHOL,
    payload
})

export const setDrugs = (payload: Auth['drugs']): SetDrugsActionInterface => ({
    type: AuthActionsType.SET_DRUGS,
    payload
})

export const setGambling = (payload: Auth['gambling']): SetGamblingActionInterface => ({
    type: AuthActionsType.SET_GAMBLING,
    payload
})

export type AuthActions = SetNameActionInterface | SetEmailActionInterface | SetPasswordActionInterface | SetPhoneActionInterface | SetLocationActionInterface | SetAgeActionInterface | SetPointOfDateActionInterface | SetInfoActionInterface | SetAvatarActionInterface | SetFamilyStatusActionInterface | SetChildrenActionInterface | SetSexActionInterface | SetIdActionInterface | SetBalanceActionInterface | SetVipActionInterface | SetWeightActionInterface | SetHeightActionInterface | SetOwnApartsActionInterface | SetOwnCarActionInterface | SetBadHabitsActionInterface | SetMoneyConditionActionInterface | SetEducationActionInterface | SetOrientationActionInterface | SetTypeOfAppearanceActionInterface | SetReligionActionInterface | SetZodiacActionInterface | SetEastYearActionInterface | SetLanguagesActionInterface | SetGalleryActionInterface | SetSmokingActionInterface | SetAlcoholActionInterface | SetDrugsActionInterface | SetGamblingActionInterface