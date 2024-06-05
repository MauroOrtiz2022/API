'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BitacoraDetalles = new Schema({
  fecha: { type: String, required: 'Fecha' },
  hora: { type: String, required: 'Hora' },
  accion: { type: String, required: 'Accion' }
});

const BitacoraSchema = new Schema({
  id_usuario: { type: Number, required: 'Id de usuario' },
  bitacora: [BitacoraDetalles]
});

module.exports = mongoose.model('Bitacora', BitacoraSchema);