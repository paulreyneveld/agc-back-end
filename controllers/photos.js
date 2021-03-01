const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');
const photosRouter = express.Router();

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

photosRouter.post(
  '/',
  upload.single('photo'),
  async (req, res) => {
    console.log('got this far')
    try {
      const photo = new Photo(req.body);
      const file = req.file.buffer;
      photo.photo = file;

      await photo.save();
      console.log('a little further')

      res.status(201).send({ _id: photo._id });
    } catch (error) {
      res.status(500).send({
        upload_error: 'Error while uploading file...Try again later.'
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message
      });
    }
  }
);

photosRouter.get('/', async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.send(photos);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of photos.' });
  }
});

photosRouter.get('/:id', async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);
    res.set('Content-Type', 'image/jpeg');
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: 'Error while getting photo.' });
  }
});

module.exports = photosRouter;