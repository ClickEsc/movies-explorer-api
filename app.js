require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { signinInfoValidator } = require('./middlewares/validators/signin');
const { signupInfoValidator } = require('./middlewares/validators/signup');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const errorRouter = require('./routes/error');

const { PORT = 3001 } = process.env;

const app = express();

// CORS
app.use(cors());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

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
app.post('/signin', signinInfoValidator, login);
app.post('/signup', signupInfoValidator, createUser);

app.use(auth);

app.use('/', moviesRouter);
app.use('/', usersRouter);
app.use('/', errorRouter);

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
