import produce, { Draft } from 'immer'
import { AuthActions, AuthActionsType } from './actionCreators'
import { Auth } from './contracts/state'
import getStringInCurrentLanguage from '../../../service/getStringInCurrentLanguage'

const initialAuthState: Auth = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    age: 18,
    pointOfDate: [],
    info: '',
    avatar: '',
    familyStatus: "",
    children: '',
    sex: false,
    gallery: [],
    vip: false,
    balance: 0,
    languages: []
}

export const authReducer = produce((draft: Draft<Auth>, action: AuthActions) => {
    switch (action.type) {
        case AuthActionsType.SET_NAME:
            draft.fullName = action.payload
            break;
        case AuthActionsType.SET_EMAIL:
            draft.email = action.payload
            break;
        case AuthActionsType.SET_PASSWORD:
            draft.password = action.payload
            break;
        case AuthActionsType.SET_PHONE:
            draft.phone = action.payload
            break;
        case AuthActionsType.SET_CITY:
            draft.city = action.payload
            break;
        case AuthActionsType.SET_AGE:
            draft.age = action.payload
            break;
        case AuthActionsType.SET_POINTOFDATE:
            draft.pointOfDate = action.payload
            break;
        case AuthActionsType.SET_INFO:
            draft.info = action.payload
            break;
        case AuthActionsType.SET_AVATAR:
            draft.avatar = action.payload
            break;
        case AuthActionsType.SET_FAMILYSTATUS:
            draft.familyStatus = action.payload
            break;
        case AuthActionsType.SET_CHILDREN:
            draft.children = action.payload
            break;
        case AuthActionsType.SET_SEX:
            draft.sex = action.payload
            break;
        case AuthActionsType.SET_ID:
            draft.id = action.payload
            break;
        case AuthActionsType.SET_BALANCE:
            draft.balance = action.payload
            break;
        case AuthActionsType.SET_VIP:
            draft.vip = action.payload
            break;
        case AuthActionsType.SET_HEIGHT:
            draft.height = action.payload
            break;
        case AuthActionsType.SET_WEIGHT:
            draft.weight = action.payload
            break;
        case AuthActionsType.SET_OWNAPARTS:
            draft.ownAparts = action.payload
            break;
        case AuthActionsType.SET_OWNCAR:
            draft.ownCar = action.payload
            break;
        case AuthActionsType.SET_BADHABITS:
            draft.badHabits = action.payload
            break;
        case AuthActionsType.SET_MONEYCONDITION:
            draft.moneyCondition = action.payload
            break;
        case AuthActionsType.SET_EDUCATION:
            draft.education = action.payload
            break;
        case AuthActionsType.SET_ORIENTATION:
            draft.orientation = action.payload
            break;
        case AuthActionsType.SET_TYPEOFAPPEARANCE:
            draft.typeOfAppearance = action.payload
            break;
        case AuthActionsType.SET_RELIGION:
            draft.religion = action.payload
            break;
        case AuthActionsType.SET_ZODIAC:
            draft.zodiac = action.payload
            break;
        case AuthActionsType.SET_EASTYEAR:
            draft.eastYear = action.payload
            break;
        case AuthActionsType.SET_LANGUAGES:
            draft.languages = action.payload
            break;
        case AuthActionsType.SET_GALLERY:
            draft.gallery = action.payload
            break;
        case AuthActionsType.SET_SMOKING:
            draft.smoking = action.payload
            break;
        case AuthActionsType.SET_ALCOHOL:
            draft.alcohol = action.payload
            break;
        case AuthActionsType.SET_DRUGS:
            draft.drugs = action.payload
            break;
        case AuthActionsType.SET_GAMBLING:
            draft.gambling = action.payload
            break;
        default:
            break;
    }

}, initialAuthState)