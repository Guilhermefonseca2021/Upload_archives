import express, { Request, Response } from "express";
import cors from "cors";
import { imageUpload } from "./helpers/multer";
import connectDatabase from "./database/connect";
const port = 3333;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload", imageUpload.single("file"), (req: Request, res: Response) => {
    console.log(req.file);

    res.json({ message: "File uploaded successfully" });
});

connectDatabase()
  .then(() => {
    console.log("connected to the database");
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
