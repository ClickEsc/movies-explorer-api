const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signinInfoValidator } = require('../middlewares/validators/signin');
const { signupInfoValidator } = require('../middlewares/validators/signup');
const { login, createUser } = require('../controllers/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const errorRouter = require('./error');

router.post('/signin', signinInfoValidator, login);
router.post('/signup', signupInfoValidator, createUser);

router.use(auth);

router.use('/', moviesRouter);
router.use('/', usersRouter);
router.use('/', errorRouter);

module.exports = router;
