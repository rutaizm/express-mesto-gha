const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле {PATH} не может быть пустым.'],
    minlength: [2, 'Поле {PATH} должно содержать минимум 2 символа.'],
    maxlength: [30, 'Поле {PATH} должно содержать максимум 30 символов.'],
  },
  about: {
    type: String,
    required: [true, 'Поле {PATH} не может быть пустым.'],
    minlength: [2, 'Поле {PATH} должно содержать минимум 2 символа.'],
    maxlength: [30, 'Поле {PATH} должно содержать максимум 30 символов.'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле {PATH} не может быть пустым.'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
