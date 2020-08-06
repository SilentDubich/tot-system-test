import React, {FC} from "react";

type PropsType = {
    text: string
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
    return(
        <div>
            <input onChange={updateText} value={props.text} ref={textRef} placeholder={props.placeholder}/>
        </div>
    )
}
