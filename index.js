const express = require('express');
const app = express();
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const BinService = require('./collector');

// let binService;

let db;
let binService;

async function run() {
    db = await open({
    filename: 'esmart.db',
    driver: sqlite3.Database
  })

  db.on('trace', function (data) {
    console.log(data)

  });
  db.exec('PRAGMA foreign_keys = ON;');
  await db.migrate();
}

run().then(function () {

    binService = BinService(db);

    // simulate a bin update every 15 seconds
    // setInterval(function () {
    //     binService.fillBins();
    // }, 15000);
})

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
app.get('/home-page-tj',async function (req, res) {
  const binList = await binService.getBins();
  console.log(binList);
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

app.get('/home-page-david', async function (req, res) {
  
  // const get_waste_donor = 'select * from waste_bin_collection_activity';
  const get_waste_donor = 'select * from waste_bin_collection_activity join waste_bin on waste_bin_collection_activity.waste_bin_id=waste_bin.id join waste_donor on waste_bin_collection_activity.waste_donor_id=waste_donor.name'; 
  const donor_waste = await db.all(get_waste_donor);
        console.log(donor_waste);
  res.render('home-page-david', {
      donor_waste
    
  });

});
const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});

