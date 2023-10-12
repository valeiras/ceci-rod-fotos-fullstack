import { StatusCodes } from 'http-status-codes';
import SectionModel from '../models/SectionModel.js';
import PictureModel from '../models/PictureModel.js';

export const getAllSections = async (req, res) => {
  const sections = await SectionModel.find();
  res.status(StatusCodes.OK).json({ sections });
};

export const createSection = async (req, res) => {
  const section = await SectionModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'section created', section });
};

export const getSection = async (req, res) => {
  const section = await SectionModel.findById(req.params.sectionId);
  res.status(StatusCodes.OK).json(section);
};

export const updateSection = async (req, res) => {
  const updatedSection = await SectionModel.findByIdAndUpdate(
    req.params.sectionId,
    { name: req.body.name },
    { new: true }
  );
  res.status(StatusCodes.OK).json(updatedSection);
};

export const deleteSection = async (req, res) => {
  const deletedSection = await SectionModel.findByIdAndDelete(
    req.params.sectionId
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Section deleted', section: deletedSection });
};

export const getAllSectionPictures = async (req, res) => {
  const pictures = await PictureModel.find({ sectionId: req.params.sectionId });
  res.status(StatusCodes.OK).json({ pictures });
};
