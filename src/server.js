const express = require('express');
const routes = require('./routes');

require('dotenv').config()
require('./database');

global.auth_user_id = null;

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');

const app = express();

app.use(express.json());
app.use('/api', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000);
