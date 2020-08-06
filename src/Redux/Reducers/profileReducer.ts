import {AppStateType, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";
import Pendalf from "../../DataBase/imgs/pendalf.jpg";
import {api} from "../API";
type ActionProfileType = InferActionsTypes<typeof actionsProfile>
type ThunkProfileType = ThunkAction<Promise<void>, AppStateType, unknown, ActionProfileType>
export const actionsProfile = {
    setProfile: (user: ProfileType) => ({type: 'profileReducer/setProfile', user} as const),
    setLogData: (data: LogData) => ({type: 'profileReducer/setLogData', data} as const),
    updLogEmail: (email: string) => ({type: 'profileReducer/updLogEmail', email} as const),
    updLogPassw: (password: string) => ({type: 'profileReducer/updLogPassw', password} as const)
}

export const authProfileThunk = (email: string, password: string): ThunkProfileType => {
    return async (dispatch) => {
        let data = await api.postLog(email, password)
        dispatch(actionsProfile.setLogData(data.data))
    }
}

export const registerProfileThunk = (email: string, password: string): ThunkProfileType => {
    return async (dispatch) => {
        let data = await api.postRegister(email, password)
        dispatch(actionsProfile.setLogData(data.data))
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
    loginData: {} as LogData,
    logText: {
        email: 'kirill.dubov.2012@mail.ru',
        password: 'qwerty'
    }
}

type initialStateType = typeof initialState

export const profileInstructions = (state = initialState, action: ActionProfileType): initialStateType => {
    switch (action.type) {
        case "profileReducer/setProfile":
            return {...state, profileData: action.user}
        case "profileReducer/setLogData":
            return {...state, loginData: action.data}
        case "profileReducer/updLogEmail":
            return {...state, logText: {email: action.email, password: state.logText.password}}
        case "profileReducer/updLogPassw":
            return {...state, logText: {email: state.logText.email, password: action.password}}
        default:
            return state
    }
}
