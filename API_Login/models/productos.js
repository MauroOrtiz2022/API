const mongoose = require("mongoose");

const ImagenesSchema = new mongoose.Schema(
    {
        url: String
    }, 
    { 
        nombre: String 
    }
);

const ProductoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        precio: {
            type: Number
        },
        descripcion: {
            type: String
        },
        dimensiones: {
            type: Map,
            of: String
        },
        proveedor: {
            type: String
        },
        imagenes: [ImagenesSchema],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Producto", ProductoSchema);