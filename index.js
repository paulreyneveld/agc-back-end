require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.env.DB_PASSWORD
const url =
  `mongodb+srv://dbUser:${password}@agc.nbvbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => console.log('Conected to DB'))
  .catch(error => console.log('Failed to connect', error.message))

app.use('/api/users', usersRouter)

app.get('/', (request, response) => {
  response.send(`<h1>Hello World!</h1> & ${password}`)
})

app.post('/', async (request, response) => {
    const body = request.body
    console.log(request.body)
    // const blog = new Blog({
    //     title: body.title,
    //     content: body.content,
    //     author: body.author
    // })

    // await blog.save()
    response.status(200).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
