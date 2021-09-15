const assert = require('assert');
const pg = require('pg');
const { Pool } = pg;

const connectionString = process.env.DATABSE_URL;
const pool = new Pool({ connectionString });

describe("Testing the create account functionality", () => {
    beforeEach(async () => {
        await pool.query('DELETE * FROM ');
    });

    it('Should return that "James" was added as a new account', async () => {

    });

});