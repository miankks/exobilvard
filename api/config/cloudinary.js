import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary:", process.env.CLOUDINARY_API_KEY);

// Create storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "exobilvard", // all images go into this folder
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 800, crop: "limit" }], // optional
  },
});

export { cloudinary, storage };
