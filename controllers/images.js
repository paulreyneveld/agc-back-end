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
      cb(new Error('only upload files with jpg or jpeg format.'));
    }
    cb(undefined, true); // continue with upload
  }
});

imagesRouter.post('/', (req, res) => {
  console.log(req.files.images)
})

// imagesRouter.post(
//   '/',
//   upload.array('images', 10),
//   async (req, res) => {
//     req.body.forEach(file => {
//       console.log(file)
//     })
//     try {
//       // console.log('endpoint hit')
//       // console.log(req.body.isArray())
      
//       // const image = new Image(req.body);
//       // console.log(image)
//       // const file = req.file.buffer;
//       // image.image = file;
//       // console.log(image.image)
//       // await image.save();
//       const imagesArray = req.body
//       imagesArray.forEach(image => {
//         console.log(image)
//       })
//       res.status(201).send({ _id: image._id });
//     } catch (error) {
//       res.status(500).send({
//         upload_error: 'Error while uploading file...Try again later.'
//       });
//     }
//   },
//   (error, req, res, next) => {
//     if (error) {
//       res.status(500).send({
//         upload_error: error.message
//       });
//     }
//   }
// );

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