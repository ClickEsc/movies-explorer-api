const router = require('express').Router();
const { PUBLIC_PATH } = require('../utils/configs');

router.use('/*', (req, res) => {
  if (req.method === 'GET') {
    res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
  }
  res.status(404).json({ message: `Невозможно выполнить действие ${req.method} для адреса ${PUBLIC_PATH}${req.path + req.params[0]}` });
});

module.exports = router;
