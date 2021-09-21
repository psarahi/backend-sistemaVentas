const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/usuario');


router.post('/', async(req, res) => {
    try {
        let usuarios = await Usuario.findOne({
            $and: [{
                    user: req.body.user
                },
                {
                    pass: req.body.pass
                },
            ]
        });

        res.send([usuarios._id, usuarios.tipo]);

    } catch (error) {
        console.log(error);
        res.status(501).send('El servidor no puede hacer la conexción');

    }

});

module.exports = router;