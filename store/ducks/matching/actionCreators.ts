import { Action } from "redux";
import { Matching } from "./contracts/state";

export enum MatchingActionsType {
    SET_USERS = 'auth/SET_USERS',
}

export interface SetUsersActionInterface extends Action<MatchingActionsType> {
    type: MatchingActionsType.SET_USERS,
    payload: Matching['users']
}

export const setUsers = (payload: Matching['users']): SetUsersActionInterface => ({
    type: MatchingActionsType.SET_USERS,
    payload
})

export type MatchingActions = SetUsersActionInterface