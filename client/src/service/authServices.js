import tokenService from './tokenServices'

const authService = {
  isAuthenticated: () => {
    const token = tokenService.fetchToken('token')
    if (!token) {
      return false
    }

    return true
  },

  signOut: () => {
    tokenService.clearToken()
  }
}

export default authService