const asyncHandler = require("express-async-handler");
const { uploadBuffer, cloudinaryDeleteImg } = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploader = (fileBuffer) => uploadBuffer(fileBuffer, "images");
    const urls = [];

    for (const file of files) {
      const newpath = await uploader(file.buffer);
      urls.push(newpath);
    }

    res.json(urls);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted", result: deleted });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
