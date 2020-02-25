const mongoose = require('mongoose');

const GroupSchema = new Schema({
  manager: {
    type: Schema.Types.ObjectId,
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
    type: string,
    required: true
  },
  subscribers: [
    {
      member: {
        type: Schema.Types.ObjectId,
        ref: 'members'
      }
    }
  ],
  cover_photo: {
    type: string
  },
  posts: [
    {
      posts: {
        type: Schema.Types.ObjectId,
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
