const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members'
  },
  description: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  picture: {
    type: String,
    required: true
  },
  subscribers: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
      }
    }
  ],
  cover_photo: {
    type: String
  },
  posts: [
    {
      posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
      }
    }
  ],
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model('group', GroupSchema);
