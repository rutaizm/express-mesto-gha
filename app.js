const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const routesUsers = require('./routes/users');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use('/users', routesUsers);

app.use((req, res, next) => {
  req.user = {
    _id: '62e147a07c1ee6235d405b9a',
  };

  next();
});

app.listen(PORT);