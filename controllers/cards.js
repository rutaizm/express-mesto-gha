const Card = require('../models/card');

const getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

const createCard = (res, req) => {
  const { name, link } = req.body;
  const { owner } = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

const setCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

const removeCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

module.exports = { getCard, createCard, deleteCard, setCardLike, removeCardLike };
