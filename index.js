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

const PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});

