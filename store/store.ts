import { applyMiddleware, compose, createStore } from 'redux'
import { rootReducer } from './rootReducer';
import createSagaMiddleware from 'redux-saga'
import { Auth } from './ducks/auth/contracts/state';
import { Matching } from './ducks/matching/contracts/state';
import { Authorization } from './ducks/authorization/contracts/state';
import { Language } from './ducks/language/contracts/state';
import { Theme } from './ducks/theme/contracts/state';

const sagaMiddleware = createSagaMiddleware()

export interface RootState {
    auth: Auth,
    matching: Matching,
    authorization: Authorization,
    language: Language,
    theme: Theme
}

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))