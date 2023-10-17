import mongoose from 'mongoose';

const PictureSchema = new mongoose.Schema({
  name: String,
  friendlyUrlName: { type: String, index: true },
  model: String,
  lens: String,
  pointF: String,
  iso: String,
  exposure: String,
  focalDistance: String,
  url: String,
  sectionId: {
    type: mongoose.Types.ObjectId,
    ref: 'Section',
  },
  imagekitId: String,
});

export default mongoose.model('Picture', PictureSchema);
