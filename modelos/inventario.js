const mongosee = require('mongoose');

const inventarioSchema = new mongosee.Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }

});

const Inventario = mongosee.model('inventarios', inventarioSchema);

module.exports = Inventario;