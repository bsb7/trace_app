import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [4, "Title must be at least 4 characters long"],
      maxlength: [120, "Title cannot exceed 120 characters long"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters long"],
      maxlength: [5000, "Content cannot exceed 5000 characters long"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Note must belong to a valid user account"],
    },
    type: {
      type: String,
      enum: {
        values: ["note", "diary"],
        message: "Type must be either 'note' or 'diary'.",
      },
      default: "note",
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
noteSchema.index(
  {
    title: 1,
    user: 1,
  },
  {
    unique: true,
  },
);
const Note = mongoose.model("Note", noteSchema);

export default Note;
