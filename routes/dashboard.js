const express = require('express');
const router  = express.Router();

/* GET dashboard page. */
router.get('/', (req, res, next) => {
  console.log('dashboard error')
  res.render('dashboard');
});

module.exports = router;