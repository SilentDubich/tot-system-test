import {AppStateType, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";
import Pendalf from "../../DataBase/imgs/pendalf.jpg";
type ActionProfileType = InferActionsTypes<typeof actionsProfile>
type ThunkProfileType = ThunkAction<Promise<void>, AppStateType, unknown, ActionProfileType>
export const actionsProfile = {
    setProfile: (user: ProfileType) => ({type: 'profileReducer/setProfile', user} as const)
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
}

type initialStateType = typeof initialState

export const profileInstructions = (state = initialState, action: ActionProfileType): initialStateType => {
    switch (action.type) {
        case "profileReducer/setProfile":
            return {...state, profileData: action.user}
        default:
            return state
    }
}
