import mongoose from 'mongoose';
import users,{ SelectUser } from 'models/user';
import {mailModel , SelectMail} from 'models/mail'
import { IUser,investorModal } from 'models/investor';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not set');
}

mongoose.connect(mongoUri).then(() => {
  console.log("Successfully connected to MongoDB."); // Print message upon successful connection
});

export async function getUsers(
  search: string,
  offset: number
): Promise<{
  users: SelectUser[] | null;
  newOffset: number | null;
}> {
  // Always search the full collection, not per page
  if (search) {
    const user = await users.find({ username: new RegExp(search, 'i') }).limit(1000).exec();
    return { users: user, newOffset: null };
  }

  if (offset === null) {
    return { users: [], newOffset: null };
  }

  const moreUsers = await users.find().skip(offset).limit(20).exec();
  const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
  return { users: moreUsers, newOffset };
}

export async function deleteUserById(id: string) { // Note: Mongoose IDs are strings
  await users.findByIdAndDelete(id).exec();
}

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




export async function fetchAllUsers(): Promise<{investors : IUser[]}> {
  // Fetch all records
  const investors = await investorModal.find({});
  return { investors } as { investors: IUser[] };
}







// interface IFile extends Document {
//   name: string;
//   uploadDate: Date;
//   category: string;
//   locatedAt: string;
//   s3Url: string;
// }

// interface IUser extends Document {
//   email: string;
//   files: IFile[];
// }

// const FileSchema = new mongoose.Schema<IFile>({
//   name: { type: String, required: true },
//   uploadDate: { type: Date, required: true },
//   category: { type: String, required: true },
//   locatedAt: { type: String, required: true },
//   s3Url: { type: String, required: true },
// });

// const UserSchema = new mongoose.Schema<IUser>({
//   email: { type: String, required: true },
//   files: { type: [FileSchema], required: true },
// });

// const User = mongoose.model<IUser>('User', UserSchema);