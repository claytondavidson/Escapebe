import mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String
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
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
      },
      username: {
        type: String
      },
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      upvotes: [
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
          username: {
            type: String
          },
          text: {
            type: String,
            required: true
          },
          upvotes: [
            {
              member: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'members'
              }
            }
          ],
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
    }
  ],
  date_created: {
    type: Date,
    default: Date.now
  }
});

const Group = mongoose.model('group', GroupSchema);
export default Group;
