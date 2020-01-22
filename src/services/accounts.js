import Api from './api'

export default {
    getAccount (username) {
        return Api().get('accounts', {
            params: {
                username: `${username}`
            }
        })
    }
}