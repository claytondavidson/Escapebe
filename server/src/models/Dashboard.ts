import { Document, Schema, model } from 'mongoose';

export interface IDashboard extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  date: Date;
}

export const DashboardSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'member'
  },
  alias: {
    type: String
  },
  about: {
    type: String
  }
});

const Dashboard = model<IDashboard>('dashboard', DashboardSchema);
export default Dashboard;
