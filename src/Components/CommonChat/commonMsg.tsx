import React, {FC, useState} from "react";
import {api} from "../../Redux/API";


type PropsType = {
    msgId: number
    senderId: number
    myId: number
    senderFN: string
    senderSN: string
    msgText: string
    addedAt: string
    ava: string
    loc: string
    editMsg: (text: string, method: string, msgId: number) => void
    delMsg: (msgId: number, loc: string) => void
}

export const CommonMsg: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(props.msgText)
    let ref = React.createRef<HTMLInputElement>()
    const updEditMsg = () => {
        if (ref.current) {
            let value = ref.current.value
            setText(value)
        }
    }
    const postEditMsg = () => {
        props.editMsg(text, props.loc, props.msgId)
        setEditMode(false)
    }

    return (
        <div>
            <div>
                {/*<img src={props.ava} alt=""/>*/}
                <span>{props.senderFN}</span>
                <span>{props.senderSN}</span>
                <span>{props.addedAt}</span>
            </div>
            <div>
                <span>{props.msgText}</span>
            </div>
            {props.myId === props.senderId && <div>{editMode &&
            <div>
                <div><input onChange={updEditMsg} value={text} ref={ref}/></div>
                <div>
                    <button onClick={postEditMsg}>Отправить</button>
                </div>
                <div>
                    <button onClick={() => setEditMode(false)}>Отмена</button>
                </div>
            </div>
            }
                {!editMode && <div>
                    <button onClick={() => setEditMode(true)}>Изменить</button>
                </div>}
                <div>
                    <button onClick={() => props.delMsg(props.msgId, props.loc)}>Удалить</button>
                </div>
            </div>}

        </div>
    )
}
