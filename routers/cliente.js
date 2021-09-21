const express = require('express');
const Cliente = require('../modelos/cliente');
const router = express.Router();


// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const clientes = await Cliente.find()

        res.send(clientes);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

module.exports = router;