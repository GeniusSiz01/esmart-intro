const express = require("express");
const app = express();
require("colors");
const cors = require("cors");
const pg = require("pg");
const { urlencoded, json } = require('body-parser');
const DonorRoutes = require("./services/routes/DonorRoutes");
const DonorApi = require("./services/api/DonorApi");
const Donor = require("./services/models/Donor");
const Collector = require("./services/models/Collector");
const CollectorRoutes = require("./services/routes/CollectorRoutes");
const CollectorApi = require("./services/api/CollectorApi");
const Bins = require("./services/models/Bins");

const { Pool } = pg;
let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
};

const connectionString = process.env.DATABASE_URL || "postgresql://pgadmin:pg123@localhost:5432/e_smart";
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});



app.use(express());

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(urlencoded({ extended: false }))
app.use(json());
app.use(express.static('eSmart-front-end/build'));
app.listen(PORT, () => `Server is running on the port no: ${(PORT)}`);


const binModel = Bins(pool);
const donorModel = Donor(pool);
const collectorModel = Collector(pool);
const donorApi = DonorApi(donorModel, binModel);
const collectorApi = CollectorApi(collectorModel, donorModel, binModel);
DonorRoutes(app, donorApi);
CollectorRoutes(app, collectorApi);