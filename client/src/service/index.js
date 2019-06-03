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
    const resp = await api.get(`/${id}/goal`)
    return resp.data;
  } catch (e) {
    console.log(e)
  }
}

//create beat
export const createBeat = async(id, goal)=>{
  try{
    const resp = await api.post(`/${id}/create-beat`, goal)
    return resp.data;
  }
  catch(e){
    console.log(e)
  }
}


