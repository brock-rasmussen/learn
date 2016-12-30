const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { simpleExpressServer } = require('../secrets.js');

const PORT = 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/')
  .get((req, res) => {
    res.render('index');
  });

app.route('/about')
  .get((req, res) => {
    res.render('about');
  });

app.route('/contact')
  .get((req, res) => {
    res.render('contact');
  })
  .post((req, res) => {
    var transporter = nodemailer.createTransport({
      service: simpleExpressServer.service,
      auth: {
        user: simpleExpressServer.auth.user,
        pass: simpleExpressServer.auth.pass
      }
    });

    var mailOptions = {
      from: simpleExpressServer.from,
      to: simpleExpressServer.to,
      subject: 'Website Submission',
      text: `You have a submission with the following details... Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
      html: `<p>You have a submission with the following details...</p><ul><li>Name: ${req.body.name}</li><li>Email: ${req.body.email}</li><li>Message: ${req.body.message}</li></ul>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
      console.log(err ? err : `Message sent: ${info.response}`);
      res.redirect('/');
    })
  });

app.listen(PORT)
