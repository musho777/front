import { Action } from "redux";
import { Language } from "./contracts/state";

export enum LanguageActionsType {
    SET_LANGUAGE = 'auth/SET_LANGUAGE',
}

export interface SetLanguageActionInterface extends Action<LanguageActionsType> {
    type: LanguageActionsType.SET_LANGUAGE,
    payload: Language['language']
}

export const setLanguage = (payload: Language['language']): SetLanguageActionInterface => ({
    type: LanguageActionsType.SET_LANGUAGE,
    payload
})

export type LanguageActions = SetLanguageActionInterface