const express = require('express');
const userRouter = express.Router();
const {User,Beat} = require('../models');
const bodyParser = require('body-parser');
const authRouter = require('./authRouter')

userRouter.use(bodyParser.json());
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

//find all food
userRouter.get('/:id/beat', async(req,res)=>{
  try{
    const allFood = await Beat.findAll({
      where:{
        user_id: req.params.id
      }
    });
    res.send(allFood);
  }
  catch(e){
    console.log(e)
  }
})


// create food entry
userRouter.post('/:id/create-beat', async (req, res) => {
  try {
    const food = await Beat.create(req.body);
    const who = await User.findByPk(req.params.id);
    await food.setUser(who);
    res.json(food)
  } catch (e) {
    console.log(e)
  }

})

// update food /update-food/:food_id
userRouter.put('/update-beat/:food_id', async (req, res) => {
  try {
    await Beat.update(
      req.body
      ,{
        where: {
          id: req.params.food_id
        }
      })
      res.send('updated')
    }catch (e) {
      console.log(e)
    }
})

//delete food
userRouter.delete('/:id/beat-entry/:beat_id', async (req, res) => {
  try {
    const destroyBeat = await Beat.destroy({
      where:{
        id: req.params.beat_id
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