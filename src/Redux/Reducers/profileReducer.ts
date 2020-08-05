import {AppStateType, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";
import Pendalf from "../../DataBase/imgs/pendalf.jpg";
type ActionProfileType = InferActionsTypes<typeof actionsProfile>
type ThunkProfileType = ThunkAction<Promise<void>, AppStateType, unknown, ActionProfileType>
export const actionsProfile = {
    setProfile: (user: ProfileType) => ({type: 'profileReducer/setProfile', user} as const),
    setLogData: (data: LogData) => ({type: 'profileReducer/setLogData', data} as const)
}

export const getProfileThunk = (email: string, password: string): ThunkProfileType => {
    return async (dispatch) => {

    }
}

type LogData = {
    userId: number
    email: string
    isLogged: boolean
}
type ProfileType = {
    userId: number,
    firstName: string,
    secondName: string,
    status: string,
    avatar: string
}

let initialState = {
    profileData: {
        userId: 0,
        firstName: 'Kirill',
        secondName: 'Dubov',
        status: 'Ya sdelyal',
        avatar: Pendalf
    } as ProfileType,
    loginData: {} as LogData
}

type initialStateType = typeof initialState

export const profileInstructions = (state = initialState, action: ActionProfileType): initialStateType => {
    switch (action.type) {
        case "profileReducer/setProfile":
            return {...state, profileData: action.user}
        case "profileReducer/setLogData":
            return {...state, loginData: action.data}
        default:
            return state
    }
}
