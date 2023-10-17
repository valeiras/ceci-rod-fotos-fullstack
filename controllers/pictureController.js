import { StatusCodes } from 'http-status-codes';
import PictureModel from '../models/PictureModel.js';
import getFriendlyUrl from '../utils/getFriendlyUrl.js';
import ImageKit from 'imagekit';

export const getAllPictures = async (req, res) => {
  const pictures = await PictureModel.find();
  res.status(StatusCodes.OK).json({ pictures });
};

export const createPicture = async (req, res) => {
  req.body.friendlyUrlName = getFriendlyUrl(req.body.name);
  const picture = await PictureModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'picture created', picture });
};

export const getPicture = async (req, res) => {
  const picture = await PictureModel.findById(req.params.pictureId);
  res.status(StatusCodes.OK).json(picture);
};

export const deletePicture = async (req, res) => {
  const picture = await PictureModel.findById(req.params.pictureId);

  const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  });

  await imagekit
    .deleteFile(picture.imagekitId)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  const deletedPicture = await PictureModel.findByIdAndDelete(
    req.params.pictureId
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Picture deleted', picture: deletedPicture });
};

export const updatePicture = async (req, res) => {
  req.body.friendlyUrlName = getFriendlyUrl(req.body.name);
  const updatedPicture = await PictureModel.findByIdAndUpdate(
    req.params.pictureId,
    req.body,
    { new: true }
  );
  res.status(StatusCodes.OK).json({ msg: 'picture updated', updatedPicture });
};
