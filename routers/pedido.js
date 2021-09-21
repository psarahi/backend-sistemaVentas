const express = require('express');
const Pedido = require('../modelos/pedido');
const router = express.Router();
const moment = require('moment');
moment.locale('es');

// Funcion get todos
// router.get('/producto', async(req, res) => {
//     try {
//         const productos = await ProductoPedido.find()
//             .populate({
//                 path: 'pedidos',
//                 select: 'fechaCreacion',
//                 populate: [{
//                         path: 'clientes',
//                         select: 'nombre',
//                         model: 'clientes'
//                     },
//                     {
//                         path: 'usuarios',
//                         select: 'nombre',
//                         model: 'usuarios'
//                     }
//                 ]
//             })
//             .populate('inventarios', 'nombre cantidad')



//         res.send(productos);
//     } catch (error) {
//         console.log(error);
//         res.status(404).send('No se encontro ningun documento');

//     }
// });

// router.post('/productoPedido', async(req, res) => {
//     try {
//         const producto = new ProductoPedido({
//             pedidos: req.body.pedidos,
//             inventarios: req.body.inventarios,
//             cantidad: req.body.cantidad,
//         });
//         const saveRegistro = await producto.save();
//         const resultSave = await ProductoPedido.findById(saveRegistro.id)

//         res.status(201).send(resultSave);
//     } catch (error) {
//         console.log(error);
//         res.status(404).send('No se pudo registrar el documento');

//     }
// });

////////////////////////////////////////////

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('clientes', 'nombre')
            .populate('usuarios', 'nombre')

        res.send(pedidos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get todos
router.get('/pedidosRegistrados', async(req, res) => {
    try {
        const pedidos = await Pedido.find({
                estado: 'Registrado'
            })
            .populate('clientes', 'nombre')
            .populate('usuarios', 'nombre')

        res.send(pedidos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

router.get('/pedidosRegistrados/:numPedido?/:cliente?/:fechaCreacion?', async(req, res) => {
    try {

        console.log(req.params.fechaCreacion);
        const pedidos = await Pedido.find({
                estado: 'Registrado'
            })
            .populate('clientes', 'nombre')
            .populate('usuarios', 'nombre')

        let pedidoFiltrado = pedidos.filter(x => x._id == (req.params.numPedido) || x.clientes._id == (req.params.cliente) || moment(x.fechaCreacion).format('YYYY-MM-DD') == moment(req.params.fechaCreacion).format('YYYY-MM-DD'))

        console.log(pedidos);
        res.send(pedidoFiltrado);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

router.get('/pedidosAprobados/:fechaI/:fechaF', async(req, res) => {
    try {

        console.log(req.params.fechaI, req.params.fechaF);
        const pedidos = await Pedido.find({
                $and: [{
                    estado: {
                        $eq: 'Aprobado'
                    }
                }, {
                    fechaAprobacion: {
                        $gt: req.params.fechaI,
                        $lt: req.params.fechaF
                    }
                }]
            })
            .populate('clientes', 'nombre')
            .populate('usuarios', 'nombre')

        const idVendedores = [...new Set(pedidos.map(item => item.usuarios._id))];
        var listaPedidos = [];
        let pedidoFiltrado = [];
        var nombre = '';
        for (let index = 0; index < idVendedores.length; index++) {

            pedidos.filter(y => y.usuarios._id === idVendedores[index]).forEach(t => {
                listaPedidos.push({
                    numpedido: t._id,
                    productos: [...t.productos]
                });
                nombre = t.usuarios.nombre
            });

            pedidoFiltrado.push({
                pedidos: listaPedidos,
                vendedor: nombre
            });
            listaPedidos = [];
        }

        console.log(pedidoFiltrado);

        res.send(pedidoFiltrado);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

router.post('/', async(req, res) => {
    try {
        const pedido = new Pedido({
            clientes: req.body.clientes,
            usuarios: req.body.usuarios,
            productos: req.body.productos,
            fechaCreacion: req.body.fechaCreacion,
            fechaAprobacion: req.body.fechaAprobacion,
            aprobadoPor: req.body.aprobadoPor,
            estado: req.body.estado
        });
        const saveRegistro = await pedido.save();
        const resultSave = await Pedido.findById(saveRegistro.id)

        res.status(201).send(resultSave);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se pudo registrar el documento');

    }
});

// Funcion PUT
router.put('/:_id', async(req, res) => {
    try {
        const pedido = await Pedido.findByIdAndUpdate(req.params._id, {
            clientes: req.body.clientes,
            usuarios: req.body.usuarios,
            productos: req.body.productos,
            fechaCreacion: req.body.fechaCreacion,
            fechaAprobacion: req.body.fechaAprobacion,
            aprobadoPor: req.body.aprobadoPor,
            estado: req.body.estado
        }, {
            new: true
        });
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

module.exports = router;