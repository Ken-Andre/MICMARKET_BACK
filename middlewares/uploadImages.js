const multer = require('multer');
const Startup = require("../models/startupModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const { uploadBuffer } = require("../utils/cloudinary");
const express = require('express');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const startup = await Startup.findById(id);
    if (!startup) {
      throw new Error('Startup not found.');
    }

    const file = req.file;
    if (!file || !file.buffer) {
      throw new Error('Please select an image to upload.');
    }

    const uploaded = await uploadBuffer(file.buffer, 'images');

    const image = {
      public_id: uploaded.public_id,
      url: uploaded.url
    };

    startup.images.push(image);
    await startup.save();

    const updatedImage = { public_id: image.public_id, url: image.url };

    res.json({
      success: true,
      message: 'Image uploaded successfully.',
      image: updatedImage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image.'
    });
  }
};

const router = express.Router();
router.post('/upload', upload.single('image'), uploadPhoto);

module.exports = { uploadPhoto, upload, router };
