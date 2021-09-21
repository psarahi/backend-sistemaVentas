const moment = require('moment');
moment.locale('es');
const mongosee = require('mongoose');

const pedidoSchema = new mongosee.Schema({
    clientes: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'clientes'
    },
    usuarios: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    productos: {
        type: Array,
        required: true
    },
    fechaCreacion: {
        type: String,
        required: true
    },
    fechaAprobacion: {
        type: String,
    },
    aprobadoPor: {
        type: String,
    },
    estado: {
        type: String,
        required: true
    }

});

const Pedido = mongosee.model('pedidos', pedidoSchema);

module.exports = Pedido;