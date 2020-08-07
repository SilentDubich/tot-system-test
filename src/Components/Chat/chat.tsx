import React, {ComponentType, FC, useEffect, useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../Redux/store";
import {
    actionsMsg, deleteMsgThunk,
    editMessageThunk,
    getMessagesThunk,
    MessageType,
    postMessageThunk
} from "../../Redux/Reducers/messageReducer";
import {ChatMsg} from "./chatMsg";
import {InputMsg} from "../CommonsComponents/inputMsg";
import {AddMsgButton} from "../CommonsComponents/addMsgButton";
import {RouteComponentProps, withRouter} from "react-router";
import SCommons from "../CommonStyles/commonStyles.module.css";
import SChat from ".//chatStyles.module.css"
import EmptyPhoto from "../../DataBase/imgs/nullPhoto.jpg"
import {Preloader} from "../CommonsComponents/Preloader/preloader";
import {authRedirect} from "../CommonsComponents/authRedirect";
import Picker from 'emoji-picker-react';
import {Modal} from "../CommonsComponents/portal";

type PropsType = {
    msg: Array<MessageType>
    senderId: number
    myId: number
    text: string
    fn: string
    sn: string
    ava: string
    isFetch: boolean
    addStick: (data: any) => void
    updTxt: (text: string) => void
    getMsgs: (method: string) => void
    postMsg: (text: string, method: string, senderId: number, fn: string, sn: string, ava: string) => void
    editMsg: (text: string, method: string, msgId: number) => void
    delMsg: (msgId: number, loc: string) => void
}


const Chat: FC<PropsType & RouteComponentProps> = props => {
    const [stick, setStick] = useState(false)
    const loc = props.location.pathname[1].toUpperCase() + props.location.pathname.slice(2)
    useEffect(() => {
        props.getMsgs(loc)
    }, [props.msg.length === 0 || loc])
    let allMsgs = props.msg.map(el => <ChatMsg key={el.msgId} senderId={el.senderId} msgId={el.msgId}
                                               senderFN={el.senderFrstName}
                                               senderSN={el.senderScndName} msgText={el.msgText} myId={props.myId}
                                               editMsg={props.editMsg} isEdit={el.isEdited}
                                               addedAt={el.addedAt} ava={EmptyPhoto} loc={loc}
                                               delMsg={props.delMsg}/>)
    const inputMsgBoxClasses = `${SCommons.commonStyle_items__displayFlex} ${SChat.container_input__background} ${SCommons.commonStyle_items__displayCenter}`
    const sendStick = (event: any, emojiObject: any) => {
        props.addStick(emojiObject.emoji)
    }
    return (
        <div className={`${SCommons.commonStyle__backgroundBorder}`}>
            <div className={`${SChat.container_chatView__decor} ${SCommons.commonStyle_items__padding}`}>
                {props.isFetch && <Preloader/>}
                {!props.isFetch && <div>{allMsgs}</div>}
            </div>
            <Modal>
                {stick && <div className={SChat.container_stickBox__rightPosition}>
                    <Picker onEmojiClick={sendStick}/>
                </div>}
            </Modal>
            <div className={inputMsgBoxClasses}>
                <InputMsg placeholder={'Напиши что-нибудь...'} text={props.text} updTxt={props.updTxt}/>
                <div className={SChat.container_button__inInput} onClick={() => setStick(!stick)}>😀</div>
                <AddMsgButton senderId={props.myId} loc={loc} postMsg={props.postMsg} msgText={props.text} fn={props.fn}
                              sn={props.sn} ava={props.ava}/>
            </div>
        </div>
    )
}

let mapStateToProps = (state: AppStateType) => {
    return {
        msg: state.msgReducer.messages,
        text: state.msgReducer.text,
        fn: state.profileReducer.profileData.firstName,
        sn: state.profileReducer.profileData.secondName,
        ava: state.profileReducer.profileData.avatar || EmptyPhoto,
        myId: state.profileReducer.profileData.userId,
        isFetch: state.msgReducer.isFetching
    }
}

export const CommonChatWrapper = compose<ComponentType>(
    connect(mapStateToProps,
        {
            updTxt: actionsMsg.updateInputText,
            getMsgs: getMessagesThunk,
            postMsg: postMessageThunk,
            editMsg: editMessageThunk,
            delMsg: deleteMsgThunk,
            addStick: actionsMsg.addStick
        }),
    withRouter,
    authRedirect
)
(Chat)
