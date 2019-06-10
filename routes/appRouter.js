const express = require('express')
const appRouter = express.Router()

appRouter.get('/protected', (req, res, next) => {
  res.json({ message: 'authenticated'})
})

appRouter.get('/profile', (req, res, next) => {
  res.json({ user: req.user, message: 'success'})
})

module.exports = appRouter
