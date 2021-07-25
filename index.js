const express = require('express');
const app = express();
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

async function run() {
  const db = await open({
    filename: 'esmart.db',
    driver: sqlite3.Database
  })

  db.on('trace', function (data) {
    console.log(data)

  });

  await db.migrate();
  // const get_depot_center = 'select * from depot_center';
  // const depot_center = await db.all(get_depot_center);
  // console.log('depot_center');
  // console.log(depot_center);
  // db.close();
}

run();


const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/donor-landing-screen', function (req, res) {
  res.render('donor-landing-screen')

});
app.get('/collector-landing-screen', function (req, res) {
  res.render('collector-landing-screen')

});
app.get('/depot-landing-screen', function (req, res) {
  res.render('depot-landing-screen')

});
app.get('/home-page-tj', function (req, res) {
  
  const binList = [
    {bin_type:"general waste", percentage:85}, 
    {bin_type:"plastic waste", percentage:50},
    {bin_type:"glass waste", percentage:90},
    {bin_type:"metal tins waste", percentage:25}
  ]
  
  res.render('home-page-tj', {
    bins : binList
  });
});



app.get('/home-page-khuzwayo', function (req, res) {
  res.render('home-page-khuzwayo')

});
app.get('/select-waste-bin', function (req, res) {
  res.render('select-waste-bin')
});
app.get('/thank-you-screen', function (req, res) {
  res.render('thank-you-screen')
});
app.get('/to-be-collected', function (req, res) {
  res.render('to-be-collected')
});

app.get('/home-page-david', function (req, res) {
  res.render('home-page-david')

});
const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});

