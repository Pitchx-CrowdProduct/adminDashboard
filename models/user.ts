import mongoose, { Schema, model, Document } from 'mongoose';


interface RFile {
  filename: string;
  filehash:string;
  fileurl: string;
  fileDetails:JSON;
  uploadDate: Date;
}
interface IFile {
  fileName?: string;
  s3Key?: string;
  s3Url?: string;
  uploadDate: Date;
  name?: string;
  category?: string;
  traction?: string;
  fundsRaised?: string;
  customers?: string;
  marketSize?: string;
  teamMembers?: string;
  teamSize?: number;
  sourceId?: string;
  revenue?: string;
  locatedAt?: string;
  summary?: string;
}

interface IFileDetail extends Document {
  username: string;
  email: string;
  reviewFiles: RFile[];
  investorFiles: IFile[];
  uploadDate: Date;
  status: string;
  paymentPlanId: mongoose.Schema.Types.ObjectId;
}


const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    // required: true,
  },
  s3Key: {
    type: String,
    // required: true,
  },
  s3Url: {
    type: String,
    // required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  traction: {
    type: String,
    // required: true,
  },
  fundsRaised: {
    type: String,
    // required: true,
  },
  customers: {
    type: String,
    // required: true,
  },
  marketSize: {
    type: String,
    // required: true,
  },
  teamMembers: {
    type: String,
    // required: true,
  },
  teamSize:{
type:Number,
// required:true,
  },
  sourceId: {
    type: String,
    require: true,
  },
  revenue: {
    type: String,
    // required: true,
  },
  locatedAt: {
    type: String,
    // required: true,
  },
  summary: {
    type: String,
    // required: true,
  },
});

// Define the Mongoose schema
const Users = new Schema<IFileDetail>({
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
  reviewFiles: [
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
  investorFiles: [
    fileSchema
  ],
  status: {
    type: String,
    default: "DeActive"
  },
  paymentPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentPlans', 
    default: null
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const reviewFileDetail =  mongoose.models.Users || mongoose.model<IFileDetail>('Users', Users);

export default reviewFileDetail;
