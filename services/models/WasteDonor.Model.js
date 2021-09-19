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
        let check = await pool.query('select * from waste_donor where id_number = $1', [account.idNumber]);
        if (check.rows.length === 0) {
            let res = await pool.query('INSERT INTO waste_donor (firstname, lastname, cell_number, email, residential_address, age, gender, id_number, user_password, verification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', user);
            return { response: 'Account was created' }
        } else {
            return { response: 'Account already exist' };

        }
    }

    const findAccount = async (firstName) => {
        let res = await pool.query(`SELECT * FROM waste_donor WHERE firstname = $1`, [firstName]);
        return res.rows[0];
    }

    const findAccountById = async (id) => {
        let res = await pool.query('select * from waste_donor where id = $1', [id]);
        return res.rows[0];
    }

    const findAccountByEmail = async (email) => {
        let res = await pool.query('select * from waste_donor where email = $1', [email]);
        if (res.rows.length !== 0) {
            return res.rows[0];
        } else {
            return { response: 'Account doesnt exist' }
        }
    }

    const getAccounts = async () => {
        let res = await pool.query('select * from waste_donor');
        return res.rows;
    }

    return {
        createAccount,
        findAccount,
        findAccountById,
        getAccounts,
        findAccountByEmail
    }
}