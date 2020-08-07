import React, {FC, useState} from "react";
import {api} from "../../Redux/API";
import SCommons from "../CommonStyles/commonStyles.module.css";
import SChat from ".//chatStyles.module.css"


type PropsType = {
    msgId: number
    senderId: number
    myId: number
    senderFN: string
    senderSN: string
    msgText: string
    addedAt: string
    isEdit: boolean
    ava: string
    loc: string
    editMsg: (text: string, method: string, msgId: number) => void
    delMsg: (msgId: number, loc: string) => void
}

export const ChatMsg: FC<PropsType> = (props) => {
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
    const buttonClasses = `${SCommons.commonStyle_button__violet} ${SCommons.commonStyle_button__margins}`
    const inputStyles = `${SCommons.commonStyle_input__decor} ${SCommons.commonStyle_input__margins} ${SCommons.commonStyle_input__small}`
    const headerMsgClasses = `${SChat.container_msgHead__decor} ${SChat.container_msgHead__marginRight}`
    const headerAvaClasses = `${SCommons.commonStyle_ava__littleAva} ${SChat.container_msgHead__marginRight}`
    return (
        <div className={SChat.container_msgBlock__marginBottom}>
            <div>
                <img className={headerAvaClasses} src={props.ava} alt=""/>
                <span className={headerMsgClasses}>{props.senderFN}</span>
                <span className={headerMsgClasses}>{props.senderSN}</span>
                <span className={headerMsgClasses}>{props.addedAt}</span>
                {props.isEdit && <span>(edited)</span>}
            </div>
            <div className={SChat.container_msgBody__margin}>
                <span>{props.msgText}</span>
            </div>
            {props.myId === props.senderId && <div>{editMode &&
            <div className={SCommons.commonStyle_items__displayFlex}>
                <div><input className={inputStyles} onChange={updEditMsg} value={text} ref={ref}/></div>
                <div>
                    <button className={buttonClasses} onClick={postEditMsg}>Отправить</button>
                </div>
                <div>
                    <button className={buttonClasses} onClick={() => setEditMode(false)}>Отмена</button>
                </div>
            </div>
            }
            <div className={SCommons.commonStyle_items__displayFlex}>
                {!editMode && <div>
                    <button className={buttonClasses} onClick={() => setEditMode(true)}>Изменить</button>
                </div>}
                <div>
                    <button className={buttonClasses} onClick={() => props.delMsg(props.msgId, props.loc)}>Удалить</button>
                </div>
            </div>
            </div>}
        </div>
    )
}
