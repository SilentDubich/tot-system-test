import {AppStateType, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";


type ActionMsgType = InferActionsTypes<typeof actionsMsg>
type ThunkMsgType = ThunkAction<Promise<void>, AppStateType, unknown, ActionMsgType>
export const actionsMsg = {
    addMsg: (data: MessageType) => ({type: 'messageReducer/addMsg', data} as const),
    updateInputText: (text: string) => ({type: 'messageReducer/updUnpTxt', text} as const)
}


export type MessageType = {
    msgId: number,
    senderFrstName: string,
    senderScndName: string,
    msgText: string,
    isEdited: boolean,
    addedAt: string,
    senderAva: string
}



let initialMsgState = {
    messages: [
        {
            msgId: 0,
            senderFrstName: "Kirill",
            senderScndName: "Dubov",
            msgText: "Hello World !",
            isEdited: false,
            addedAt: "05.08.2020 12:50",
            senderAva: "some string"
        },
        {
            msgId: 1,
            senderFrstName: "Kirill",
            senderScndName: "Dubov",
            msgText: "Hello World !",
            isEdited: false,
            addedAt: "05.08.2020 12:50",
            senderAva: "some string"
        },
        {
            msgId: 2,
            senderFrstName: "Kirill",
            senderScndName: "Dubov",
            msgText: "Hello World !",
            isEdited: false,
            addedAt: "05.08.2020 12:50",
            senderAva: "some string"
        },
    ] as Array<MessageType>,
    text: ''
}

type initialMsgStateType = typeof initialMsgState

export const messageInstructions = (state = initialMsgState, action: ActionMsgType): initialMsgStateType => {
    switch (action.type) {
        case "messageReducer/addMsg":
            return {...state, messages: [...state.messages, action.data], text: ''}
        case "messageReducer/updUnpTxt":
            return {...state, text: action.text}
        default:
            return state
    }
}
