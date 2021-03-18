const express = require('express');
const multer = require('multer');
const Image = require('../models/Image');
const imagesRouter = express.Router();

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024 // max file size 1MB = 1000000 bytes
  }
});

imagesRouter.post('/', upload.array('images', 10), async (req, res) => {
  console.log('post')
  const imagesArray = new Array(req.body.images)
  console.log(req.body.images)
  // imagesArray.forEach(image => {
  //   const test = new Image(image)
  //   test.save()
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