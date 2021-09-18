module.exports = (pool) => {

    const createAccount = async (account) => {
        let user = [
            account.firstName,
            account.lastName,
            account.cellNumber,
            account.vehicleRegNo,
            account.email,
            account.location,
            account.age,
            account.gender,
            account.idNumber,
            account.password,
            account.verification]
        let res = await pool.query('INSERT INTO waste_collector (first_name, last_name, cell_number, vehicle_regNo, email, location, age, gender, id_number, user_password, verification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', user);
        return res;
    }

    const findAccount = async (firstName) => {
        let res = await pool.query(`SELECT * FROM waste_collector WHERE first_name = $1`, [firstName]);
        return res.rows;
    }

    const getAccounts = async () => {
        let res = await pool.query('select * from waste_collector');
        return res.rows;
    }

    const findAccountById = async (id) => {
        let res = await pool.query('select * from waste_collector where id = $1', [id]);
        return res.rows;
    }

    const collectFullBins = async () => {
        let res = await pool.query('select waste_bin.id, waste_bin.weight, waste_bin.filled_capacity, waste_bin.status, waste_donor.firstname, waste_donor.lastname, waste_donor.residential_address, waste_type.name from waste_bin inner join waste_donor on waste_donor.id = waste_bin.waste_donor_id inner join waste_type on waste_type.id = waste_bin.waste_type_id where status = $1', ["Ready for collection"]);
        // console.log(res.rows);
        // if (res.rows.length === 4) {
        //     let group = await pool.query('select ');
        // }
        return res.rows
    }

    return {
        createAccount,
        findAccount,
        getAccounts,
        findAccountById,
        collectFullBins
    }
}