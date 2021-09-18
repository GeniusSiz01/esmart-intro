const express = require('express');
const app = express();
const { urlencoded, json } = require('body-parser');
const { Database } = require('sqlite3');
const { open } = require('sqlite');
const BinService = require('./collector');
require('dotenv').config();
const pg = require('pg');
const UserAccountRoutes = require('./services/esmartRoutes/UserAccounts');
const AdminRotes = require('./services/esmartRoutes/AdminRoutes/Admin');
const WasteBinsModel = require('./services/models/WasteBins.Mode');
const WasteDonorModel = require('./services/models/WasteDonor.Model');
const WasteCollector = require('./services/models/WasteCollector.Model');
const CollectorAcountRoutes = require('./services/esmartRoutes/collectorAccount');

// postgres database setup
const { Pool } = pg;
let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || "postgresql://pgadmin:pg123@localhost:5432/e_smart";
const pool = new Pool({
  connectionString,
  ssl: useSSL
});

// { rejectUnauthorized: false }

// let binService;


const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))
// parse application/json
app.use(json());




app.get('/', function (req, res) {
  res.render('home');
});

// app.get('/donor-landing-screen', function (req, res) {
//   res.render('donor-landing-screen')

// });
// app.get('/collector-landing-screen', function (req, res) {
//   res.render('collector-landing-screen');

// });
app.get('/depot-landing-screen', function (req, res) {
  res.render('depot-landing-screen');

});
app.get('/bin-admin', function (req, res) {
  res.render('bin-admin');

});
app.post('/bin-admin/fill-bin', async function (req, res) {
  res.redirect('/bin-admin');

});
app.post('/bin-admin/pole-bin', async function (req, res) {
  res.redirect('/bin-admin');

});
app.post('/bin-admin/reset', async function (req, res) {
  res.redirect('/bin-admin');

});
app.get('/home-page-tj', async function (req, res) {
  // console.log(binList);
  res.render('home-page-tj');
});

app.get('/collector-home-page', async function (req, res) {
  const collectors = await binService.collectors();
  res.render('collector-home-page', { collectors });
});

app.get('/home-page-khuzwayo', async function (req, res) {
  // const readyBins = await binService.collectReadyBins();
  // // console.log(readyBins)
  // const collectorId = req.query.collectorId
  // res.render('home-page-khuzwayo', {
  //   readyBins, collectorId
  // });

});


app.get('/thank-you-screen', async function (req, res) {
  res.json({
    binTypes: await wasteBinsModel.getAllBinTypes()
  })
  // res.render('thank-you-screen')
});

app.post('/allocate-bin', async function (req, res) {
  console.log(req.body)
  await binService.binAllocation(req.body.binId, req.body.collectorId);
  res.render('allocate-bin');
});

app.get('/select-waste-bin', function (req, res) {
  res.render('select-waste-bin')
});

app.get('/to-be-collected', function (req, res) {
  res.render('to-be-collected')
});

app.get('/home-page-david', async function (req, res) {

  // const get_waste_donor = 'select * from waste_bin_collection_activity';
  const get_waste_donor = 'select * from waste_bin_collection_activity join waste_bin on waste_bin_collection_activity.waste_bin_id=waste_bin.id join waste_donor on waste_bin_collection_activity.waste_donor_id=waste_donor.name';
  const donor_waste = await db.all(get_waste_donor);
  // console.log(donor_waste);
  res.render('home-page-david', {
    donor_waste

  });

});

let wasteCollector = WasteCollector(pool)
let wasteDonormodel = WasteDonorModel(pool);
let wasteBinsModel = WasteBinsModel(pool);
let userRoute = UserAccountRoutes(wasteBinsModel, wasteDonormodel);
let adminRoute = AdminRotes(wasteBinsModel);
let collectorRoutes = CollectorAcountRoutes(wasteCollector);


app.get('/account/donor/:id?', userRoute.getWasteDonorAccount);
app.get('/home/:user?', userRoute.wasteDonorBins);
app.get('/show/bins', adminRoute.getBins);
app.get('/donor-landing-screen', userRoute.displayDonorLandingPage);
app.get('/collector-landing-screen', collectorRoutes.displayCollectorLandingPage);
app.get('/account/collector/:id?', collectorRoutes.getWasteCollectorAccount);
app.post('/simulate/bins/:id?', userRoute.simulateBins);
app.post('/reset/bins/:id?', userRoute.resetBins);
app.get('/bins/full', collectorRoutes.readyToCollectBins);
// app.get('/collector/:id?/bins', collectorRoutes.readyToCollectBins);
// app.post('/account/collector/:id');

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});

