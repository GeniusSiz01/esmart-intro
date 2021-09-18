module.exports = (wasteCollector) => {

    const displayCollectorLandingPage = async (req, res) => {
        let results = await wasteCollector.getAccounts();
        res.render('collector-landing-screen', {
            accounts: results
        });
    }

    const getWasteCollectorAccount = async (req, res) => {
        let { id } = req.params;
        let results = await wasteCollector.findAccountById(id);
        res.render('collector-home-page', {
            collectors: results
        });
    }

    const showReadyToCollectBins = async (req, res, next) => {
        let collectorId = Number(req.body.collectorId);
        let results = await wasteCollector.collectFullBins();
        if (results.length !== 0) {
            res.redirect(`/collector/${collectorId}/bins`);
            return next();
        }
    }

    const readyToCollectBins = async (req, res) => {
        let collectorId = Number(req.query.collectorId);
        let collector = await wasteCollector.findAccountById(collectorId);
        let bins = await wasteCollector.collectFullBins();
        if (bins.length !== 0) {
            let wasteBins = {
                wasteDonorsList: []
            }
            console.log(bins);

            wasteBins.wasteDonorsList.push({
                firstName: bins[0].firstname,
                lastName: bins[0].lastname,
                binCount: bins.length,
                address: bins[0].residential_address
            });

            res.render('ready-to-collect-bins', {
                collector: `${collector[0].first_name} ${collector[0].last_name}`,
                readyBins: wasteBins.wasteDonorsList
            });
        } else { 
            res.render('ready-to-collect-bins', {
                collector: `${collector[0].first_name} ${collector[0].last_name}`,
                status: "No bins availabe"
            });
        }



    }

    return {
        displayCollectorLandingPage,
        getWasteCollectorAccount,
        showReadyToCollectBins,
        readyToCollectBins
    }
}