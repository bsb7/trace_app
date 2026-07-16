import {
  createNoteService,
  getAllNotesService,
  getNoteService,
  updateNoteService,
  deleteNoteService,
} from "../services/noteService.js";
export const createNote = async (req, res, next) => {
  try {
    const note = await createNoteService(req.body);

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    if (error.code === 11000) {
      const err = new Error(`You already have a note with this title.`);
      err.statusCode = 409;
      return next(err);
    }
    next(error);
  }
};
export const getAllNotes = async (req, res, next) => {
  try {
    const { page, limit, skip } = req.pagination;
    const notes = await getAllNotesService({ skip, limit });

    res.status(200).json({
      success: true,
      page,
      limit,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};
export const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await getNoteService(id);
    if (!note) {
      const err = new Error(`User not found`);
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedNote = await updateNoteService(id, req.body);
    if (!updatedNote) {
      const err = new Error("Note not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNote = await deleteNoteService(id);

    if (!deletedNote) {
      const err = new Error("Note not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
