const mongosee = require('mongoose');

const usuarioSchema = new mongosee.Schema({
    nombre: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }

});

const Usuario = mongosee.model('usuarios', usuarioSchema);

module.exports = Usuario;