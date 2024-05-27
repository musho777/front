import { takeEvery, call, put } from "@redux-saga/core/effects";
import { select } from 'redux-saga/effects'
import { sendAuth, AuthActionsType } from "./actionCreators";
import Api from "../../../service/api/api";
import { getAuthPayload } from "./selectors";
import { Auth } from "./contracts/state";

type Params = { payload: Auth, type: string }

export function* sendAuthRequest({ payload }: Params) {

    try {
        const res= yield call(Api.sendAuth, payload)

    } catch (error) {
    }
    
}

export function* authSaga() {
    yield takeEvery(AuthActionsType.SEND_AUTH, sendAuthRequest)
}