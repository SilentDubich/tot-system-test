import React, {FC, useState} from "react";
import {InputMsg} from "../CommonsComponents/inputMsg";
import {AppStateType} from "../../Redux/store";
import {connect} from "react-redux";
import {actionsProfile, registerProfileThunk} from "../../Redux/Reducers/profileReducer";
import {ErrorType, mailValidator} from "../CommonsComponents/validators";
import SCommons from "../CommonStyles/commonStyles.module.css";


type PropsType = {
    email: string
    password: string
    isFetch: boolean
    updEmail: (text: string) => void
    updPassw: (text: string) => void
    register: (email: string, password: string) => void
}


export const RegisterPage: FC<PropsType> = (props) => {
    const [err, setErr] = useState<ErrorType>({})
    const postLog = () => {
        let errors = mailValidator(props.email)
        if (Object.keys(errors).length === 0) {
            props.register(props.email, props.password)
            setErr({})
        } else {
            setErr(errors)
        }
    }
    const buttonClasses = `${SCommons.commonStyle_button__violet} ${SCommons.commonStyle_button__margins}`
    return(
        <div className={`${SCommons.commonStyle_items__padding} ${SCommons.commonStyle__backgroundBorder}`}>
            <span>Регистрация</span>
            <div>
                <span>Email:</span>
                <InputMsg placeholder={'Введи почту'} updTxt={props.updEmail} text={props.email}/>
            </div>
            <div>
                <span>Password:</span>
                <InputMsg type={'password'} placeholder={'Введи пароль'} updTxt={props.updPassw} text={props.password}/>
            </div>
            {err && <div><span>{err.mail}</span></div>}
            <div>
                <button disabled={props.isFetch}
                        className={`${props.isFetch && SCommons.commonStyle_button__disabledButton} ${buttonClasses}`}
                        onClick={postLog}>Отправить</button>
            </div>
        </div>
    )
}

let mapStateToProps = (state: AppStateType) => {
    return {
        email: state.profileReducer.logText.email,
        password: state.profileReducer.logText.password,
        isFetch: state.profileReducer.isFetch
    }
}

export const RegisterPageWrapper = connect(mapStateToProps, {
    register: registerProfileThunk,
    updEmail: actionsProfile.updLogEmail,
    updPassw: actionsProfile.updLogPassw
})(RegisterPage)
