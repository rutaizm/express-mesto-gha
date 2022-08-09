const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { NOT_FOUND } = require('./utils/errors');

const app = express();
const routesUsers = require('./routes/users');
const routesCard = require('./routes/cards');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62e147a07c1ee6235d405b9a',
  };
  next();
});

const { login, createUser } = require('./controllers/users');

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', routesUsers);
app.use('/cards', routesCard);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT);
