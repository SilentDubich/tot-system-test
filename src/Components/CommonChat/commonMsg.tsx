import React, {FC} from "react";


type PropsType = {
    msgId: number
    senderFN: string
    senderSN: string
    msgText: string
    addedAt: string
    ava: string
}

export const CommonMsg: FC<PropsType> = (props) => {
    return(
        <div>
            <div>
                <img src={props.ava} alt=""/>
                <span>{props.senderFN}</span>
                <span>{props.senderSN}</span>
                <span>{props.addedAt}</span>
            </div>
            <div>
                <span>{props.msgText}</span>
            </div>
            <div><button>Edit</button></div>
            <div><button>Delete</button></div>
        </div>
    )
}
