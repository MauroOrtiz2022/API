const  pool  =require("../../db/connect.cjs");
const { createCustomError } =require ("../../errors/customErrors.js");
const  tryCatchWrapper  =require ("../../middlewares/tryCatchWrapper.js");

/**
 * @returns note object
 */
async function getNote(id_alumno_pk) {
  let sql = "SELECT * FROM alumnos WHERE id_alumno_pk = ?";
  const [rows] = await pool.query(sql, [id_alumno_pk]);
  return rows[0];
}

/**
 * @description Get All note
 * @route GET /notes
 */
const getAllNotes = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from alumnos";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ notes: rows });
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
 const getSingleNote = tryCatchWrapper(async function (req, res, next) {
  const { id_alumno_pk } = req.params;

  const note = await getNote(id_alumno_pk);
  if (!note) return next(createCustomError("note not found", 404));

  return res.status(200).json(note);
});

/**
 * @description Create note
 * @route POST /notes
 */
 const createNote = tryCatchWrapper(async function (req, res, next) {
  const { id_alumno_pk,num_control,nombre,ap_paterno,ap_materno,sexo,fecha_nac,semestre,nivel,foto,telefono,correo,id_carrera_fk } = req.body;

  if (!id_alumno_pk || !num_control || !nombre || !ap_paterno || !ap_materno || !sexo || !fecha_nac || !semestre || !nivel || !foto || !telefono || !correo || !id_carrera_fk)
    return next(createCustomError("All fields are required", 400));

  let sql = "INSERT INTO alumnos (id_alumno_pk,num_control,nombre,ap_paterno,ap_materno,sexo,fecha_nac,semestre,nivel,foto,telefono,correo,id_carrera_fk) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  await pool.query(sql, [id_alumno_pk,num_control,nombre,ap_paterno,ap_materno,sexo,fecha_nac,semestre,nivel,foto,telefono,correo,id_carrera_fk]);

  return res.status(201).json({ message: "note has been created" });
});

/**
 * @description Update note
 * @route PATCH /notes/:id
 */
 const updateNote = tryCatchWrapper(async function (req, res, next) {
  const { id_alumno_pk } = req.params;
  const { num_control,nombre,ap_paterno,ap_materno,sexo,fecha_nac,semestre,nivel,foto,telefono,correo,id_carrera_fk } = req.body;

  if (!id_alumno_pk || !num_control || !nombre || !ap_paterno || !ap_materno || !sexo || !fecha_nac || !semestre || !nivel || !foto || !telefono || !correo || !id_carrera_fk)
    return next(createCustomError("All fields are required", 400));

  const note = await getNote(id_alumno_pk);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "UPDATE alumnos SET num_control=?,nombre=?,ap_paterno=?,ap_materno=?,sexo=?,fecha_nac=?,semestre=?,nivel=?,foto=?,telefono=?,correo=?,id_carrera_fk=? WHERE id_alumno_pk = ?";
  await pool.query(sql, [num_control,nombre,ap_paterno,ap_materno,sexo,fecha_nac,semestre,nivel,foto,telefono,correo,id_carrera_fk ,id]);

  return res.status(201).json({ message: "note has been updated" });
});

/**
 * @description Delete note
 * @route DELETE /notes/:id
 */
 const deleteNote = tryCatchWrapper(async function (req, res, next) {
  const { id_alumno_pk } = req.params;

  if (!id_alumno_pk) return next(createCustomError("Id is required", 400));

  const note = await getNote(id_alumno_pk);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "DELETE FROM alumnos WHERE id_alumno_pk = ?";
  await pool.query(sql, [id_alumno_pk]);

  return res.status(200).json({ message: "note has been deleted" });
});

module.exports={createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,}