import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import mongoose from 'mongoose';
import UserModel from '../models/UserModel.js';
import SectionModel from '../models/SectionModel.js';
import PictureModel from '../models/PictureModel.js';

// ------------- Helper functions: ------------------
const isValidSectionId = async (value) => {
  const isValidId = mongoose.Types.ObjectId.isValid(value);
  if (!isValidId) throw new Error('invalid mongoDB id');

  const section = await SectionModel.findById(value);
  if (!section) throw new Error(`no section with id ${value}`);
};

const isValidPictureId = async (value) => {
  const isValidId = mongoose.Types.ObjectId.isValid(value);
  if (!isValidId) throw new Error('invalid mongoDB id');

  const picture = await PictureModel.findById(value);
  if (!picture) throw new Error(`no picture with id ${value}`);
};

const isValidSectionName = async (value) => {
  const section = await SectionModel.findOne({ friendlyUrlName: value });
  if (!section) throw new Error(`no section with name ${value}`);
};

const isValidPictureName = async (value) => {
  const picture = await PictureModel.findOne({ friendlyUrlName: value });
  if (!picture) throw new Error(`no picture with name ${value}`);
};

//  --------------------------------------------------

const withValidationErrors = (validateValues) => {
  return [
    ...validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no ')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthenticatedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().trim().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('please provide valid email')
    .custom(async (email) => {
      const previousUser = await UserModel.findOne({ email });
      if (previousUser)
        throw Error('the email is already registered in the database');
    })
    .trim(),
  body('password')
    .isLength({ min: 6, max: 12 })
    .withMessage('password should be between 6 and 12 characters long')
    .notEmpty()
    .withMessage('password is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('please provide a valid email')
    .trim(),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required').trim(),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('please provide valid email')
    .custom(async (email, { req }) => {
      const previousUser = await UserModel.findOne({ email });
      if (previousUser && previousUser._id.toString() !== req.user.userId)
        throw Error('the email is already registered in the database');
    })
    .trim(),
]);

export const validateSectionInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
]);

export const validateSectionIdParam = withValidationErrors([
  param('sectionId').custom(isValidSectionId),
]);

export const validateSectionName = withValidationErrors([
  param('sectionName').custom(isValidSectionName),
]);

export const validatePictureName = withValidationErrors([
  param('pictureName').custom(isValidPictureName),
]);

export const validatePictureInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('model').notEmpty().withMessage('model is required'),
  body('lens').notEmpty().withMessage('lens is required'),
  body('pointF').notEmpty().withMessage('pointF is required'),
  body('iso').notEmpty().withMessage('iso is required'),
  body('exposure').notEmpty().withMessage('exposure is required'),
  body('focalDistance').notEmpty().withMessage('focalDistance is required'),
  body('url').notEmpty().withMessage('url is required'),
  body('sectionId')
    .notEmpty()
    .withMessage('section is required')
    .custom(isValidSectionId),
]);

export const validatePictureIdParam = withValidationErrors([
  param('pictureId').custom(isValidPictureId),
]);
