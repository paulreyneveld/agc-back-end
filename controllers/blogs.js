const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/Blog')

blogRouter.post('/', async (req, res) => {
    console.log(req)
    const body = req.body

    const blog = new Blog({
        title: body.title,
        content: body.content
    })  

    await blog.save()

    res.json(blog).status(200).end()
})

blogRouter.get('/', async (req, res) => {

    const blogs = await Blog.find({})

    res.json(blogs).status(200).end()
})

module.exports = blogRouter