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
            account.verification]
        let res = await pool.query('INSERT INTO waste_donor (firstname, lastname, cell_number, email, residential_address, age, gender, id_number, user_password, verification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', user);
        return res;
    }

    const findAccount = async (firstName) => {
        let res = await pool.query(`SELECT * FROM waste_donor WHERE firstname = $1`, [firstName]);
        return res.rows[0];
    }

    return {
        createAccount,
        findAccount
    }
}