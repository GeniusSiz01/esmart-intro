module.exports = (pool) => {

    const getDonorBins = async (id) => {
        let res = await pool.query('select waste_bin.id, waste_bin.weight, waste_bin.filled_capacity, waste_bin.status, waste_donor.firstname, waste_type.name from waste_bin inner join waste_donor on waste_donor.id = waste_bin.waste_donor_id inner join waste_type on waste_type.id = waste_bin.waste_type_id where waste_donor_id = $1', [id]);
        return res.rows;
    }

    const createBins = async (donorId, binTypeId) => {
        const binTypes = Array.isArray(binTypeId) ? binTypeId : [binTypeId];
        let isAdded = false;
        for (let x = 0; x < binTypes.length; x++) {
            let res = await pool.query('INSERT INTO waste_bin (weight, filled_capacity, waste_donor_id, waste_type_id) VALUES ($1, $2, $3, $4) RETURNING *', [0, 0, donorId, binTypes[x].id]);
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

    const updateBinsCapacity = async (id) => {
        let date = new Date();
        let ready = false;
        let res = await pool.query('select * from waste_bin where waste_donor_id = $1', [id]);
        if (res.rows.length !== 0) {
            for (let x = 0; x < res.rows.length; x++) {
                const fillFactor = Math.floor(Math.random() * 20);
                let res = await pool.query('update waste_bin set filled_capacity = filled_capacity + $1  where waste_donor_id = $2 and (filled_capacity + $3)<= 100 RETURNING filled_capacity', [fillFactor, id, fillFactor]);
                if (res.rows.length === 0) {
                    await pool.query('update waste_bin set status = $1', ["Ready for collection"]);
                    ready = true;
                }
            }
        }
        return ready
    }

    const resetBinsCapacity = async (id) => {
        let res = await pool.query('select * from waste_bin where waste_donor_id = $1', [id]);
        if (res.rows.length !== 0) {
            res.rows.forEach(async bins => {
                await pool.query('update waste_bin set filled_capacity = 0, status = $1 where waste_donor_id = $2', ["Not full", id]);
                await pool.query('');
            });
        }
    }

    const getFullBinForDonor = async (id) => {
        let res = await pool.query('select waste_bin.id, waste_bin.weight, waste_bin.filled_capacity, waste_bin.status, waste_donor.firstname, waste_donor.lastname, waste_donor.residential_address, waste_type.name, waste_bin.waste_donor_id, waste_donor.id from waste_bin inner join waste_donor on waste_donor.id = waste_bin.waste_donor_id inner join waste_type on waste_type.id = waste_bin.waste_type_id where filled_capacity>=80 and waste_donor_id = $1', [id]);
        // console.log(res.rows);
        return res.rows;
    }

    return {
        getDonorBins,
        createBins,
        getAllBinTypes,
        updateBinsCapacity,
        resetBinsCapacity,
        getFullBinForDonor
    }
}