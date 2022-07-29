const routesUsers = require('express').Router();

const {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

routesUsers.get('/', getUsers);
routesUsers.get('/:userId', getUser);
routesUsers.post('/', createUser);
routesUsers.patch('/me', updateUser);
routesUsers.patch('/me/avatar', updateUserAvatar);

module.exports = routesUsers;
