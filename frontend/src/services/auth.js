import api from './api'

const service = {
    selectUserInReq(data){
        return api('/auth/user', {method: 'GET', credentials: 'include', ...data})
    },
    logout(){
        return api('/auth/clear-session')
    }
}

export default service