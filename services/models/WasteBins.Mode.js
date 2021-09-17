module.exports = (pool) => {

    const getDonorBins = async (firstName) => {
        let res = await pool.query('select waste_bin.id, waste_bin.weight, waste_bin.filled_capacity, waste_donor.firstname, waste_type.name from waste_bin inner join waste_donor on waste_donor.id = waste_bin.waste_donor_id inner join waste_type on waste_type.id = waste_bin.waste_type_id where firstname = $1', [firstName]);
        return res.rows;
    }

    const createBins = async (donorId, binTypeId) => {
        const binTypes = Array.isArray(binTypeId) ? binTypeId : [binTypeId];
        let isAdded = false;
        console.log(binTypes);
        for (let x = 0; x < binTypes.length; x++) {
            const binId = binTypes[x];
            let res = await pool.query('INSERT INTO waste_bin (weight, filled_capacity, waste_donor_id, waste_type_id) VALUES ($1, $2, $3, $4) RETURNING *', [0, 0, donorId, binId.id]);
            isAdded = true;
        }
        if (!isAdded) {
            return { response: 'Waste bins were not created' };
        } else {
            return { response: 'Waste bins are now working' };
        }
    }

    const getAllBinTypes = async () => {
        let res = await pool.query('select * from waste_type');
        
        return res.rows;
    }


    return {
        getDonorBins,
        createBins,
        getAllBinTypes
    }
}