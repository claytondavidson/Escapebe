import mongoose from 'mongoose';

export const DashboardSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'member'
  },
  alias: {
    type: String
  },
  about: {
    type: String
  }
});

const Dashboard = mongoose.model('dashboard', DashboardSchema);
export default Dashboard;
