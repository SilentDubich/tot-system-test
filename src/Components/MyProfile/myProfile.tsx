import React, {FC} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/store";
import SProfile from "./myProfileStyles.module.css"

type PropsType = {
    fn: string,
    sn: string,
    status: string,
    avatar: string
}

const MyProfile: FC<PropsType> = (props) => {
    return(
        <div>
            <div>
                <img className={SProfile.container_img__standardAva} src={props.avatar} alt="No Ava"/>
            </div>
            <div>
                <span>{props.fn}</span>
                <span>{props.sn}</span>
            </div>
            <div>
                <span>{props.status}</span>
            </div>
        </div>
    )
}


let mapStateToProps = (state: AppStateType) => {
    return {
        fn: state.profileReducer.profileData.firstName,
        sn: state.profileReducer.profileData.secondName,
        status: state.profileReducer.profileData.status,
        avatar: state.profileReducer.profileData.avatar
    }
}

export const MyProfileWrapper = connect(mapStateToProps, {})(MyProfile)
