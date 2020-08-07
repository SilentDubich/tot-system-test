import React, {FC} from "react";
import {connect} from "react-redux";
import {logOutProfileThunk} from "../../Redux/Reducers/profileReducer";
import SCommons from "../CommonStyles/commonStyles.module.css";



type PropsType = {
    logOut: () => void
}

export const LogOutButton: FC<PropsType> = (props) => {
    const buttonClasses = `${SCommons.commonStyle_button__violet}`
    return(
        <div>
            <div>
                <button className={buttonClasses} onClick={props.logOut}>Выйти</button>
            </div>
        </div>
    )
}


export const LogOutPageWrapper = connect(null, {logOut: logOutProfileThunk})(LogOutButton)
