module.exports = (wasteBins, wasteDonor) => {

    const index = async (req, res) => {

        res.render('home', {

        });
    }

    const wasteDonorBins = async (req, res) => {
        let { user } = req.params;
        let newFirstName = user.trim();
        newFirstName = newFirstName.charAt(0).toUpperCase() + (newFirstName.slice(1)).toLowerCase();
        let bins = await wasteBins.getDonorBins(newFirstName);
        res.json({
            wasteDonor: bins
        });
        // 
    }

    const getWasteDonorAccount = async (req, res) => {
        let { id } = req.params;
        // let account = await wasteDonor.findAccount(newFirstName);
        let account = await wasteDonor.findAccountById(id);
        let bins = await wasteBins.getDonorBins(id);
        if (account) {
            res.render('waste-donor-home-page', {
                donoName: account.firstname + " " + account.lastname,
                bins: bins
            });
        } else {
            res.json({
                message: 'No account found'
            })
        }
    }

    const displayDonorLandingPage = async (req, res) => {
        let results = await wasteDonor.findAccountById(5);
        let accounts = await wasteDonor.getAccounts();
        res.render('donor-landing-screen', {
            user: results.firstname,
            accounts: accounts
        });
    }

    return {
        index,
        wasteDonorBins,
        getWasteDonorAccount,
        displayDonorLandingPage
    }
}