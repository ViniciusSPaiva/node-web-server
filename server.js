const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, resp, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
      if(err){
        console.log('Unable to append to server.log');
      }
  });

  next();
});

app.use((req, resp, next) => {
  resp.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, resp) => {

  resp.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, resp) => {
  pageTitle: 'About page'
  resp.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, resp) => {
  resp.send({
    errorMessage: 'Unable to fulfill request'
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});