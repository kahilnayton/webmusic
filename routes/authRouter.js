const express = require('express')
const authRouter = express.Router()
const { passport, jwtSign } = require('../auth')

authRouter.post('/signup', async(req, res, next) => {

  
  passport.authenticate('signup', async(err, user, info) => {
    try {
      if (err) {
        let error = new Error(err.message || info.message)
        error.status = 400
        return next(error)
      }

      if (!user) {
        return res.status(401).json({message: info.message})
      }

      const { name, id } = user
      const payload = { name, id }

      const token = jwtSign(payload)
      return res.json({user: user, token: token, message: info.message})
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})


authRouter.post('/login', (req, res, next) => {

    passport.authenticate('login', async(err, user, info) => {
      try {
        let error
  
        if (err) {
          error = new Error(err.message)
          error.status = 500
  
          return next(error)
        }
  
        if (!user) {
          error = new Error(info.message)
          error.status = 400
          return next(error)
        }
  
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error)
  
          if (!user) {
            let err = new Error(info.message)
            err.status = 400
            return next(err)
          }
  
          const { email, id } = user
          const payload = { email, id }
  
          const token = jwtSign(payload)
          return res.json({ user, token })
        })
      } catch (error) {
        return next(error)
      }
    })(req, res, next)
  })
  
  module.exports = authRouter
