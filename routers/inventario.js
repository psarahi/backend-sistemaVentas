const express = require('express');
const Inventario = require('../modelos/inventario');
const router = express.Router();


// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const productos = await Inventario.find()

        res.send(productos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {
        const producto = new Inventario({
            nombre: req.body.nombre,
            cantidad: req.body.cantidad,
        });
        const saveRegistro = await producto.save();
        const resultSave = await Inventario.findById(saveRegistro.id)

        res.status(201).send(resultSave);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se pudo registrar el documento');

    }
});

module.exports = router;