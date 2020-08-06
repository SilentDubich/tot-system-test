import axios from "axios"


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001/',

});
const instancePhoto = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001/',
    headers: {
        'Content-Type': 'multipart/form-data'
    },

});

export const api = {
    getMessages(method: string) {
        return instance.get(`messages?method=${method}`).then(response => {
            return response.data
        })
    },
    postMessage(text: string, method: string, senderId: number, fn: string, sn: string, ava: string) {
        return instance.post('messages', {text, method, senderId, fn, sn, ava}).then(response => {
            return response
        })
    },
    editMessage(text: string, method: string, msgId: number) {
        return instance.put('messages', {text, method, msgId}).then(response => {
            return response
        })
    },
    deleteMsg(msgId: number, method: string) {
        return instance.delete('messages', {data: {msgId, method}})
    },
    postLog(email: string, password: string) {
        return instance.post('auth/login', {email, password}).then(response => {
            return response
        })
    },
    postLogOut() {
        return instance.delete('auth/login').then( response => {
            return response
        })
    },
    getAuth() {
        return instance.get('/auth/me').then(response => {
            return response
        })
    },
    postRegister(email: string, password: string) {
        return instance.post('auth/register', {email, password}).then(response => {
            return response
        })
    },
    getProfile(userId: number) {
        return instance.get(`profile?userId=${userId}`).then( response => {
            return response
        })
    },
    updateProfileInfo(userId: number | null, fn: string, sn: string, status: string) {
        return instance.put('profile', {userId, fn, sn, status}).then(response => {
            return response
        })
    },
    updateProfilePhoto(img: FormData) {
        return instancePhoto.put('profile/photo', {img}).then(response => {
            return response
        })
    }
}
