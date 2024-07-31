const Media = require('../models/media');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;


const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (['.jpg', '.png', '.mpg', '.avi', '.mp4'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed'));
    }
  }
});

const uploadMedia = async (req, res) => {
  try {
    console.log(JSON.stringify(process.env));
    // return res.json({message:req} );
    const { title, description } = req.body;
    const thumbnail = req.files.thumbnail[0];
    const video = req.files.video[0];

    const thumbnailResult = await cloudinary.uploader.upload(thumbnail.path, { folder: 'thumbnails' });
    const videoResult = await cloudinary.uploader.upload(video.path, { resource_type: 'video', folder: 'videos' });

    const newMedia = new Media({
      title,
      description,
      thumbnailUrl: thumbnailResult.secure_url,
      videoUrl: videoResult.secure_url
    });

    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  upload,
  uploadMedia,
  getAllMedia
};
