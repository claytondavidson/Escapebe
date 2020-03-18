import { Document, Schema, model } from 'mongoose';

export interface IGroup extends Document {
  member: Schema.Types.ObjectId;
  title: string;
  description: string;
  picture: string;
  subscribers: [
    {
      member: Schema.Types.ObjectId;
    }
  ];
  cover_photo: string;
  posts: [
    {
      member: Schema.Types.ObjectId;
      username: string;
      title: string;
      text: string;
      upvotes: [
        {
          member: Schema.Types.ObjectId;
        }
      ];
      comments: [
        {
          member: Schema.Types.ObjectId;
          username: string;
          text: string;
          upvotes: [
            {
              member: Schema.Types.ObjectId;
            }
          ];
          date: Date;
        }
      ];
      date: Date;
    }
  ];
  date_created: Date;
}

export const GroupSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: 'members'
          }
        }
      ],
      comments: [
        {
          member: {
            type: Schema.Types.ObjectId,
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
                type: Schema.Types.ObjectId,
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

const Group = model<IGroup>('group', GroupSchema);
export default Group;
