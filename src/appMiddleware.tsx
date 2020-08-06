import React, {FC, useEffect} from "react";
import {connect} from "react-redux";
import {App} from "./App";
import {AppStateType} from "./Redux/store";
import {actionsProfile, getAuthThunk} from "./Redux/Reducers/profileReducer";
import {api} from "./Redux/API";

type PropsType = {
    getAuth: () => void
    isLogged: boolean | null
}

const AppMiddleware: FC<PropsType> = (props) => {
    useEffect(() => {
        (async () => {
            await props.getAuth()
        })()
    }, [])
    return (
        <div>
            {props.isLogged && <App/>}
        </div>

    )
}


let mapStateToProps = (state: AppStateType) => {
    return {
        isLogged: state.profileReducer.loginData.isLogged
    }
}



export const AppWrapper = connect(mapStateToProps, {getAuth: getAuthThunk})(AppMiddleware);
