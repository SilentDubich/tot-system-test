import React, {FC} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/store";


let mapStateToRedirect = (state: AppStateType) => {
    return {
        isLogged: state.profileReducer.loginData.isLogged,
        initialized: state.profileReducer.isInitilizated
    }
}

type mapStateToPropsType = {
    isLogged: boolean | null
    initialized: boolean
}

export const authRedirect = (Component: React.ComponentType<any>) => {

    class RedirectComponent extends React.Component<mapStateToPropsType> {

        render() {
            if (!this.props.isLogged && this.props.initialized) return <Redirect to='/login'/>;
            return <Component {...this.props}/>
        }
    }
    let connectedRedirect: any = connect(mapStateToRedirect)(RedirectComponent)

    return connectedRedirect
};
