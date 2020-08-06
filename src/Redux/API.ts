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
    postMessage(text: string, method: string, fn: string, sn: string, ava: string ) {
        return instance.post('messages', {text, method, fn, sn, ava})
    },
    postLog(email: string, password: string) {
        return instance.post('auth/login', {email, password}).then( response => {
            return response
        })
    },
    postRegister(email: string, password: string) {
        return instance.post('auth/register', {email, password}).then( response => {
            return response
        })
    }
}
