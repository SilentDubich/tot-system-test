import React, {FC} from "react";
import SCommons from "../CommonStyles/commonStyles.module.css";
import SChat from "../Chat/chatStyles.module.css"

type PropsType = {
    text: string
    type?: string
    placeholder: string
    updTxt: (text: string) => void
}

export const InputMsg: FC<PropsType> = props => {
    let textRef = React.createRef<HTMLInputElement>()
    const updateText = () => {
        if (textRef.current) {
            let value = textRef.current.value
            props.updTxt(value)
        }
    }
    const inputStyles = `${SCommons.commonStyle_input__decor} ${SCommons.commonStyle_input__margins} ${SCommons.commonStyle_input__large}`
    return(
        <div>
            <input type={props.type || 'text'} className={inputStyles} onChange={updateText} value={props.text} ref={textRef} placeholder={props.placeholder}/>
        </div>
    )
}
