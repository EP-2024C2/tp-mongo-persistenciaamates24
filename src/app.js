require('dotenv').config();

const express = require('express');
const connectToDatabase = require('./db');
const productosRouter = require('./routes/productos');
const fabricantesRouter = require('./routes/fabricantes');
const componentesRouter = require('./routes/componentes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

// Rutas de la API
app.use('/productos', productosRouter);
app.use('/fabricantes', fabricantesRouter);
app.use('/componentes', componentesRouter);

// Middlewares de error
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
});
