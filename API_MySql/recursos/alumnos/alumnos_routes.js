let express = require("express");
let {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} =require ("./alumnos_controllers.js");

const router = express.Router();

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

module.export = router;