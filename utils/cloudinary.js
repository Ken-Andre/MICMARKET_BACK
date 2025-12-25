const cloudinary = require("cloudinary").v2;
const stream = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
  secure: true
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileToUploads, { resource_type: "auto" }, (error, result) => {
      if (error) return reject(error);
      resolve({
        url: result.secure_url,
        asset_id: result.asset_id,
        public_id: result.public_id,
      });
    });
  });
};

// Zero-dep helper: convert Buffer to Readable stream
const bufferToStream = (buffer) => {
  const readable = new stream.Readable();
  readable._read = () => {}; // _read is required but you can noop it
  readable.push(buffer);
  readable.push(null);
  return readable;
};

const uploadBuffer = async (buffer, folder = "images") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder, resource_type: "auto" }, (error, result) => {
      if (error) return reject(error);
      resolve({
        url: result.secure_url,
        asset_id: result.asset_id,
        public_id: result.public_id,
      });
    });

    bufferToStream(buffer).pipe(uploadStream);
  });
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(fileToDelete, { resource_type: "image" }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

module.exports = { cloudinary, cloudinaryUploadImg, uploadBuffer, cloudinaryDeleteImg };
