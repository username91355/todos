import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {todosReducer} from './reducers/todos-reducer/todos-reducer';

const rootReducer = combineReducers({
    todos: todosReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type TAppState = ReturnType<typeof rootReducer>;
export type TAppAction = any;

export type TAppThunk = ThunkAction<void, TAppState, unknown, TAppAction>;

//@ts-ignore
window.store = store;