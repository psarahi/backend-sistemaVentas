const mongosee = require('mongoose');

const clienteSchema = new mongosee.Schema({
    nombre: {
        type: String,
        required: true
    }

});

const Cliente = mongosee.model('clientes', clienteSchema);

module.exports = Cliente;