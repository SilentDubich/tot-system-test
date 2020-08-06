import React, {FC} from "react";
import {InputMsg} from "../CommonsComponents/inputMsg";
import {AppStateType} from "../../Redux/store";
import {connect} from "react-redux";
import {actionsProfile, registerProfileThunk} from "../../Redux/Reducers/profileReducer";


type PropsType = {
    email: string
    password: string
    updEmail: (text: string) => void
    updPassw: (text: string) => void
    register: (email: string, password: string) => void
}


export const RegisterPage: FC<PropsType> = (props) => {
    const postLog = () => {
        props.register(props.email, props.password)
    }
    return(
        <div>
            <span>Регистрация</span>
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
        </div>
    )
}

let mapStateToProps = (state: AppStateType) => {
    return {
        email: state.profileReducer.logText.email,
        password: state.profileReducer.logText.password
    }
}

export const RegisterPageWrapper = connect(mapStateToProps, {
    register: registerProfileThunk,
    updEmail: actionsProfile.updLogEmail,
    updPassw: actionsProfile.updLogPassw
})(RegisterPage)
