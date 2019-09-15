import axios from 'axios'


class RequestManager {

    constructor() {
        this.requester = axios.create({
            baseURL: typeof API_SERVER_URL === 'undefined' ? 'http://localhost:5000' : API_SERVER_URL
        })
    }

    async postRegisterCredentials(email, password) {
        const response = await this.requester.post('/register', {
            data: {
                email,
                password
            }
        })
        return response.status
    }

    async postLoginCredentials(email, password) {
        const response = await this.requester.post('/login', {
            data: {
                email,
                password
            }
        })
        if(response.status == '200'){
            sessionStorage.setItem('jwt',response.headers["x-auth-token"]) 
            this.requester.defaults.headers.common["x-auth-token"] = sessionStorage.getItem('jwt')
        }
           
    }

    async postNote(id, noteText) {
        const response = await this.requester.post(`users/${id}/notes`, {
            data: {
                noteText
            }
        })
        return response.status
    }

    async getNotes(id) {
        const respone = await this.requester.get(`users/${id}/notes`, {})
        if(response.status == '200')
            return response.body.notes
    }

}

export default new RequestManager()