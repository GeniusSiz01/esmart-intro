const express = require('express');
const app = express();
const { urlencoded, json } = require('body-parser');
require('dotenv').config();
const pg = require('pg');
const session = require('express-session');
const flash = require('express-flash');
const exphbs = require('express-handlebars');
const UserAccountRoutes = require('./services/esmartRoutes/UserAccounts');
const AdminRotes = require('./services/esmartRoutes/AdminRoutes/Admin');
const WasteBinsModel = require('./services/models/WasteBins.Mode');
const WasteDonorModel = require('./services/models/WasteDonor.Model');
const WasteCollector = require('./services/models/WasteCollector.Model');
const CollectorAcountRoutes = require('./services/esmartRoutes/collectorAccount');
const CreateWasteDonorAccount = require('./services/accounts/CreateWasteDonorAccount');
const CreateWasteCollectorAccount = require('./services/accounts/CreateWasteCollectorAccount');
const cors = require('cors');

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

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(cors());

// { rejectUnauthorized: false }

// let binService;




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
let donorAccount = CreateWasteDonorAccount(wasteDonormodel);
let collectorAccount = CreateWasteCollectorAccount(wasteCollector);
let userRoute = UserAccountRoutes(wasteBinsModel, wasteDonormodel, donorAccount);
let adminRoute = AdminRotes(wasteBinsModel);
let collectorRoutes = CollectorAcountRoutes(wasteCollector, collectorAccount, wasteDonormodel, wasteBinsModel);


app.get('/account/donor/:id?', userRoute.getWasteDonorAccount);
app.get('/home/:user?', userRoute.wasteDonorBins);
app.get('/show/bins', adminRoute.getBins);
app.get('/donor-landing-screen', userRoute.displayDonorLandingPage);
app.get('/collector-landing-screen', collectorRoutes.displayCollectorLandingPage);
app.get('/account/collector/:id?', collectorRoutes.getWasteCollectorAccount);
app.post('/simulate/bins/:id?', userRoute.simulateBins);
app.post('/reset/bins/:id?', userRoute.resetBins);

app.get('/waste/donor/register', userRoute.register);
app.get('/waste/donor/signin', userRoute.signin);
app.get('/waste/collector/register', collectorRoutes.register);
app.get('/waste/collector/signin', collectorRoutes.signin);
app.post('/create/donor/account', userRoute.handleCreateAccount);
app.post('/waste/donor/signin', userRoute.handleSigninRequest);
app.post('/add/bins', userRoute.handleAddBins);
app.post('/create/collector/account', collectorRoutes.handleCreateAccount);
app.post('/collector/signin', collectorRoutes.handleSigninRequest);
app.post('/collect/bin', collectorRoutes.collectBin);
// app.get('/select/bin', collectorRoutes.selectBins)
app.get('/collect/bins/:donorId?/:collectorId?', collectorRoutes.selectBins);
app.post('/collecting/bins', collectorRoutes.collecting);
app.get('/bins/history/:id', collectorRoutes.renderHistory);
app.post('/bins/history/details', collectorRoutes.handleDeatilsRequest);
app.get('/bins/history/view/:donorId?/:collectorId?', collectorRoutes.renderDetails);
app.post('/donor/history/:id?', userRoute.handleHistoryRequest);
app.get('/donor/show/details/:id?', userRoute.renderHistoryDetails);
app.post('/simulate/bins', userRoute.simulateBins);

app.post('/donor/signup', userRoute.handleCreateAccount);
app.post('/donor/signin', userRoute.handleSigninRequest);
app.post('/verify', userRoute.verifyToken);
app.post('/donor/request', userRoute.handlePickUpBins);
app.post('/bins/full/', collectorRoutes.readyToCollectBins);

app.get('/donor/get/:userId', userRoute.showBinsReadyForCollection);
app.post('/donor/cancel/request', userRoute.cancelPickUpRequest);
app.post('/verify/collector', collectorRoutes.verifyToken);

// app.get('/collector/:id?/bins', collectorRoutes.readyToCollectBins);
// app.post('/account/collector/:id');

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});