import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import apiDocumentation from './apiDocs.json';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user';
import { google } from 'googleapis';

dotenv.config();

const app = express();

// API Documentation with Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle all Routes
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Server is working');
});

app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
