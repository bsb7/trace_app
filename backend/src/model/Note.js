import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: string,
      required: true,
    },
    content: {
      type: string,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
