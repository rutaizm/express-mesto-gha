const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }))
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch(() => res.status(NOT_FOUND).send({ message: 'Пользователь не найден' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Неверный запрос' });
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' })
    })
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true }
)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Неверный запрос' });
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' })
    })
}

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Неверный запрос' });
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' })
    })
}

module.exports = { getUsers, getUser, createUser, updateUser, updateUserAvatar };