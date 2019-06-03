const tokenService = {
    storeToken: (token) => {
      localStorage.setItem('token', token)
    },
  
    fetchToken: () => {
      return localStorage.getItem('token')
    },
  
    clearToken: () => {
      localStorage.clear()
    }
  }
  
  export default tokenService