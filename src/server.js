const express = require('express');
const routes = require('./routes');

require('dotenv').config()
require('./database');

global.auth_user_id = null;

const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(3000);
