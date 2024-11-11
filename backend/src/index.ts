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

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/api/auth/google/callback'
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

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
