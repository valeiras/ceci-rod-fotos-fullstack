import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model('Section', SectionSchema);
