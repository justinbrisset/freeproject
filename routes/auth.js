const express = require('express');
const router  = express.Router();
// const User = require('../models/users');

const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;



router.get('/signup', (req, res, next) => {
  res.render('authentication');
});

router.post('/signup', (req, res, next) => {
  let {username, password} = req.body
  
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  let user = new User({username, password: hashPass})
  user.save()
  .then(usr => {
    res.redirect('/');
  })
  .catch(err => {
    next(err)
  })
});


router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.post("/signin", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("signin", {
      errorMessage: "Please enter both, username and password to sign in."
    });
    return;
  }

  User.findOne({ "username": theUsername })
  .then(user => {
      if (!user) {
        res.render("signin", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("signin", {
          errorMessage: "Incorrect password"
        });
      }
  })
  .catch(error => {
    next(error);
  })
});


let isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/signin");
  }
}

router.get('/workspaces', isAuthenticated, (req, res, next) => {
  res.render('workspaces');
});

router.get('/pompom', (req, res, next) => {
  res.render('index');
});

module.exports = router;
