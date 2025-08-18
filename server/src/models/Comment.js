import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  pageIndex: Number,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
