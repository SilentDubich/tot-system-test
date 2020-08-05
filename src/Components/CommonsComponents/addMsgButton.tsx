import React, {FC} from "react";
import {MessageType} from "../../Redux/Reducers/messageReducer";

type PropsType = {
    msgText: string
    fn: string
    sn: string
    ava: string
    addMsg: (data: MessageType) => void
}


export const AddMsgButton: FC<PropsType> = (props) => {
    const addMessage = () => {
        const data = {
            msgId: 10,
            senderFrstName: props.fn,
            senderScndName: props.sn,
            msgText: props.msgText,
            isEdited: false,
            addedAt: new Date().toDateString(),
            senderAva: props.ava
        }
        props.addMsg(data)

    }
    return (
        <div>
            <button disabled={!props.msgText} onClick={addMessage}>Добавить сообщение</button>
        </div>
    )
}
