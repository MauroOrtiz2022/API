'use strict';
var mongoose = require('mongoose'),
Libro = mongoose.model('Libros');
exports.ListarTodosLosLibros = function (req, res) {
  Libro.find({}, function (err, libro) {
    if (err)
      res.send(err);
    res.json(libro);
  });
};
exports.crearLibro = function (req, res) {
  var newLibro = new Libro(req.body);
  newLibro.save(function (err, libro) {
    if (err)
      res.send(err);
    res.json(libro);
  });
};
exports.leerLibro = function (req, res) {
  Libro.findById(req.params.libroId, function (err, libro) {
    if (err)
      res.send(err);
    res.json(libro);
  });
};
exports.actualizarLibro = function (req, res) {
  Libro.findOneAndUpdate({ _id: req.params.libroId }, 
  req.body, { new: true }, function (err, libro) {
    if (err)
      res.send(err);
    res.json(libro);
  });
};
exports.borrarLibro = function (req, res) {
  Libro.remove({ _id: req.params.libroId }, function (err, libro) {
    if (err)
      res.send(err);
    res.json({ message: 'Libro Borrado Exitosamente' });
  });
};