import api from './api'

const service = {
    select(data){
        return api('/transaction/select', {method: 'GET', credentials: 'include', ...data})
    },
    insert(data){
        return api('/transaction/insert', 
                {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(data)
                })
    }
}

export default service