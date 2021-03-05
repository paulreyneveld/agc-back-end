const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/Blog')

blogRouter.post('/', async (req, res) => {
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

blogRouter.get('/:id', async (req, res) => {
    console.log(req.params.id)
    const blog = await Blog.findById(req.params.id)
    console.log(blog)
    // res.json('got it')
    res.json(blog)
})

module.exports = blogRouter