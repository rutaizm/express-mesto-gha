const routesUsers = require('express').Router();

const {
  getUsers, getUser, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

routesUsers.get('/', getUsers);
routesUsers.get('/:userId', getUser);
routesUsers.patch('/me', updateUser);
routesUsers.patch('/me/avatar', updateUserAvatar);
routesUsers.get('/me', getCurrentUser);

module.exports = routesUsers;
