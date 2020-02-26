const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members'
  },
  title: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  comments: [
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

module.exports = Thread = mongoose.model('thread', ThreadSchema);
