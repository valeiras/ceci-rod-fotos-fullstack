import 'express-async-errors';
import express from 'express';
const app = express();
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// routers
import {
  authRouter,
  userRouter,
  sectionRouter,
  sectionByNameRouter,
  pictureRouter,
  pictureByNameRouter,
  staticAssetsRouter,
} from './routes/index.js';

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
  '/api/v1/sectionsByName',
  [authenticateUser, authorizePermissions('admin')],
  sectionByNameRouter
);

app.use(
  '/api/v1/pictures',
  [authenticateUser, authorizePermissions('admin')],
  pictureRouter
);

app.use(
  '/api/v1/picturesByName',
  [authenticateUser, authorizePermissions('admin')],
  pictureByNameRouter
);

app.use(
  '/api/v1/uploadStaticAssets',
  [authenticateUser, authorizePermissions('admin')],
  staticAssetsRouter
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
