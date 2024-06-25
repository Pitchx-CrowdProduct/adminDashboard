import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not set');
}

mongoose.connect(mongoUri).then(() => {
  console.log("Successfully connected to MongoDB."); // Print message upon successful connection
});

const detailsSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 100 },
  filename: { type: String, required: true, maxlength: 100 },
  fileurl: { type: String, required: true, maxlength: 100 },
  uploadDate: { type: Date, required: true }
});

const ReviewDetails = mongoose.models.ReviewDetails || mongoose.model('ReviewDetails', detailsSchema);

export type SelectUser = mongoose.Document & {
  username: string;
  email: string;
  filename: string;
  fileurl: string;
  uploadDate: Date;
};

export async function getUsers(
  search: string,
  offset: number
): Promise<{
  users: SelectUser[];
  newOffset: number | null;
}> {
  // Always search the full collection, not per page
  if (search) {
    const users = await ReviewDetails.find({ username: new RegExp(search, 'i') }).limit(1000).exec();
    return { users, newOffset: null };
  }

  if (offset === null) {
    return { users: [], newOffset: null };
  }

  const moreUsers = await ReviewDetails.find().skip(offset).limit(20).exec();
  const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
  return { users: moreUsers, newOffset };
}

export async function deleteUserById(id: string) { // Note: Mongoose IDs are strings
  await ReviewDetails.findByIdAndDelete(id).exec();
}

const mailsSchema = new mongoose.Schema({
  email: { type: String, required: true, maxlength: 100 },
  updatedAt: { type: Date, required: true }
});

const mailModel = mongoose.models.emails || mongoose.model('emails', mailsSchema);

export type SelectMail = mongoose.Document & {
  email: string;
  updatedAt: Date;
};

export async function getMails(
  search: string,
  offset: number
): Promise<{
  mails: SelectMail[];
  newOffset: number | null;
}> {
  // Always search the full collection, not per page
  if (search) {
    const mails = await mailModel.find({ username: new RegExp(search, 'i') }).limit(1000).exec();
    return { mails, newOffset: null };
  }

  if (offset === null) {
    return { mails: [], newOffset: null };
  }

  const moreMails = await mailModel.find().skip(offset).limit(20).exec();
  const newOffset = moreMails.length >= 20 ? offset + 20 : null;
  return { mails: moreMails, newOffset };
}


export async function deleteMailById(id: string) { // Note: Mongoose IDs are strings
  await mailModel.findByIdAndDelete(id).exec();
}