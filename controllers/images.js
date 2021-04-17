const express = require('express');
const multer = require('multer');
const Image = require('../models/Image');
const imagesRouter = express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error('only upload files with jpg or jpeg format.'))
    }
    cb(undefined, true); // continue with upload
  }
})

imagesRouter.post('/', upload.array('images', 10), async (req, res) => {
  try {
    for (let i = 0; i < req.files.length; i++) {
      const image = new Image(req.body)
      const file = req.files[i]
      image.image = file.buffer
      await image.save()
    }
    res.status(201)
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error uploading images" })
  }
})

imagesRouter.get('/', async (req, res) => {
  try {
    console.log('hello')
    const images = await Image.find({});
    res.send(images);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of images.' });
  }
});

imagesRouter.get('/:id', async (req, res) => {
  try {
    console.log('word')
    const result = await Image.findById(req.params.id);
    console.log(result)
    res.set('Content-Type', 'image/jpeg');
    res.send(result.image);
  } catch (error) {
    res.status(400).send({ get_error: 'Error while getting image.' });
  }
});

// Create a backend imagesRouter delete

module.exports = imagesRouter;