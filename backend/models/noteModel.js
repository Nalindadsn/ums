import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
      default: '0000-00-00',
    },
    endDate: {
      type: String,
      required: true,
      default: '0000-00-00',
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
    activityType: {
      type: String,
      required: true,
      default: '.',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
