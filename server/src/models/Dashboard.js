const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
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

module.exports = Dashboard = mongoose.model('dashboard', DashboardSchema);
