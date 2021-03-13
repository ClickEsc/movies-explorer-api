require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const {
  PORT, MONGO_URL, MONGO_CONFIG, LIMITER,
} = require('./utils/configs');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// CORS
app.use(cors());

app.use(helmet());

app.use(LIMITER);

mongoose.connect(MONGO_URL, MONGO_CONFIG);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логгирование запросов
app.use(requestLogger);

// Краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Роутинг
app.use(router);

// Логгирование ошибок
app.use(errorLogger);

// Обработчики ошибок
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

// Сообщение о запуске сервера
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
