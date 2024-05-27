import produce, { Draft } from 'immer'
import { AuthorizationActions, AuthorizationActionsType } from './actionCreators'
import { Authorization } from './contracts/state'

const initialAuthorizationState: Authorization = {
    isAuthorized: false
}

export const authorizationReducer = produce((draft: Draft<Authorization>, action: AuthorizationActions) => {

    switch (action.type) {
        case AuthorizationActionsType.SET_ISAUTHORIZED:
            draft.isAuthorized = action.payload
            break;
        default:
            break;
    }

}, initialAuthorizationState)