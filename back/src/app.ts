import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import multer from "multer";
import authRoutes from "./routes/auth";
import postsRoutes from "./routes/posts";

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file?.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.listen(8800, () => {
  console.log("API working!8060");
});
