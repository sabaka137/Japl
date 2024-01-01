import axios from 'axios'

export const API_URL = 'https://japl-server-api.onrender.com/'

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer: ${localStorage.getItem('token')}`
    return config
})

export default API
