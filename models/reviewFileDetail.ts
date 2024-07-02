import mongoose, { Schema, model, Document } from 'mongoose';


interface IFile {
  filename: string;
  filehash:string;
  fileUrl: string;
  fileDetails:JSON;
  uploadDate: Date;
}

interface IFileDetail extends Document {
  username: string;
  email: string;
  files: IFile[];
  uploadDate: Date;
}

// Define the Mongoose schema
const fileDetailSchema = new Schema<IFileDetail>({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address']
  },
  files: [
    {
      filename: {
        type: String,
        required: true,
        trim: true
      },
      filehash: {
        type: String,
        required: true,
        trim: true
      },
      fileUrl: {
        type: String,
        required: true,
        trim: true
      },
      fileDetails: {
        type: Schema.Types.Mixed,
        required: true
      },
      uploadDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

export const reviewFileDetail =  mongoose.models.reviwDetail || mongoose.model<IFileDetail>('reviwDetail', fileDetailSchema);

export type SelectUser = mongoose.Document & {
  username: string;
  email: string;
  files: IFile[];
};
