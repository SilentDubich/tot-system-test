import React, {FC} from "react";
import {connect} from "react-redux";
import {logOutProfileThunk} from "../../Redux/Reducers/profileReducer";



type PropsType = {
    logOut: () => void
}

export const LogOutPage: FC<PropsType> = (props) => {
    return(
        <div>
            <div>
                <button onClick={props.logOut}>Выйти</button>
            </div>
        </div>
    )
}


export const LogOutPageWrapper = connect(null, {logOut: logOutProfileThunk})(LogOutPage)
