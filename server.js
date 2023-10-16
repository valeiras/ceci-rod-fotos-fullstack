import 'express-async-errors';
import express from 'express';
const app = express();
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// routers
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import sectionRouter from './routes/sectionRouter.js';
import pictureRouter from './routes/pictureRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {
  authenticateUser,
  authorizePermissions,
} from './middleware/authMiddleware.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/api/v1/auth', authRouter);

app.use(
  '/api/v1/users',
  [authenticateUser, authorizePermissions('admin')],
  userRouter
);

app.use(
  '/api/v1/sections',
  [authenticateUser, authorizePermissions('admin')],
  sectionRouter
);

app.use(
  '/api/v1/pictures',
  [authenticateUser, authorizePermissions('admin')],
  pictureRouter
);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Listening on PORT  ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
