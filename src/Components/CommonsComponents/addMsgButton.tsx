import React, {FC} from "react";
import {MessageType} from "../../Redux/Reducers/messageReducer";

type PropsType = {
    msgText: string
    senderId: number
    fn: string
    sn: string
    ava: string
    postMsg: (text: string, method: string, senderId: number, fn: string, sn: string, ava: string) => void
    loc: string
}


export const AddMsgButton: FC<PropsType> = (props) => {
    const addMessage = () => {
        props.postMsg(props.msgText, props.loc, props.senderId, props.fn, props.sn, props.ava)
    }
    return (
        <div>
            <button disabled={!props.msgText} onClick={addMessage}>Добавить сообщение</button>
        </div>
    )
}
