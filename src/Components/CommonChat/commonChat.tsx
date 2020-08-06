import React, {ComponentType, FC, useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../Redux/store";
import {actionsMsg, getMessagesThunk, MessageType, postMessageThunk} from "../../Redux/Reducers/messageReducer";
import {CommonMsg} from "./commonMsg";
import {InputMsg} from "../CommonsComponents/inputMsg";
import {AddMsgButton} from "../CommonsComponents/addMsgButton";
import {RouteComponentProps, withRouter} from "react-router";

type PropsType = {
    msg: Array<MessageType>
    text: string
    fn: string
    sn: string
    ava: string
    updTxt: (text: string) => void
    getMsgs: (method: string) => void
    postMsg: (text: string, method: string, fn: string, sn: string, ava: string) => void
}


const CommonChat: FC<PropsType & RouteComponentProps> = props => {
    const loc = props.location.pathname[1].toUpperCase() + props.location.pathname.slice(2)
    useEffect(() => {
        props.getMsgs(loc)
    }, [props.msg.length === 0 || loc])
    let allMsgs = props.msg.map(el => <CommonMsg key={el.msgId} msgId={el.msgId} senderFN={el.senderFrstName}
                                                 senderSN={el.senderScndName} msgText={el.msgText}
                                                 addedAt={el.addedAt} ava={el.senderAva}/>)
    return (
        <div>
            <div>
                {allMsgs}
            </div>
            <InputMsg placeholder={'Напиши что-нибудь...'} text={props.text} updTxt={props.updTxt}/>
            <AddMsgButton loc={loc} postMsg={props.postMsg} msgText={props.text} fn={props.fn} sn={props.sn} ava={props.ava}/>
        </div>
    )
}

let mapStateToProps = (state: AppStateType) => {
    return {
        msg: state.msgReducer.messages,
        text: state.msgReducer.text,
        fn: state.profileReducer.profileData.firstName,
        sn: state.profileReducer.profileData.secondName,
        ava: state.profileReducer.profileData.avatar
    }
}

export const CommonChatWrapper = compose<ComponentType>(
    connect(mapStateToProps,
        {updTxt: actionsMsg.updateInputText, getMsgs: getMessagesThunk,
            postMsg: postMessageThunk}),
    withRouter
)
(CommonChat)
