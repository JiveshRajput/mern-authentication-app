const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/route');
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use('/api', router);
app.get('/', (req, res) => {
    res.send('MERN Authentication App API')
});

app.use((err, req, res, next) => {
    res.status(404).send(err);
})

module.exports = app;