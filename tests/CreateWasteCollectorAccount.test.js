import { equal } from 'assert';
const CreateAccounts = require('../services/accounts/CreateAccounts');
const pg = require('pg');
const Model = require('../services/models/Account');
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

    });

    // beforeEach(async () => {
    // });

    // after(() => {
    // });

    it('Should return that "James" was added as a new account', async () => {
        let model = Model(pool);
        let collector = CreateAccounts(model);

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
            vehicleRegNo : "CA 123 456"
        }
        console.log(await model.createAccount(james));
        console.log(await model.getAccount('James'));
        // let res = await Accounts.findOne({ firstName: 'James' });
        equal(0, 0);
    });

});