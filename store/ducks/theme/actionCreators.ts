import { Action } from "redux";
import { Theme } from "./contracts/state";

export enum ThemeActionsType {
    SET_THEME = 'auth/SET_THEME',
}

export interface SetThemeActionInterface extends Action<ThemeActionsType> {
    type: ThemeActionsType.SET_THEME,
    payload: Theme['theme']
}

export const setTheme = (payload: Theme['theme']): SetThemeActionInterface => ({
    type: ThemeActionsType.SET_THEME,
    payload
})

export type ThemeActions = SetThemeActionInterface