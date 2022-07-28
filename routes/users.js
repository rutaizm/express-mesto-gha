const routesUsers = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/users');

routesUsers.get('/', getUsers);
routesUsers.get('/:id', getUser);
routesUsers.post('/', createUser);

module.exports = routesUsers;