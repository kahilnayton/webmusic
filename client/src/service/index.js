import axios from 'axios'
const URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: `${URL}/user`
})

// get a user
export const fetchUser = async (id) => {
  try {
    const resp = await api.get(`/${id}`)
    return resp.data;
  } catch (e) {
    console.log(e)
  }
}

//get user beat
export const fetchBeat = async(id)=>{
  try {
    const resp = await api.get(`/${id}/beat`)
    return resp.data;
  } catch (e) {
    console.log(e)
  }
}

//create theme
export const createTheme = async(id, theme)=>{
  try{
    const resp = await api.post(`/${id}/create-beat`, theme)
    return resp.data;
  }
  catch(e){
    console.log(e)
  }
}


