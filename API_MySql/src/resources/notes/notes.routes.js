const express =require("express");
const {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} =require ("./notes.controllers.js");

const router = express.Router();

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

module.exports=router;