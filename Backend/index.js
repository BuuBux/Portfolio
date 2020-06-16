const express = require('express');
const routes = require('./routing/route');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }));

app.use('/api', routes);

module.exports = app;
