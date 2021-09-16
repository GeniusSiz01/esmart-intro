module.exports = (pool) => {

    const getBins = async (donorId) => {
        let res = await pool.query('SELECT waste_donor.firstname, waste_type.name, waste_bin.weight, waste_bin.filled_capacity FROM waste_donor INNER JOIN waste_bin ON waste_donor.id = waste_bin.waste_donor_id INNER JOIN waste_type ON waste_bin.id = waste_bin.waste_type_id WHERE waste_donor_id = $1', [donorId]);
        return res.rows;
    }

    const createBins = async (donorId, binTypeId) => {
        let res = await pool.query('INSERT INTO waste_bin (waste_donor_id, waste_type_id) VALUES ($1, $2) RETURNING *', [donorId, binTypeId]);
        return res.rows;
    }

    const getAllBinTypes = async () => {
        let res = await pool.query('SELECT * FROM waste_type');
        return res.rows;
    }


    return {
        getBins,
        createBins,
        getAllBinTypes
    }
}