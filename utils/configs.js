require('dotenv').config();
const rateLimit = require('express-rate-limit');

const {
  PORT = 3001,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
  NODE_ENV,
} = process.env;

const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

const MONGO_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const LIMITER = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  PORT, MONGO_URL, NODE_ENV, JWT_SECRET, MONGO_CONFIG, LIMITER,
};
