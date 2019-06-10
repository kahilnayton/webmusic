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

//get user sound
export const fetchSound = async(id)=>{
  try {
    const resp = await api.get(`/${id}/sound`)
    return resp.data;
  } catch (e) {
    console.log(e)
  }
}


//create sound
export const createSound = async(user, newSound)=>{
  try{
    const resp = await api.post(`/${user}/create-sound`, newSound)
    return resp.data;
  }
  catch(e){
    console.log(e)
  }
}

//delete a food
export const deleteSound = async (user,sound)=>{
  try{
    const res = await api.delete(`/${user}/sound-entry/${sound}`)
    return res.data;
  }
  catch(e){
    console.log(e)
  }
}


//update sound
const newwwwwsound = {
  sound: 'cool'
}

export const updateSound = async () => {
  try {
    await api.put(`/update-sound/8`, newwwwwsound)
  }
  catch(e){
    console.log(e)
  }
}




