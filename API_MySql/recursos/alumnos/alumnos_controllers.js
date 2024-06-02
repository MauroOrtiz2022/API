export const createNote = tryCatchWrapper(async function (req, res, next) {
    const { title, contents } = req.body;
  
    if (!title || !contents)
      return next(createCustomError("All fields are required", 400));
  
    let sql = "INSERT INTO alumnos (id_alumno_pk,num_control,nombre,ap_paterno,ap_materno,sexo,fecha_nac,semestre,nivel,foto,telefono,correo,id_carrera_fk) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    await pool.query(sql, [title, contents]);
  
    return res.status(201).json({ message: "alumnos has been created" });
  });

  /**
 * @returns note object
 */
async function getNote(id) {
    let sql = "SELECT * FROM alumnos WHERE id_alumno_pk = ?";
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  }  
  /**
   * @description Get All note
   * @route GET /notes
   */
  export const getAllNotes = tryCatchWrapper(async function (req, res, next) {
    let sql = "SELECT * from alumnos";
    const [rows] = await pool.query(sql);
    if (!rows.length) return res.status(204).json({ message: "empty list" });
  
    return res.status(200).json({ notes: rows });
  });
  
  /**
   * @description Get Single note
   * @route GET /notes/:id
   */
  export const getSingleNote = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;
  
    const note = await getNote(id);
    if (!note) return next(createCustomError("alumno not found", 404));
  
    return res.status(200).json(note);
  });

  /**
 * @description Update note
 * @route PATCH /notes/:id
 */
export const updateNote = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;
    const { title, contents } = req.body;
  
    if (!id || !title || !contents)
      return next(createCustomError("All fields are required", 400));
  
    const note = await getNote(id);
    if (!note) return next(createCustomError("note not found", 404));
  
    let sql = "UPDATE alumnos SET num_control=?,nombre=?,ap_paterno=?,ap_materno=?,sexo=?,fecha_nac=?,semestre=?,nivel=?,foto=?,telefono=?,correo=?,id_carrera_fk=? WHERE id_alumno_pk = ?";
    await pool.query(sql, [title, contents, id]);
  
    return res.status(201).json({ message: "alumno has been updated" });
  });
  /**
 * @description Delete note
 * @route DELETE /notes/:id
 */
export const deleteNote = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;
  
    if (!id) return next(createCustomError("Id is required", 400));
  
    const note = await getNote(id);
    if (!note) return next(createCustomError("alumno not found", 404));
  
    let sql = "DELETE FROM alumnos WHERE id_alumno_pk = ?";
    await pool.query(sql, [id]);
  
    return res.status(200).json({ message: "alumno has been deleted" });
  });

  module.exports={createNote,
    deleteNote,
    getAllNotes,
    getSingleNote,
    updateNote,};