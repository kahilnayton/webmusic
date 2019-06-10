const express = require('express');
const userRouter = express.Router();
const {User,Sound} = require('../models');
const bodyParser = require('body-parser');
const authRouter = require('./authRouter')

// userRouter.use(bodyParser.json());
userRouter.use('/auth', authRouter);

// get single user
userRouter.get('/:id',async(req,res)=>{
    try{
        const user = await User.findByPk(req.params.id);
        res.json(user);
    }
    catch(e){
        console.log(`Something went wrong: ${e}`)
    }
})

//find all sounds
userRouter.get('/:id/sound', async(req,res)=>{
  try{
    const allSounds = await Sound.findAll({
      where:{
        user_id: req.params.id
      }
    });
    res.json(allSounds);
    // res.send(allSounds);
  }
  catch(e){
    console.log(e)
  }
})


// create sound entry
userRouter.post('/:id/create-sound', async (req, res) => {
  try {
    console.log(req.body)
    const sound = await Sound.create(req.body);
    const who = await User.findByPk(req.params.id);
    await sound.setUser(who);
    res.json(sound)
  } catch (e) {
    console.log(e)
  }

})

// update sound /update-sound/:sound_id
userRouter.put('/update-sound/:sound_id', async (req, res) => {
  try {
    await Sound.update(
      req.body
      ,{
        where: {
          id: req.params.sound_id
        }
      })
      res.send('updated')
    }catch (e) {
      console.log(e)
    }
})

//delete sound
userRouter.delete('/:id/sound-entry/:sound_id', async (req, res) => {
  try {
    const destroySound = await Sound.destroy({
      where:{
        id: req.params.sound_id
      }
    })
    res.send('msg: deleted');
  } catch (e) {
    console.log(e)
  }
})






module.exports = {
  userRouter
}