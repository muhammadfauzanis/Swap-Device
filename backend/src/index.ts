import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
