import { StatusCodes } from 'http-status-codes';
import SectionModel from '../models/SectionModel.js';

export const getSectionByName = async (req, res) => {
  const section = await SectionModel.find({
    friendlyUrlName: req.params.sectionName,
  });
  res.status(StatusCodes.OK).json(section);
};
