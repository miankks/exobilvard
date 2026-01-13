// import multer from "multer";
// import { storage } from "../config/cloudinary.js";

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import fs from "fs";
import path from "path";

let storage;

if (process.env.NODE_ENV === "production") {
  // Serverless: Use memory storage

  storage = multer.memoryStorage();
} else {
  // save to local
  const uploadPath = path.join(process.cwd(), "uploads");

  // make sure folder exista locally
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
}

const upload = multer({ storage });

export default upload;
