require('dotenv').config()
const express = require('express')

const app = express()
const port = 3000

const DB = require('./config/db')
const Routes = require('./routes/routes')
const Middlewares = require('./middleware/middlewares')

DB()
Middlewares(app, express)
Routes(app)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
