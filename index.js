require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const cors = require('cors')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.env.DB_PASSWORD
const url =
  `mongodb+srv://dbUser:${password}@agc.nbvbb.mongodb.net/agcdb?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => console.log('Conected to DB'))
  .catch(error => console.log('Failed to connect', error.message))

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/', (request, response) => {
  response.send(`<h1>Hello World!</h1> & ${password}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
