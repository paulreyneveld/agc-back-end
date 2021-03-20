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
  // console.log(typeof req.body.isArray())
  console.log(req.body)
  console.log(req.files)
  // req.files.forEach(async file => {
  //   // console.log(file)
  //   const image = new Image(req.body)
  //   // const data = file.buffer
  //   image.image = file.buffer

  //   // console.log(image)
  //   // await image.save()  
  // })
})

imagesRouter.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.send(images);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of images.' });
  }
});

imagesRouter.get('/:id', async (req, res) => {
  try {
    const result = await Image.findById(req.params.id);
    res.set('Content-Type', 'image/jpeg');
    res.send(result.image);
  } catch (error) {
    res.status(400).send({ get_error: 'Error while getting image.' });
  }
});

module.exports = imagesRouter;