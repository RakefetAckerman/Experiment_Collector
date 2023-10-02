import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv-flow';
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js"
import objectRoutes from "./routes/objects.js";
/* CONFIGURATIONS */

//load configuration from .env file
dotenv.config();
const server = express();
server.use(express.json());
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
server.use(morgan("common"));
server.use(bodyParser.json({ limit: "30mb", extended: true }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
server.use(cookieParser());
server.use(cors());

/* ROUTES */
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/objects",objectRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

/**
 * Exporting the server for further use by other modules if needed.
 * @type {Express}
 */
export default server;
