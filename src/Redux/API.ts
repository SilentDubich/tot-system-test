import axios from "axios"





const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001/',

});

export const api = {
    getMessages(method: string) {
        return instance.get(`messages?method=${method}`)
            .then( response => {
                return response.data
            })
    },
    postMessage(text: string, method: string) {
        return instance.post('messages', {text, method})
    }
}
