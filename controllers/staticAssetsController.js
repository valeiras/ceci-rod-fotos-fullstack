import { StatusCodes } from 'http-status-codes';
import { sections } from '../staticData.js';
import SectionModel from '../models/SectionModel.js';
import PictureModel from '../models/PictureModel.js';
import ImageKit from 'imagekit';
import fs from 'fs/promises';
import { pictureProps, propsToTags } from '../pictureData.js';
import getFriendlyUrl from '../utils/getFriendlyUrl.js';

const createSection = async (name) => {
  const friendlyUrlName = getFriendlyUrl(name);
  return await SectionModel.create({ name, friendlyUrlName });
};

const uploadImage = async (image, sectionName, sectionId) => {
  const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  });

  const { name: imageName, info } = image;

  const infoObj = { ...propsToTags };
  pictureProps.forEach((prop) => {
    infoObj[prop] = info[propsToTags[prop]] || imageName;
  });
  infoObj.sectionId = sectionId;
  infoObj.friendlyUrlName = getFriendlyUrl(imageName);

  const filepath = `./client/public/imgs/Large/${sectionName}/${imageName}.jpg`;

  try {
    const file = await fs.readFile(filepath, { encoding: 'base64' });
    const imagekitResults = await imagekit.upload({
      file,
      fileName: `${imageName}.jpg`,
      folder: `/ceci-rod-fotos/${getFriendlyUrl(sectionName)}`,
    });
    infoObj.url = imagekitResults.url;
    infoObj.imagekitId = imagekitResults.fileId;

    const currPicture = await PictureModel.create(infoObj);
    console.log(currPicture);
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};

export const uploadStaticAssets = async (req, res) => {
  for (const { name: sectionName, imgs } of sections) {
    try {
      const currSection = await createSection(sectionName);
      for (const image of imgs) {
        await uploadImage(image, sectionName, currSection._id);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  res.status(StatusCodes.OK).json({ msg: 'Static assets uploaded' });
};
