const express = require('express');

const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/login', UserController.login);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.post('/logout', UserController.logout);

routes.get('/users', UserController.index);

routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.store);

module.exports = routes;
