import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  name: String,
  friendlyUrlName: { type: String, index: true },
});

export default mongoose.model('Section', SectionSchema);
