const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/Blog')

blogRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        const blog = new Blog({
            title: body.title,
            content: body.content
        })  
        await blog.save()
        res.json(blog).status(200).end()
    }
    catch (error) {
        res.status(500).send({ upload_error: 'Request error' })
    }
})

blogRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.json(blogs).status(200).end()
    }
    catch (error) {
        res.status(500).send({ upload_error: 'Request error' })
    }
})

blogRouter.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.json(blog).status(200).end()
    }
    catch (error) {
        res.status(500).send({ upload_error: 'Request error' })
    }
})

module.exports = blogRouter