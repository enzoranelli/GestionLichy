const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();


const usuario = require('./routes/usuario.js');
const items = require('./routes/items.js'); 
const contendor = require('./routes/contenedor.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));




app.use('/api/usuarios',usuario);
app.use('/api/items',items);
app.use('/api/contenedores',contendor); 
module.exports = {
    app
};