const express = require('express');
const router  = express.Router();

/* GET dashboard page. */
let isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/signin");
  }
}

router.get('/dashboard', isAuthenticated, (req, res, next) => {
  res.render('dashboard');
});

module.exports = router;