import produce, { Draft } from 'immer'
import { ThemeActions, ThemeActionsType } from './actionCreators'
import { Theme, Themes } from './contracts/state'

const initialThemeState: Theme = {
    theme: Themes.LIGHT
}

export const themeReducer = produce((draft: Draft<Theme>, action: ThemeActions) => {

    switch (action.type) {
        case ThemeActionsType.SET_THEME:
            draft.theme = action.payload
            break;
        default:
            break;
    }

}, initialThemeState)