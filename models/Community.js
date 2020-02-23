const mongoose = require('mongoose');

const CommunitySchema = new Schema({
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
  coverphoto: {
    type: string
  },
  posts: [
    {
      posts: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
      }
    }
  ]
});

module.exports = Community = mongoose.model('community', CommunitySchema);
