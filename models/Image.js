const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
  Image: {
    type: Buffer
  }
})

ImageSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.image;
  return result;
}

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image