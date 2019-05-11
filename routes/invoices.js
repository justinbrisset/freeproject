const express = require('express');
const router  = express.Router();

/* GET invoices page. */
router.get('/invoices', (req, res, next) => {
  res.render('invoices');
});

module.exports = router;