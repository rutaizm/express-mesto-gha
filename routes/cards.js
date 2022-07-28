const routesCard = require('express').Router();

const { getCard, createCard, deleteCard, setCardLike, removeCardLike } = require('../controllers/cards');

routesCard.get('/', getCard);
routesCard.post('/', createCard);
routesCard.delete('/:cardId', deleteCard);
routesCard.put('/:cardId/likes', setCardLike);
routesCard.delete('/:cardId/likes', removeCardLike);

module.exports = routesCard;
