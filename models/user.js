const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Необходимо указать почту.'],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Неверно указана почта.',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо указать пароль.'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Поле {PATH} должно содержать минимум 2 символа.'],
    maxlength: [30, 'Поле {PATH} должно содержать максимум 30 символов.'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле {PATH} должно содержать минимум 2 символа.'],
    maxlength: [30, 'Поле {PATH} должно содержать максимум 30 символов.'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/g.test(v);
      },
      message: 'Неверный URL.',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
