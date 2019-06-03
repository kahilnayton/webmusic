import axios from 'axios'
import tokenService from './tokenServices'
const BASE_URL = 'http://localhost:3001'

const JWT_TOKEN = tokenService.fetchToken() || ''

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${JWT_TOKEN}`
  }
})

export const login = async(data) => {
    try {
        const resp = await api.post('/auth/login', data)
        const { data: { token, user } } = resp
    tokenService.storeToken(token)
    return user
  } catch (e) {
    throw e
  }
}

export const signUp = async(data) => {
  try {
    const resp = await api.post('/auth/signup', data)
    const { data: { user, token } } = resp
    tokenService.storeToken(token)

    return user
  } catch (e) {
    throw e
  }
}

export const getProfile = async() => {
  try {
    const resp = await api.get('/app/profile')
    const { data: { user } } = resp
    return user
  } catch (e) {
    throw e
  }
}

export const logout = () => {
  try {
    tokenService.clearToken()
    return { message: 'logout success' }
  } catch (e) {
    throw e
  }
}