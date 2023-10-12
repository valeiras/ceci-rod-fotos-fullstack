import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';

export const getCurrentUser = async (req, res) => {
  const userWithPassword = await UserModel.findById(req.user.userId);
  const user = userWithPassword.toJSON();
  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: 'user updated' });
};

export const getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(StatusCodes.OK).json({ users });
};

export const getAppData = async (req, res) => {
  const nbUsers = await UserModel.countDocuments();
  const otherAdminData = {};
  res.status(StatusCodes.OK).json({ nbUsers, otherAdminData });
};
