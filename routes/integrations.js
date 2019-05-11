const express = require('express');
const router  = express.Router();

/* GET integrations page. */
router.get('/integrations', (req, res, next) => {
  res.render('integrations');
});

module.exports = router;