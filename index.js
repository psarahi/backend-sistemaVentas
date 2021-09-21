const mongoose = require('mongoose');
var cors = require('cors')
const express = require('express');
const http = require('http');
const app = express();

app.use(cors());

let server = http.createServer(app);

const inventario = require('./routers/inventario');
const cliente = require('./routers/cliente');
const usuario = require('./routers/usuarios');
const pedido = require('./routers/pedido');
const auth = require('./routers/login');


// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use('/api/inventario', inventario);
app.use('/api/cliente', cliente);
app.use('/api/usuario', usuario);
app.use('/api/pedido', pedido);
app.use('/api/login', auth);


const port = process.env.PORT || 3003;
server.listen(port, () => console.log('Escuchando Puerto: ' + port));

console.log(process.env.PASS_MONGO);
mongoose.connect(
        `mongodb+srv://lesly:Mejia1608@cluster0.g3yej.mongodb.net/sistemaVentas?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Conectado a MongoDb'))
    .catch(error =>

        console.log(error));