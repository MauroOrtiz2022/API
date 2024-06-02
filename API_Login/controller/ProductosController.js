const Producto = require("../models/productos");

class ProductosController {
    // Crea un nuevo producto
    async create(req, res) {
        try {
            const data = await Producto.create(req.body);
            return res.json(data);
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Error al realizar la creación del producto"
            });
        }
    };

    // Retorna todos los productos registrados
    async findAll(req, res) {
        const nombre = req.query.nombre;
        var condicion = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

        try {
            const data = await Producto.find(condicion);
            return res.json(data);
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Error al realizar la búsqueda"
            });
        }
    };

    // Retorna un producto
    async findOne(req, res) {
        const id = req.params.id;

        try {
            const data = await Producto.findById(id);

            if (!data)
                res.status(404).send({ message: "Producto no encontrado " + id });
            else res.send(data);

        } catch (err) {
            res
                .status(500)
                .send({ message: "Error al buscar el producto con id=" + id });
        };
    };

    // Actualiza un producto a partir de su id
    async update(req, res) {
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        try {
            const data = await Producto.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

            if (!data) {
                res.status(404).send({
                    message: `No es posible actualizar el producto con id =${id}.`
                });
            } else res.send({ message: "Producto actualizado correctamente." });
        }
        catch (err) {
            res.status(500).send({
                message: "Error actualizando el producto con id=" + id
            });
        }
    };

    // Delete a Tutorial with the specified id in the request
    async delete(req, res) {
        const id = req.params.id;

        try {
            const data = await Producto.findByIdAndRemove(id)

            if (!data) {
                res.status(404).send({
                    message: `No fue posible borrar el producto con el id=${id}.`
                });
            } else {
                res.send({
                    message: "El producto fue borrado correctamente!"
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Error, no fue posible borrar el producto con el id=" + id
            });
        }
    };
}

module.exports = new ProductosController();