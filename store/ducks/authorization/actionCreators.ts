import { Action } from "redux";
import { Authorization } from "./contracts/state";

export enum AuthorizationActionsType {
    SET_ISAUTHORIZED = 'auth/SET_ISAUTHORIZED',
}

export interface SetIsAuthorizedActionInterface extends Action<AuthorizationActionsType> {
    type: AuthorizationActionsType.SET_ISAUTHORIZED,
    payload: Authorization['isAuthorized']
}

export const setIsAuthorized = (payload: Authorization['isAuthorized']): SetIsAuthorizedActionInterface => ({
    type: AuthorizationActionsType.SET_ISAUTHORIZED,
    payload
})

export type AuthorizationActions = SetIsAuthorizedActionInterface