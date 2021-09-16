const { equal } = require('assert');
const DonorAccount = require('../services/accounts/CreateWasteDonorAccount');
const pg = require('pg');
const Model = require('../services/models/WasteDonor.Model');
const { Pool } = pg;

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || "postgresql://pgadmin:pg123@localhost:5432/e_smart_test";
const pool = new Pool({ connectionString, ssl: useSSL });

describe("Testing the create account functionality", () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM waste_donor');
    });

    it('Should return that "Sibusiso" was added as a new waste donor account', async () => {
        let model = Model(pool);
        let donor = DonorAccount(model);

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
        let res = await model.findAccount(sibusiso.firstName);
        equal(res.firstname, "Sibusiso");
    });

    after(() => {
        pool.end();
    });

});