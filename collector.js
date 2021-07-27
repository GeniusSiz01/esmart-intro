// bins.js
// in bin-service.js
module.exports = function binService(db) {
    //
    async function getBins() {
        // select bins from db - select with join
        let sql = 'select * from waste_bin join waste_type on waste_type.id=waste_type_id';
        const bins = await db.all(sql);
        console.log(bins);
        return bins;
    }
    // async function fillBins() {
    //     // update  the contents for your bins using update query
    //     let sql2 = 'update waste_bin set filled_capacity=increaseFactor where waste_donor_id';
    //     const percent = await db.all(sql2);
    //     console.log(percent);
    //     return percent;
    //     // random increase
    //     for (let i = 0; i < binList.length; i++) {
    //         if (binList[i].percentage < 100) {
    //             let randomNumber = Math.floor(Math.random() * 100);
    //             if ((binList[i].percentage + randomNumber) <= 100) {
    //                 binList[i].percentage += randomNumber;
    //                 const increaseFactor = randomNumber
    //             }
    //         }
    //     }
    //     return binList
    // }
    // function markForCollection(binId) {
    //     // boolean value whether it can be collect or not 
       
    // }

    // function collectBin(bindId) {

    //     // change status to collected

    // }

    // function depotData(depotId) {
        // what do we have at the depot?
    // }
    // function deliverToDepot( ? ) {

    //     // 

    // }

    return{
        getBins,
        // fillBins
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