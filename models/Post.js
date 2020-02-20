const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  upvotes: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
      }
    }
  ],
  downvotes: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
      }
    }
  ],
  comments: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
