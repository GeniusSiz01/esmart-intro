module.exports = (pool) => {

    const createAccount = async (account) => {
        let user = [
            account.firstName,
            account.lastName,
            account.cellNumber,
            account.email,
            account.residentialAddress,
            account.age,
            account.gender,
            account.idNumber,
            account.password,
            account.verification
        ]
        let res = await pool.query('INSERT INTO waste_donor (firstname, lastname, cell_number, email, residential_address, age, gender, id_number, user_password, verification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', user);
        // if (res.rows) {
        //     // console.log(res.rows[0].id);
        //     let res = await pool.query('SELECT id FROM waste_type');
        //     console.log(res.rows);
        //     await pool.query('INSERT INTO waste_bin (waste_donor_id, waste_type_id) VALUES ($1, $2)', []);
        // }
        return res;
    }

    const findAccount = async (firstName) => {
        let res = await pool.query(`SELECT * FROM waste_donor WHERE firstname = $1`, [firstName]);
        return res.rows[0];
    }

    const findAccountById = async (id) => {
        let res = await pool.query('select * from waste_donor where id = $1', [id]);
        return res.rows[0];
    }

    const getAccounts = async () => {
        let res = await pool.query('select * from waste_donor');
        return res.rows;
     }

    return {
        createAccount,
        findAccount,
        findAccountById,
        getAccounts
    }
}