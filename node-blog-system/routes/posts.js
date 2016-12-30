var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/images/' });
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblogsystem');

router.route('/show/:id')
  .get((req, res, next) => {
    var posts = db.get('posts');

    posts.findById(req.params.id, (err, post) => {
      res.render('show', { post });
    });
  });

router.route('/add')
  .get((req, res, next) => {
    var categories = db.get('categories');
    categories.find({}, {}, (err, categories) => {
      res.render('addpost', {
        title: 'Add Post',
        categories
      })
    });
  })
  .post(upload.single('mainimage'), (req, res, next) => {
    // get form values
    var title = req.body.title,
        category = req.body.category,
        body = req.body.body,
        author = req.body.author,
        date = new Date();

    // check for uploaded image
    if (req.file) {
      var mainimage = req.file.filename;
    } else {
      var mainimage = '';
    }

    // form validation
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('body', 'Body field is required').notEmpty();

    // check errors
    var errors = req.validationErrors();

    if (errors) {
      res.render('addpost', { errors });
    } else {
      var posts = db.get('posts');

      posts.insert({
        title,
        body,
        category,
        author,
        date,
        mainimage
      }, (err, post) => {
        if (err) {
          res.send(err)
        } else {
          req.flash('success', 'Post added');
          res.location('/');
          res.redirect('/');
        }
      });
    }
  });

router.post('/addcomment', (req, res, next) => {
  // get form values
  var name = req.body.name;
  var email = req.body.email;
  var body = req.body.body;
  var postid = req.body.postid;
  var commentdate = new Date();

  // form validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('body', 'Body field is required').notEmpty();

  // check errors
  var errors = req.validationErrors();

  if (errors) {
    var posts = db.get('posts');
    posts.findById(postid, (err, post) => {
      res.render('show', {
        errors,
        post
      });
    });
  } else {
    var comment = {
      name,
      email,
      body,
      commentdate
    }

    var posts = db.get('posts');
    posts.update({ "_id": postid }, {
      $push: {
        "comments": comment
      }
    }, (err, doc) => {
      if (err) throw err;
      req.flash('success', 'Comment added');
      res.location(`/posts/show/${postid}`);
      res.redirect(`/posts/show/${postid}`);
    })
  }
})

module.exports = router;
