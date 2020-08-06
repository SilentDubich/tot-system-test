import React, {FC, useState} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/store";
import SProfile from "./myProfileStyles.module.css"
import EmptyPhoto from "../../DataBase/imgs/nullPhoto.jpg"
import {ProfileType, updateProfileInfoThunk, updateProfilePhoto} from "../../Redux/Reducers/profileReducer";

type DateToEdit = {
    firstName: string | null
    secondName: string | null
    status: string | null
}

type PropsType = {
    profile: ProfileType
    tempData: DateToEdit
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
    return(
        <div>
            <div>
                <img className={SProfile.container_img__standardAva} src={props.profile.avatar || EmptyPhoto}/>
                <input onChange={selectPhoto} type={'file'} id={'photo'}/>
                <button onClick={() => props.updPhoto(photo)}>Обновить фото</button>
            </div>
            {!editMode && <div>
                <div>
                    <span>{props.profile.firstName}</span>
                    <span>{props.profile.secondName}</span>
                </div>
                <div>
                    <span>{props.profile.status}</span>
                </div>
                <div><button onClick={() => setEditMode(true)}>Изменить профиль</button></div>
            </div>}
            {editMode && <div>
                <div>
                    <input onChange={updateInfo} ref={refFn} value={fn}/>
                    <input onChange={updateInfo} ref={refSn} value={sn}/>
                </div>
                <div>
                    <input onChange={updateInfo} ref={refStatus} value={status}/>
                </div>
                <div><button onClick={postUpdatedData}>Обновить</button></div>
                <div><button onClick={cancelEdit}>Отмена</button></div>
            </div>}

        </div>

    )
}


let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profileReducer.profileData,
        tempData: state.profileReducer.dataToEdit
    }
}

export const MyProfileWrapper = connect(mapStateToProps,
    {updProfData: updateProfileInfoThunk, updPhoto: updateProfilePhoto})(MyProfile)
