const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/form', (req, res, next) => {
  res.render('forms/form');
});

module.exports = router;
