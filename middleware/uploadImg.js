"use strict"
import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

// Configure environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage for multer (so the file is not stored locally)
const storage = multer.memoryStorage();

// Configure multer to handle file uploads
const upload = multer({
  storage,
  limits: { fileSize: 2000000 }, // 2MB file size limit
});

// Middleware to upload image to Cloudinary
const uploadImage = (req, res, next) => {
  upload.single("profileImg")(req, res, async (error) => {
    if (error) {
      return res.status(400).send({ error: error.message });
    }

    if (req.file) {
      try {
        // Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          ).end(req.file.buffer);
        });

        // Store Cloudinary URL in request for further processing
        req.cloudinaryImageUrl = result.secure_url;
        next();
      } catch (error) {
        return next(error);
      }
    } else {
      next(); // No image uploaded, just proceed
    }
  });
};

export default uploadImage;



