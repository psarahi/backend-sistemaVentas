const express = require('express');
const Usuario = require('../modelos/usuario');
const router = express.Router();


// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const usuarios = await Usuario.find()

        res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

module.exports = router;