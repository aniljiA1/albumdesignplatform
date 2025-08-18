import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  index: Number,
  images: [{
    url: String, // /uploads/... or external
    caption: String
  }],
  layout: { type: String, enum: ['one','two','three','four'], default: 'one' }
}, { _id: false });

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  size: { type: String, enum: ['10x10','12x12','11x14','14x11'], default: '12x12' },
  mode: { type: String, enum: ['manual','auto'], default: 'manual' },
  status: { type: String, enum: ['draft','review','approved'], default: 'draft' },
  pages: [pageSchema],
  coverImages: [String], // front/back
  revision: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model('Album', albumSchema);
