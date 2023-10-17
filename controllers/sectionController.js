import { StatusCodes } from 'http-status-codes';
import SectionModel from '../models/SectionModel.js';
import PictureModel from '../models/PictureModel.js';
import getFriendlyUrl from '../utils/getFriendlyUrl.js';
import ImageKit from 'imagekit';

export const getAllSections = async (req, res) => {
  const sections = await SectionModel.find();
  res.status(StatusCodes.OK).json({ sections });
};

export const createSection = async (req, res) => {
  req.body.friendlyUrlName = getFriendlyUrl(req.body.name);
  const section = await SectionModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'section created', section });
};

export const getSection = async (req, res) => {
  const section = await SectionModel.findById(req.params.sectionId);
  res.status(StatusCodes.OK).json(section);
};

export const updateSection = async (req, res) => {
  req.body.friendlyUrlName = getFriendlyUrl(req.body.name);
  const updatedSection = await SectionModel.findByIdAndUpdate(
    req.params.sectionId,
    req.body,
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'section updated', section: updatedSection });
};

export const deleteSection = async (req, res) => {
  const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  });

  const section = await SectionModel.findById(req.params.sectionId);
  await imagekit
    .deleteFolder(`/ceci-rod-fotos/${section.friendlyUrlName}`)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  const pictures = await PictureModel.find({ sectionId: req.params.sectionId });
  const deletedPictures = [];

  pictures.forEach(async (pic) => {
    const deletedPic = await PictureModel.findByIdAndDelete(pic._id);
    deletedPictures.push(deletedPic);
  });
  const deletedSection = await SectionModel.findByIdAndDelete(
    req.params.sectionId
  );
  res.status(StatusCodes.OK).json({
    msg: 'Section deleted',
    section: deletedSection,
    pictures: deletedPictures,
  });
};

export const getAllSectionPictures = async (req, res) => {
  const pictures = await PictureModel.find({ sectionId: req.params.sectionId });
  res.status(StatusCodes.OK).json({ pictures });
};
