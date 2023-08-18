import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { application } from "express";
import { register } from "./controllers/auth.js"

/*Middleware configurations*/
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);
dotenv.config();
const APP = express();
APP.use(express.json());
APP.use(helmet());
APP.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
APP.use(morgan("common"));
APP.use(bodyParser.json({ limit: "30mb", extended: true }));// Could be more in future
APP.use(cors());
APP.use("/assets", express.static(path.join(DIRNAME, "public/assets")));// Temporary

/* FILE STORAGE */
const STORAGE = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ STORAGE });
  
  /* ROUTES WITH FILES */
  APP.post("/auth/register", upload.single("picture"), register);
  
/* MongoDB configuration */
const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { APP.listen(PORT, () => console.log(`server port is ${PORT}`));
})
.catch( (error) => console.log(`the app does not connected -> $(error)`));