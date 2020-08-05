import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {profileInstructions} from "./Reducers/profileReducer";
import {messageInstructions} from "./Reducers/messageReducer";


let allReduces = combineReducers(
    {
        profileReducer: profileInstructions,
        msgReducer: messageInstructions
    }
);

type AllReducersType = typeof allReduces
export type AppStateType = ReturnType<AllReducersType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export const store = createStore(allReduces, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
