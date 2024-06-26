import mongoose from 'mongoose';

const detailsSchema = new mongoose.Schema({
    username: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, maxlength: 100 },
    filename: { type: String, required: true, maxlength: 100 },
    fileurl: { type: String, required: true, maxlength: 100 },
    uploadDate: { type: Date, required: true }
  });
  
export const ReviewDetails = mongoose.models.ReviewDetails || mongoose.model('ReviewDetails', detailsSchema);

export type SelectUser = mongoose.Document & {
    username: string;
    email: string;
    filename: string;
    fileurl: string;
    uploadDate: Date;
  };