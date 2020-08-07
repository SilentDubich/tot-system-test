import React, {ComponentType, FC, useEffect} from "react";
import {connect} from "react-redux";
import {App} from "./App";
import {AppStateType} from "./Redux/store";
import {actionsProfile, getAuthThunk} from "./Redux/Reducers/profileReducer";
import SCommons from "./Components/CommonStyles/commonStyles.module.css"
import {api} from "./Redux/API";
import {Preloader} from "./Components/CommonsComponents/Preloader/preloader";
import {compose} from "redux";
import {Redirect, RouteComponentProps, withRouter} from "react-router";

type PropsType = {
    getAuth: () => void
    isLogged: boolean | null
    isInitilizated: boolean
    isFetch: boolean
}

const AppMiddleware: FC<PropsType & RouteComponentProps> = (props) => {
    useEffect(() => {
        (async () => {
            await props.getAuth()
        })()
    }, [])
    if (props.isLogged && !props.isInitilizated || props.isFetch) return <Preloader/>
    if (props.location.pathname === '/login' && props.isLogged || props.location.pathname === '/register' && props.isLogged) return <Redirect from={'/login'} to={'/profile'}/>
    return (
        <div className={SCommons.commonStyle_container__width}>
            {props.isInitilizated && <App {...props}/>}
        </div>

    )
}


let mapStateToProps = (state: AppStateType) => {
    return {
        isLogged: state.profileReducer.loginData.isLogged,
        isInitilizated: state.profileReducer.isInitilizated,
        isFetch: state.profileReducer.isFetch
    }
}



export const AppWrapper = compose<ComponentType>(connect(mapStateToProps, {getAuth: getAuthThunk}), withRouter)(AppMiddleware);
