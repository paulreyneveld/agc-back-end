const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    content: String
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog 