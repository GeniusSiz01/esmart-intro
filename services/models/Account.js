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
        // console.log(user);
        let res = await pool.query('INSERT INTO waste_collector (first_name, last_name, cell_number, vehicle_regNo, email, location, age, gender, id_number, user_password, verification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', user);
        return res;

    }

    const getAccount = async (name) => {
        let res = await pool.query('SELECT * FROM waste_collector');
        return res.rows;
    }

    return {
        createAccount, getAccount
    }
}