// bins.js
// in bin-service.js
module.exports = function binService(db) {
    //
    async function getBins() {
        // select bins from db - select with join
        let sql = 'select * from waste_bin join waste_type on waste_type.id=waste_type_id';
        const bins = await db.all(sql);
        // console.log(bins);
        return bins;
    }
    async function fillBins() {
        // update  the contents for your bins using update query
        let sql2 = 'update waste_bin set filled_capacity = filled_capacity + ?  where waste_donor_id and (filled_capacity + ?)<= 100';
        const fillFactor = Math.floor(Math.random() * 20)
        const percent = await db.run(sql2, fillFactor, fillFactor);
        // console.log(fillFactor);
        return percent;
       
    }
    async function reset() {
        // update  the contents for your bins using update query
        let sql2 = 'update waste_bin set filled_capacity = 0 ';
         await db.run(sql2);
        let sql3 = 'delete from waste_bin_collection_activity';
         await db.run(sql3);
        // console.log(percent);
        return;
       
    }
    async function markForCollection(binId) {
        const bin = await getBin(binId) 
        // console.log(bin) 
        let sql3= `insert into waste_bin_collection_activity
        (waste_bin_id, waste_donor_id, waste_bin_collection_status_id, weight_collected, date_time) 
        values(?, ?, ?, ?, ?)`; 
        const status = await db.run(sql3, bin.id, bin.waste_donor_id, 1, bin.weight ,new Date())
        // console.log(status);
        return status; 
    }

    async function binAllocation(statusId, collectorId) {
        // console.log(bin) 
        let sql3= `update waste_bin_collection_activity set waste_bin_collection_status_id=? , waste_collector_id=? where id=?`; 
        const allocate = await db.run(sql3, collectorId,2,statusId )
        // console.log(status);
        return ; 
    }

    async function isBinMarkForCollection(binId) {
        let sql3= 'select count(*) as count from waste_bin_collection_activity where waste_bin_id=? and waste_bin_collection_status_id=1' 
        const bin = await db.get(sql3, binId)
        // console.log(bin)
        // console.log('isBinMarkForCollection')
        if(bin.count==0){
          return false
        }
        // console.log(status);
        return true; 
    }
    async function getBin(binId){
        let sql='select * from waste_bin where id=?'
        const bin = await db.get(sql, binId);
        // console.log(bin);
        return bin;
    }
    async function getBinsReadyForCollection() {
        // select bins from db - select with where
        let sql = 'select * from waste_bin where filled_capacity>=80'
        const threshold = await db.all(sql);
        // console.log(threshold);
        return threshold;
    }
    async function checkForReadyBins(){
       const list = await getBinsReadyForCollection()
       for (const bin of list){
        try {
           const alreadyMarkedForCollection = await isBinMarkForCollection(bin.id)
           if(!alreadyMarkedForCollection){
               await markForCollection(bin.id)
           }
       } catch (err) {
           console.log(err);
       }  
       } 
    }
    async function collectReadyBins() {
        let sql4 = `select * from waste_bin_collection_activity 
        join waste_bin_collection_status 
            on waste_bin_collection_status_id=waste_bin_collection_status.id 
        join waste_donor 
            on waste_donor_id=waste_donor.id 
        where waste_bin_collection_status.name=?`
        // 'in-request'
        const readyAll = await db.all(sql4, 'in-request');
        // console.log(readyAll);
        return readyAll;
    }
    async function binsForStatus(status) {
        let sql4 = `select * from waste_bin_collection_activity 
        join waste_bin_collection_status 
            on waste_bin_collection_status_id=waste_bin_collection_status_id 
        join waste_donor 
            on waste_donor_id=waste_donor.id 
        where waste_bin_collection_status.name=?`
        // 'in-request'
        const readyAll = await db.all(sql4, status);
        console.log(readyAll);
        return readyAll;
    }

    async function collectors (){
        let sql5= 'select * from waste_collector '
        const driverDetails = await db.all(sql5)
        return driverDetails;
    }
    // function depotData(depotId) {
        // what do we have at the depot?
    // }
    // function deliverToDepot( ? ) {

    //     // 

    // }

    return{
        getBins,
        fillBins,
        markForCollection,
        getBin,
        getBinsReadyForCollection,
        checkForReadyBins,
        collectReadyBins,
        isBinMarkForCollection,
        binsForStatus,
        binAllocation,
        collectors,
        reset
    }
};

// // in index.js

// app.get('/view-bin/:bindId', async function () {

//     const param = req.params.binId


//     // await binService.updateOrInsertSomething(param);
//     const data = await binService.doSomething(param)

//     res.render('template', {
//         data
//     })

// })


// app.get('/update-bin/:bindId', async function () {

//         const param = req.params.bindId


//         // update the bin status...
//         // await binService.updateOrInsertSomething(param);
//         // const data = await binService.doSomething(param)

//         res.render('template', {
//             data
//         })

//     }) {
//         {
//             #
//             each bins
//         }
//     } <
//     html method = "post"
// target = "/update-bin/" >
//     <
//     input type = "hidden name="
// binId "  value={{binId}}>

//     <
//     input type = "submit" >


//     <
//     /html>

// {
//     {
//         /each}}

//         app.post('/update-bin/', async function () {

//             const param = req.body.binId

//             // update the bin status...
//             // await binService.updateOrInsertSomething(param);
//             // const data = await binService.doSomething(param)

//             res.render('template', {
//                 data
//             })

//         })