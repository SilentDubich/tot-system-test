import React, {FC, useState} from "react";
import {InputMsg} from "../CommonsComponents/inputMsg";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/store";
import {actionsProfile, authProfileThunk} from "../../Redux/Reducers/profileReducer";
import {NavLink} from "react-router-dom";
import {ErrorType, mailValidator} from "../CommonsComponents/validators";
import SCommons from "../CommonStyles/commonStyles.module.css";

type PropsType = {
    email: string
    password: string
    isFetch: boolean
    error: Array<string>
    updEmail: (text: string) => void
    updPassw: (text: string) => void
    auth: (email: string, password: string) => void
}

export const LoginPage: FC<PropsType> = (props) => {
    const [err, setErr] = useState<ErrorType>({})
    const postLog = () => {
        let errors = mailValidator(props.email)
        if (Object.keys(errors).length === 0) {
            props.auth(props.email, props.password)
            setErr({})
        } else {
            setErr(errors)
        }
    }
    const buttonClasses = `${SCommons.commonStyle_button__violet} ${SCommons.commonStyle_button__margins}`
    return (
        <div className={`${SCommons.commonStyle_items__padding} ${SCommons.commonStyle__backgroundBorder}`}>
            <span>Авторизация</span>
            <div>
                <span>Email:</span>
                <InputMsg placeholder={'Введи почту'} updTxt={props.updEmail} text={props.email}/>
            </div>
            <div>
                <span>Password:</span>
                <InputMsg type={'password'} placeholder={'Введи пароль'} updTxt={props.updPassw} text={props.password}/>
            </div>
            <div>
                <button disabled={props.isFetch}
                        className={`${props.isFetch && SCommons.commonStyle_button__disabledButton} ${buttonClasses}`}
                        onClick={postLog}>Отправить</button>
            </div>
            {err && <div><span>{err.mail}</span></div>}
            {props.error && <div><span>{props.error}</span></div>}
            <div>
                <NavLink to='/register'>Нет аккаунта?</NavLink>
            </div>
        </div>
    )
}


let mapStateToProps = (state: AppStateType) => {
    return {
        email: state.profileReducer.logText.email,
        password: state.profileReducer.logText.password,
        error: state.profileReducer.err,
        isFetch: state.profileReducer.isFetch
    }
}

export const LoginPageWrapper = connect(mapStateToProps,
    {
        updEmail: actionsProfile.updLogEmail,
        updPassw: actionsProfile.updLogPassw,
        auth: authProfileThunk
    })(LoginPage)
