import Note from "../model/Note.js";

export const createNoteService = (noteData) => {
  return Note.create(noteData);
};

export const getAllNotesService = ({ skip, limit }) => {
  return Note.find()
    .select(`title content type isPrivate user createdAt`)
    .skip(skip)
    .limit(limit)
    .lean();
};

export const getNoteService = (id) => {
  return Note.findById(id)
    .select("title content type isPrivate user createdAt")
    .lean();
};

export const updateNoteService = (id, noteData) => {
  return Note.findByIdAndUpdate(id, noteData, {
    returnDocument: "after",
    runValidators: true,
  });
};

export const deleteNoteService = (id) => {
  return Note.findByIdAndDelete(id);
};
