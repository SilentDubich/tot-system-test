import React, {FC} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/store";
import {actionsMsg, MessageType} from "../../Redux/Reducers/messageReducer";
import {CommonMsg} from "./commonMsg";
import {InputMsg} from "../CommonsComponents/inputMsg";
import {AddMsgButton} from "../CommonsComponents/addMsgButton";

type PropsType = {
    msg: Array<MessageType>
    text: string
    fn: string
    sn: string
    ava: string
    updTxt: (text: string) => void
    addMsg: (data: MessageType) => void
}

const CommonChat: FC<PropsType> = props => {
    let allMsgs = props.msg.map(el => <CommonMsg key={el.msgId} msgId={el.msgId} senderFN={el.senderFrstName}
                                                 senderSN={el.senderScndName} msgText={el.msgText}
                                                 addedAt={el.addedAt} ava={el.senderAva}/>)

    return (
        <div>
            <div>
                {allMsgs}
            </div>
            <InputMsg text={props.text} updTxt={props.updTxt}/>
            <AddMsgButton msgText={props.text} fn={props.fn} sn={props.sn} ava={props.ava} addMsg={props.addMsg}/>
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

export const CommonChatWrapper = connect(mapStateToProps, {updTxt: actionsMsg.updateInputText, addMsg: actionsMsg.addMsg})(CommonChat)
