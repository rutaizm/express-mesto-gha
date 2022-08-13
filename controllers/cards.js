const Card = require('../models/card');
const BadRequest = require('../utils/BadRequest');
const NotFound = require('../utils/NotFound');

const getCard = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { owner } = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Неверный запрос'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Фотография не найдена'));
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        next(new BadRequest('Вы не можете удалить фотографию, созданную другим пользователем!'));
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Неверный запрос'));
      }
      return next(err);
    });
};

const setCardLike = (req, res, next) => {
  // eslint-disable-next-line function-paren-newline
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFound('Фотография не найдена'));
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Неверный запрос'));
      }
      return next(err);
    });
};

const removeCardLike = (req, res, next) => {
  // eslint-disable-next-line function-paren-newline
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFound('Фотография не найдена'));
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Неверный запрос'));
      }
      return next(err);
    });
};

module.exports = {
  getCard, createCard, deleteCard, setCardLike, removeCardLike,
};
