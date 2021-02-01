require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.env.DB_PASSWORD
const url =
  `mongodb+srv://prwUser:${password}@cluster0.4uagh.mongodb.net/blogs?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: Date
})

const Blog = mongoose.model('Blog', blogSchema)


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
