var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/register')
  .get((req, res, next) => {
    res.render('register', { title: 'Sign Up' });
  })
  .post(upload.single('profile'), (req, res, next) => {
    var name = req.body.name,
        email = req.body.email,
        password = req.body.password,
        passwordConfirm = req.body.passwordConfirm;

    if (req.file) {
      var profile = req.file.filename;
    } else {
      var profile = 'default.jpg';
    }

    // validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Name is required').notEmpty();
    req.checkBody('passwordConfirm', 'Name is required').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
      res.render('register', { errors: errors });
    } else {
      var newUser = new User({
        name,
        email,
        password,
        profile
      });

      User.createUser(newUser, (err, user) => {
        if (err) throw err;
        console.log(user)
      });

      req.flash('success', 'You are now registered and can log in.');

      res.location('/');
      res.redirect('/');
    }
  });

router.route('/login')
  .get((req, res, next) => {
    res.render('login', { title: 'Log In' });
  })
  .post(passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: 'Invalid username or password.' }), (req, res) => {
    req.flash('success', 'You are now logged in.');
    res.redirect('/');
  });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy((email, password, done) => {
  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Unknown user.' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password.' });
      }
    });
  });
}));

module.exports = router;
