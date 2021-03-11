require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');

const { PORT = 3001 } = process.env;

const app = express();

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', moviesRouter);
app.use('/', usersRouter);

// Логгирование ошибок
app.use(errorLogger);

// Сообщение о запуске сервера
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
