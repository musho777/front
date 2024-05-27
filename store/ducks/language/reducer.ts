import produce, { Draft } from 'immer'
import { LanguageActions, LanguageActionsType } from './actionCreators'
import { Language, Languages } from './contracts/state'

const initialLanguageState: Language = {
    language: Languages.RU
}

export const languageReducer = produce((draft: Draft<Language>, action: LanguageActions) => {

    switch (action.type) {
        case LanguageActionsType.SET_LANGUAGE:
            draft.language = action.payload
            break;
        default:
            break;
    }

}, initialLanguageState)