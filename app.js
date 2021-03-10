const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const moviesRouter = require('./routes/movies.js');
const usersRouter = require('./routes/users.js');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', moviesRouter);
app.use('/', usersRouter);

// Сообщение о запуске сервера
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
