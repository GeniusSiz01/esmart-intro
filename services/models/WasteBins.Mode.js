module.exports = (pool) => {

    const getDonorBins = async (id) => {
        let res = await pool.query('select waste_bin.id, waste_bin.weight, waste_bin.filled_capacity, waste_bin.status, waste_donor.firstname, waste_type.name from waste_bin inner join waste_donor on waste_donor.id = waste_bin.waste_donor_id inner join waste_type on waste_type.id = waste_bin.waste_type_id where waste_donor_id = $1', [id]);
        return res.rows;
    }

    const createBins = async (donorId, binTypeId) => {
        const binTypes = Array.isArray(binTypeId) ? binTypeId : [binTypeId];
        let userBins = [];
        let checkIfBinsExist = await pool.query('select * from waste_bin where waste_donor_id = $1', [donorId]);
        let isAdded = false;
        if (checkIfBinsExist.rows.length === 0) {
            for (let x = 0; x < binTypes.length; x++) {
                let bins = await pool.query('INSERT INTO waste_bin (weight, filled_capacity, waste_donor_id, waste_type_id) VALUES ($1, $2, $3, $4) RETURNING weight, filled_capacity, waste_donor_id, waste_type_id, status, schedule, timestamp', [0, 0, donorId, binTypes[x].id]);
                isAdded = true;
                // userBins.push(bins.rows[x]);
            }
            if (!isAdded) {
                return { response: 'Waste bins were not created' };
            } else {
                return { response: 'Waste bins are now working' };
            }
        } else {
            return { response: 'Waste bins have been already allocated' }
        }


    }

    const getAllBinTypes = async () => {
        let res = await pool.query('select * from waste_type');
        return res.rows;
    }

    const updateBinsCapacity = async (id, binTypeId) => {
        let ready = false;
        let res = await pool.query('select * from waste_bin where waste_donor_id = $1', [id]);
        if (res.rows.length !== 0) {
            for (let x = 0; x < res.rows.length; x++) {
                const fillFactor = Math.floor(Math.random() * 20);
                console.log(binTypeId);
                let res = await pool.query('update waste_bin set filled_capacity = filled_capacity + $1  where id = $2 and (filled_capacity + $3)<= 100 RETURNING filled_capacity', [fillFactor, binTypeId, fillFactor]);
                if (res.rows.length === 0) {
                    await pool.query('update waste_bin set status = $1', [false]);
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
                await pool.query('update waste_bin set filled_capacity = 0, status = $1 where waste_donor_id = $2', [false, id]);
                await pool.query('');
            });
        }
    }

    const getFullBinForDonor = async (id) => {
        let res = await pool.query('select waste_bin.id, waste_bin.weight, waste_bin.filled_capacity, waste_bin.status, waste_donor.firstname, waste_donor.lastname, waste_donor.residential_address, waste_type.name, waste_bin.waste_donor_id, waste_bin.waste_type_id from waste_bin inner join waste_donor on waste_donor.id = waste_bin.waste_donor_id inner join waste_type on waste_type.id = waste_bin.waste_type_id where filled_capacity>=80 and waste_donor_id = $1', [id]);
        return res.rows;
    }

    const binActivity = async (request) => {
        let data = [
            request.dateTime,
            request.donor,
            request.collector,
            request.wasteBins,
            request.status,
        ]
        await pool.query('insert into waste_bin_collection_activity (date_time, waste_donor_id, waste_collector_id, waste_type_id, status) values ($1, $2, $3, $4, $5)', data);

        await pool.query('update waste_bin set status = false where waste_donor_id = $1 and waste_type_id = $2', [request.donor, request.wasteBins]);
    }

    const getHistory = async (id) => {
        let res = await pool.query('select waste_bin_collection_activity.id, waste_bin_collection_activity.date_time, waste_bin_collection_activity.status, waste_bin_collection_activity.waste_donor_id, waste_donor.firstname, waste_donor.lastname, waste_type.name from waste_bin_collection_activity inner join waste_donor on waste_donor.id = waste_bin_collection_activity.waste_donor_id inner join waste_type on waste_type.id = waste_bin_collection_activity.waste_type_id where waste_collector_id = $1', [id]);
        return res.rows;
    }

    const getHistoryForDonor = async (id) => {
        console.log(id);
        console.log('inside');
        let res = await pool.query('select waste_bin_collection_activity.id, waste_bin_collection_activity.date_time, waste_bin_collection_activity.status, waste_bin_collection_activity.waste_donor_id, waste_collector.first_name, waste_collector.last_name, waste_type.name from waste_bin_collection_activity inner join waste_collector on waste_collector.id = waste_bin_collection_activity.waste_collector_id inner join waste_type on waste_type.id = waste_bin_collection_activity.waste_type_id where waste_donor_id = $1 and status = false', [id]);
        return res.rows;
    }

    const setBinForCollection = async (searchQuery) => {
        let res = await pool.query('select * from waste_bin where waste_donor_id = $1', [searchQuery.userId]);
        if (res.rows.length !== 0) {
            console.log('found');
            await pool.query('update waste_bin set status = $1, filled_capacity = 99 where waste_donor_id = $2 and id = $3', [true, searchQuery.userId, searchQuery.binId]);
        }
    }

    const getBinsReadyForCollection = async (id) => {
        let res = await pool.query('select waste_type.id, waste_bin.weight, waste_bin.filled_capacity, waste_bin.status, waste_donor.firstname, waste_type.name, waste_bin.waste_donor_id from waste_bin inner join waste_donor on waste_donor.id = waste_bin.waste_donor_id inner join waste_type on waste_type.id = waste_bin.waste_type_id where waste_donor_id = $1 and status = $2', [id, true])
        return res.rows
    }

    const cancelRequest = async (searchQuery) => {
        let res = await pool.query('update waste_bin set status = $1 where waste_donor_id = $2 and id = $3', [false, searchQuery.donorId, searchQuery.binId]);
    }

    const getNotificationsForCollectionInProgressForCollector = async (id) => {
        let res = await pool.query('select waste_bin_collection_activity.id, waste_bin_collection_activity.date_time, waste_bin_collection_activity.status, waste_bin_collection_activity.waste_donor_id, waste_donor.firstname, waste_donor.lastname, waste_type.name from waste_bin_collection_activity inner join waste_donor on waste_donor.id = waste_bin_collection_activity.waste_donor_id inner join waste_type on waste_type.id = waste_bin_collection_activity.waste_type_id where waste_collector_id = $1', [id]);
        return res.rows;
    }

    const getNotificationsForCollectionInProgressForDonor = async (id) => {
        console.log(id);
        let res = await pool.query('select waste_bin_collection_activity.date_time, waste_bin_collection_activity.status, waste_bin_collection_activity.waste_donor_id, waste_bin_collection_activity.waste_collector_id, waste_donor.firstname, waste_donor.lastname, waste_type.name, waste_collector.first_name, waste_collector.last_name from waste_bin_collection_activity inner join waste_donor on waste_donor.id = waste_bin_collection_activity.waste_donor_id inner join waste_type on waste_type.id = waste_bin_collection_activity.waste_type_id inner join waste_collector on waste_collector.id = waste_bin_collection_activity.waste_collector_id where waste_donor_id = $1', [id]);
        return res.rows;
    }

    const closePickUpRequest = async (request) => {
        let res = await pool.query('select * from waste_bin_collection_activity where status = true');
        for (let x = 0; x < res.rows.length; x++) {
            const bin = res.rows[x];
            await pool.query('update waste_bin_collection_activity set status = false, date_time = $1 where id = $2', [new Date(), bin.id]);
        }

    }

    return {
        getDonorBins,
        createBins,
        getAllBinTypes,
        updateBinsCapacity,
        resetBinsCapacity,
        getFullBinForDonor,
        binActivity,
        getHistory,
        getHistoryForDonor,
        setBinForCollection,
        getBinsReadyForCollection,
        cancelRequest,
        getNotificationsForCollectionInProgressForCollector,
        getNotificationsForCollectionInProgressForDonor,
        closePickUpRequest
    }
}