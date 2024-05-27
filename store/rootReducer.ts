import { combineReducers } from "redux";
import { authReducer } from "./ducks/auth/reducer";
import { authorizationReducer } from "./ducks/authorization/reducer";
import { languageReducer } from "./ducks/language/reducer";
import { matchingReducer } from "./ducks/matching/reducer";
import { themeReducer } from "./ducks/theme/reducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    matching: matchingReducer,
    authorization: authorizationReducer,
    language: languageReducer,
    theme: themeReducer
})