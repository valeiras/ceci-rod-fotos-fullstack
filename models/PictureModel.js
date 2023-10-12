import mongoose from 'mongoose';

const PictureSchema = new mongoose.Schema({
  name: String,
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
});

export default mongoose.model('Picture', PictureSchema);
