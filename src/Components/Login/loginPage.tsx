import React, {FC} from "react";
import {InputMsg} from "../CommonsComponents/inputMsg";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/store";
import {actionsProfile, authProfileThunk} from "../../Redux/Reducers/profileReducer";
import {NavLink} from "react-router-dom";

type PropsType = {
    email: string
    password: string
    updEmail: (text: string) => void
    updPassw: (text: string) => void
    auth: (email: string, password: string) => void
}

export const LoginPage: FC<PropsType> = (props) => {
    const postLog = () => {
        props.auth(props.email, props.password)
    }
    return (
        <div>
            <span>Авторизация</span>
            <div>
                <span>Email:</span>
                <InputMsg placeholder={'Введи почту'} updTxt={props.updEmail} text={props.email}/>
            </div>
            <div>
                <span>Password:</span>
                <InputMsg placeholder={'Введи пароль'} updTxt={props.updPassw} text={props.password}/>
            </div>
            <div>
                <button onClick={postLog}>Отправить</button>
            </div>
            <div>
                <NavLink to='/register'>Нет аккаунта?</NavLink>
            </div>
        </div>
    )
}


let mapStateToProps = (state: AppStateType) => {
    return {
        email: state.profileReducer.logText.email,
        password: state.profileReducer.logText.password
    }
}

export const LoginPageWrapper = connect(mapStateToProps,
    {
        updEmail: actionsProfile.updLogEmail,
        updPassw: actionsProfile.updLogPassw,
        auth: authProfileThunk
    })(LoginPage)
