const express = require('express');
const app = express();

const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/donor-landing-screen', function(req, res){
  res.render('donor-landing-screen')

});
app.get('/collector-landing-screen', function(req, res){
  res.render('collector-landing-screen')

});
app.get('/depot-landing-screen', function(req, res){
  res.render('depot-landing-screen')

});
app.get('/home-page-tj', function(req, res){
  res.render('home-page-tj')

});
app.get('/home-page-khuzwayo', function(req, res){
  res.render('home-page-khuzwayo')

});
app.get('/select-waste-bin', function(req, res){
  res.render('select-waste-bin')

});
app.get('/to-be-collected', function(req,res){
  res.render('to-be-collected')
});

const PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});

