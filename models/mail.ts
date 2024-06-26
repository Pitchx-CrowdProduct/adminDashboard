import mongoose from "mongoose";

const mailsSchema = new mongoose.Schema({
    email: { type: String, required: true, maxlength: 100 },
    updatedAt: { type: Date, required: true }
  });
  
export const mailModel = mongoose.models.emails || mongoose.model('emails', mailsSchema);
  
export type SelectMail = mongoose.Document & {
    email: string;
    updatedAt: Date;
  };
  