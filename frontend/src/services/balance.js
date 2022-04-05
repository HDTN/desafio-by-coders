import api from './api'

const service =  {
    select(data){
        return api('/balance/select', {method: 'GET', ...data})
    },
}

export default service