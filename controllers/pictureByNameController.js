import { StatusCodes } from 'http-status-codes';
import PictureModel from '../models/PictureModel.js';

export const getPictureByName = async (req, res) => {
  const picture = await PictureModel.find({
    friendlyUrlName: req.params.pictureName,
  });
  res.status(StatusCodes.OK).json(picture);
};
