const API_URL = 'http://localhost:3333'

const BASE_ENDPOINT = '/api'

export default function api(url, data){
    return fetch(API_URL+BASE_ENDPOINT+url, data)
        .then(res => res.json())
}