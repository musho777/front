import produce, { Draft } from 'immer'
import { MatchingActions, MatchingActionsType } from './actionCreators'
import { Matching } from './contracts/state'

const initialMatchingState: Matching = {
    users: []
}

export const matchingReducer = produce((draft: Draft<Matching>, action: MatchingActions) => {

    switch (action.type) {
        case MatchingActionsType.SET_USERS:
            draft.users = action.payload
            break;
        default:
            break;
    }

}, initialMatchingState)