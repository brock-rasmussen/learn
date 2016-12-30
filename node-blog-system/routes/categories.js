var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblogsystem');

router.route('/add')
  .get((req, res, next) => {
    res.render('addcategory', { title: 'Add Category' });
  })
  .post((req, res, next) => {
    // get form values
    var name = req.body.name;

    // form validation
    req.checkBody('name', 'name field is required').notEmpty();

    // check errors
    var errors = req.validationErrors();

    if (errors) {
      res.render('addcategory', { errors });
    } else {
      var categories = db.get('categories');

      categories.insert({ name }, (err, post) => {
        if (err) {
          res.send(err)
        } else {
          req.flash('success', 'Category added');
          res.location('/');
          res.redirect('/');
        }
      });
    }
  });

router.route('/show/:category')
  .get((req, res, next) => {
    var posts = db.get('posts');
    posts.find({ category: req.params.category }, {}, (err, posts) => {
      res.render('index', {
        title: req.params.category,
        posts
      });
    });
  });

module.exports = router;
