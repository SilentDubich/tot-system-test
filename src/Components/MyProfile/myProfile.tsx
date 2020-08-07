import React, {ComponentType, FC, useState} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/store";
import SProfile from "./myProfileStyles.module.css"
import SCommons from "../CommonStyles/commonStyles.module.css"
import EmptyPhoto from "../../DataBase/imgs/nullPhoto.jpg"
import {ProfileType, updateProfileInfoThunk, updateProfilePhoto} from "../../Redux/Reducers/profileReducer";
import {compose} from "redux";
import {authRedirect} from "../CommonsComponents/authRedirect";

type PropsType = {
    profile: ProfileType
    updProfData: (userId: number | null, fn: string, sn: string, status: string) => void
    updPhoto: (photo: any) => void
}

const MyProfile: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [photo, setPhoto] = useState<any>(props.profile.avatar)
    const [fn, setFn] = useState<any>(props.profile.firstName)
    const [sn, setSn] = useState<any>(props.profile.secondName)
    const [status, setStatus] = useState<any>(props.profile.status)
    let refFn = React.createRef<HTMLInputElement>()
    let refSn = React.createRef<HTMLInputElement>()
    let refStatus = React.createRef<HTMLInputElement>()
    const updateInfo = () => {
        refFn.current && setFn(refFn.current.value)
        refSn.current && setSn(refSn.current.value)
        refStatus.current && setStatus(refStatus.current.value)
    }
    const cancelEdit = () => {
        setFn(props.profile.firstName)
        setSn(props.profile.secondName)
        setStatus(props.profile.status)
        setEditMode(false)
    }
    const postUpdatedData = async () => {
        await props.updProfData(props.profile.userId, fn, sn, status)
        setEditMode(false)
    }
    const selectPhoto = (e: any) => {
        let formData = new FormData()
        let imageFile: any = document.querySelector('#photo')
        if (imageFile !== null && imageFile.files !== null) {
            formData.append('image', imageFile.files[0])
        }
        setPhoto(formData)
    }
    const buttonClasses = `${SCommons.commonStyle_button__violet} ${SCommons.commonStyle_button__margins}`
    const inputStyles = `${SCommons.commonStyle_input__decor} ${SCommons.commonStyle_input__margins} ${SCommons.commonStyle_input__small}`
    return (
        <div
            className={`${SCommons.commonStyle_items__displayFlex} ${SCommons.commonStyle__backgroundBorder} ${SCommons.commonStyle_items__padding}`}>
            <div>
                <img className={SProfile.container_img__standardAva} src={EmptyPhoto}/>
                {/*<input onChange={selectPhoto} type={'file'} id={'photo'}/>*/}
                {/*<button onClick={() => props.updPhoto(photo)}>Обновить фото</button>*/}
            </div>
            {!editMode && <div className={SProfile.container_RightSide__marginLeft}>
                <div>
                    <span className={SProfile.container_namesItems__decor}>{props.profile.firstName}</span>
                    <span className={SProfile.container_namesItems__decor}>{props.profile.secondName}</span>
                </div>
                <div>
                    <span className={SProfile.container_statusItem__decor}>{props.profile.status}</span>
                </div>
                <div>
                    <button className={buttonClasses} onClick={() => setEditMode(true)}>Изменить профиль</button>
                </div>
            </div>}
            {editMode && <div className={SProfile.container_RightSide__marginLeft}>
                <div>
                    <input className={inputStyles} onChange={updateInfo} ref={refFn} value={fn}/>
                    <input className={inputStyles} onChange={updateInfo} ref={refSn} value={sn}/>
                </div>
                <div>
                    <input className={inputStyles} onChange={updateInfo} ref={refStatus} value={status}/>
                </div>
                <div className={`${SCommons.commonStyle_items__displayFlex}`}>
                    <div>
                        <button className={buttonClasses} onClick={postUpdatedData}>Обновить</button>
                    </div>
                    <div>
                        <button className={buttonClasses} onClick={cancelEdit}>Отмена</button>
                    </div>
                </div>

            </div>}
        </div>

    )
}


let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profileReducer.profileData
    }
}

export const MyProfileWrapper = compose<ComponentType>(
    connect(mapStateToProps,
        {updProfData: updateProfileInfoThunk, updPhoto: updateProfilePhoto}),
    authRedirect
)(MyProfile)
