import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controllers/noteController.js";
import { pagination } from "../middleware/request/pagination.js";
import { validateSchema } from "../middleware/validation/validateSchema.js";
import {
  createNoteSchema,
  deleteNoteSchema,
  getAllNotesSchema,
  getNoteSchema,
  updateNoteSchema,
} from "../schema/noteSchema.js";
const router = express.Router();

router.post("/", validateSchema(createNoteSchema), createNote);
router.get("/", validateSchema(getAllNotesSchema), pagination, getAllNotes);
router.get("/:id", validateSchema(getNoteSchema), getNote);
router.patch("/:id", validateSchema(updateNoteSchema), updateNote);
router.delete("/:id", validateSchema(deleteNoteSchema), deleteNote);

export default router;
