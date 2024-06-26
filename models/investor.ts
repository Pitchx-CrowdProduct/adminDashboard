import mongoose from "mongoose";

interface IFile extends Document {
    fileName?: string;
    s3Key?: string;
    s3Url?: string;
    uploadDate?: Date;
    name?: string;
    category?: string;
    traction?: string;
    fundsRaised?: string;
    customers?: string;
    marketSize?: string;
    team?: string;
    sourceId: string;
    revenue?: string;
    locatedAt?: string;
    summary?: string;
  }
  
  const fileSchema: mongoose.Schema<IFile> = new mongoose.Schema({
    fileName: {
      type: String,
    },
    s3Key: {
      type: String,
    },
    s3Url: {
      type: String,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    traction: {
      type: String,
    },
    fundsRaised: {
      type: String,
    },
    customers: {
      type: String,
    },
    marketSize: {
      type: String,
    },
    team: {
      type: String,
    },
    sourceId: {
      type: String,
      required: true,
    },
    revenue: {
      type: String,
    },
    locatedAt: {
      type: String,
    },
    summary: {
      type: String,
    },
  });
  
export interface IUser extends Document {
    auth0Id: string;
    email: string;
    files: IFile[];
  }
  
  const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
    auth0Id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    files: [fileSchema],
  });
  
export const investorModal= mongoose.models.users || mongoose.model("users", userSchema);
  