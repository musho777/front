import axios from "axios"
import useAuth from "../../hooks/useAuth"

export const URL = 'http://195.140.146.141:8000'
export const SocketURL = 'http://195.140.146.141:80'
export const CallURL = 'http://195.140.146.141:3500'

// export const URL = 'http://192.168.0.5:8000'
// export const SocketURL = 'http://192.168.0.5:80'
// export const CallURL = 'http://192.168.0.5:3500'

export const ApiRequests = {
    async login(payload: {email: string, password: string}): Promise<void> {
        return axios.post(`${URL}/auth/signin`, payload).then(r => r.data)
    },

    async signup(payload: any): Promise<void> {
        return axios.post(`${URL}/auth/signup`, payload).then(r => r.data)
    },

    async me(token: string): Promise<void> {
        return axios.get(`${URL}/users/me`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async getUser(token: string, id: number): Promise<void> {
        return axios.get(`${URL}/matching/${id}`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async updateUser(token: string, params: any): Promise<void> {
        return axios.patch(`${URL}/users`, params, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async deleteUser(token: string): Promise<void> {
        return axios.delete(`${URL}/users`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async guests(token: string): Promise<void> {
        return axios.get(`${URL}/matching/guests`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async like(token: string, id: number): Promise<void> {
        return axios.post(`${URL}/matching/like`, { id }, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async likesFrom(token: string): Promise<void> {
        return axios.get(`${URL}/matching/likesFrom`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async likesTo(token: string): Promise<void> {
        return axios.get(`${URL}/matching/likesTo`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async friends(token: string): Promise<void> {
        return axios.get(`${URL}/matching/friends`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async chats(token: string): Promise<void> {
        return axios.get(`${URL}/messages/chat`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async messages(token: string, chatId: number): Promise<void> {
        return axios.get(`${URL}/messages/messages/${chatId}`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async cities(token: string): Promise<void> {
        return axios.get(`${URL}/matching/city`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async gifts(token: string): Promise<void> {
        return axios.get(`${URL}/gifts`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async createChat(token: string, id: number): Promise<void>  {
        return axios.post(`${URL}/messages/chat`, { id }, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async removeFromFriends(token: string, id: number): Promise<void> {
        return axios.post(`${URL}/matching/removeFromFriends`, {id}, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async buyCoins(params: {amount: number, userId: number}): Promise<void> {
        return axios.post(`${URL}/payment`, params).then(r => r.data)
    },

    async buyVipStatus(token: string, type: string): Promise<void> {
        return axios.post(`${URL}/users/buyVipStatus`, { type }, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async getGifts(token: string): Promise<void> {
        return axios.get(`${URL}/users/gifts`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async sendGift(token: string, userToId: number, giftId: number): Promise<void> {
        return axios.post(`${URL}/gifts/send`, { userToId, giftId }, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async getStickers(token: string): Promise<void> {
        return axios.get(`${URL}/sticker/my`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async getAvailableStickers(token: string): Promise<void> {
        return axios.get(`${URL}/sticker/available`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async buySticker(token: string, giftId: number): Promise<void> {
        return axios.post(`${URL}/sticker/buy`, {id: giftId}, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async createComplaint(token: string, messageId: number, reason: string): Promise<void> {
        return axios.post(`${URL}/complaint`, {messageId, reason}, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async getNotifications(token: string): Promise<void> {
        return axios.get(`${URL}/notifications`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async getSupportMessages(token: string): Promise<void> {
        return axios.get(`${URL}/support-messages`, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async sendSupportMessage(token: string, text: string): Promise<void> {
        return axios.post(`${URL}/support-messages/user`, {text}, { headers: {'Authorization': `Bearer ${token}`} }).then(r => r.data)
    },

    async recoverPassword( email: string): Promise<void> {
        return axios.post(`${URL}/auth/recover`, {email}).then(r => r.data)
    },

    async recoverPasswordSecondStep(email: string, code: string, password: string): Promise<void> {
        return axios.post(`${URL}/auth/recoverSecondStep`, {email, code, password}).then(r => r.data)
    },
}