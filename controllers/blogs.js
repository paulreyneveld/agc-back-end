const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/Blog')

blogRouter.post('/', (res, req) => {
    console.log(req.body)
    res.status(200).end()
})

module.exports = blogRouter