const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/Blog')
const jwt = require('jsonwebtoken')
const authenticateMiddleware = require('../middleware/auth')

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

blogRouter.post('/', authenticateMiddleware, async (req, res) => {
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

blogRouter.delete('/:id', authenticateMiddleware, async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    }
    catch (error) {
        res.status(500).send({ upload_error: 'Request error' })
    }
})

blogRouter.put('/:id', authenticateMiddleware, async (req, res) => {

    const body = req.body
    const blog = {
        title: body.title,
        content: body.content
    }

    try {
        await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.status(201).end()
    }
    catch (error) {
        console.log(error)
        res.status(500).end()
    }
})

module.exports = blogRouter