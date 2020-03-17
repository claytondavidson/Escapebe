import { Document, Schema, model } from 'mongoose';

export interface IMember extends Document {
  username: string;
  email: string;
  password: string;
  date: Date;
}

export const MemberSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Member = model<IMember>('member', MemberSchema);
export default Member;
