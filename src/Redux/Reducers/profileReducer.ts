import {AppStateType, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";
import {api} from "../API";
// import Pendalf from '../../DataBase/imgs/pendalf.jpg'

type ActionProfileType = InferActionsTypes<typeof actionsProfile>
type ThunkProfileType = ThunkAction<Promise<void>, AppStateType, unknown, ActionProfileType>
export const actionsProfile = {
    setProfile: (user: ProfileType) => ({type: 'profileReducer/setProfile', user} as const),
    setLogData: (data: LogData) => ({type: 'profileReducer/setLogData', data} as const),
    updLogEmail: (email: string) => ({type: 'profileReducer/updLogEmail', email} as const),
    updLogPassw: (password: string) => ({type: 'profileReducer/updLogPassw', password} as const)
}

export const updateProfileInfoThunk = (userId: number | null, fn: string, sn: string, status: string): ThunkProfileType => {
    return async (dispatch) => {
        let data = await api.updateProfileInfo(userId, fn, sn, status)
        await dispatch(actionsProfile.setProfile(data.data[0]))
    }
}

export const updateProfilePhoto = (photo: any): ThunkProfileType => {
    return async (dispatch) => {
        // debugger
        // let data = await api.updateProfilePhoto(photo)
        // debugger
    }
}

export const authProfileThunk = (email: string, password: string): ThunkProfileType => {
    return async (dispatch) => {
        let data = await api.postLog(email, password)
        dispatch(actionsProfile.setLogData(data.data))
        await dispatch(getProfileThunk(data.data.userId))
    }
}

export const logOutProfileThunk = (): ThunkProfileType => {
    return async (dispatch) => {
        let data = await api.postLogOut()
        dispatch(actionsProfile.setLogData(data.data))
        let profileData = {
            userId: null,
            firstName: null,
            secondName: null,
            status: null,
            avatar: undefined
        }
        dispatch(actionsProfile.setProfile(profileData))
    }
}

export const registerProfileThunk = (email: string, password: string): ThunkProfileType => {
    return async (dispatch) => {
        let data = await api.postRegister(email, password)
        dispatch(actionsProfile.setLogData(data.data))
    }
}

export const getAuthThunk = (): ThunkProfileType => {
    return async (dispatch) => {
        let data = await api.getAuth()
        await dispatch(getProfileThunk(data.data.userId))
        dispatch(actionsProfile.setLogData(data.data))
    }
}

export const getProfileThunk = (userId: number): ThunkProfileType => {
    return async (dispatch) => {
        let data = await api.getProfile(userId)
        dispatch(actionsProfile.setProfile(data.data))
    }
}

type LogData = {
    userId: number | null
    email: string | null
    isLogged: boolean | null
}
export type ProfileType = {
    userId: number | null
    firstName: string | null
    secondName: string | null
    status: string | null
    avatar: string | undefined
}

let initialState = {
    profileData: {} as ProfileType,
    loginData: {} as LogData,
    logText: {
        email: 'kirill.dubov.2012@mail.ru',
        password: 'qwerty'
    },
    dataToEdit: {
        firstName: '',
        secondName: '',
        status: ''
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
