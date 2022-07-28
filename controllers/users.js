const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports = { getUsers, getUser, createUser, updateUser, updateUserAvatar };