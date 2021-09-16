import { equal } from 'assert';
const CollectorAccount = require('../services/accounts/CreateWasteCollectorAccount');
const pg = require('pg');
const Model = require('../services/models/WasteCollector.Model');
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
        await pool.query('DELETE FROM waste_collector');
    });

    it('Should return that "James" was added as a new waste collector account', async () => {
        let model = Model(pool);
        let collector = CollectorAccount(model);


        const james = {
            firstName: "James",
            lastName: "Hope",
            location: "Midrand",
            cellNumber: "0812828250",
            email: "sbudiction@gmail.com",
            idNumber: 9208245617088,
            gender: "Male",
            age: 30,
            password: "Fwgr123",
            verification: false,
            vehicleRegNo: "CA 123 456"
        }
        await collector.create(james);
        let res = await model.findAccount(james.firstName);
        equal(res[0].first_name, "James");
    });

    after(() => {
        pool.end();
    });

});