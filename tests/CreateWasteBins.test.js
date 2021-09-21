const { equal } = require('assert');
const DonorAccount = require('../services/accounts/CreateWasteDonorAccount');
const pg = require('pg');
const WasteBinsModel = require('../services/models/WasteBins.Mode');
const WasteDonorModel = require('../services/models/WasteDonor.Model');
const WasteBinsMode = require('../services/models/WasteBins.Mode');
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || "postgresql://pgadmin:pg123@localhost:5432/e_smart_test";
const pool = new Pool({ connectionString });

describe("Testing the link to add bins functionality", () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM waste_donor');
        await pool.query('DELETE FROM waste_bin');
    });

    it('Should return that "Sibusiso" has added bins to account', async () => {
        let wasteBinsMode = WasteBinsMode(pool);
        let wasteDonorModel = WasteDonorModel(pool);
        let donor = DonorAccount(wasteDonorModel);

        const sibusiso = {
            firstName: "Sibusiso",
            lastName: "Nkosi",
            residentialAddress: "Midrand",
            cellNumber: "0668034948",
            email: "sibusisonkosi0897@gmail.com",
            idNumber: 6208245617088,
            gender: "Male",
            age: 35,
            password: "Fwgr123",
            verification: false,
            vehicleRegNo: "CY 123 456"
        }
        await donor.create(sibusiso);
        let donorId = await wasteDonorModel.findAccount(sibusiso.firstName);
        let binType = await wasteBinsMode.getAllBinTypes();
        console.log(binType);
        // console.log(donorId.id);
        // let res = await wasteBinsMode.createBins(donorId.id, binType);
        // equal(res.response, "Waste bins are now working");
    });

    after(() => {
        pool.end();
    });

});