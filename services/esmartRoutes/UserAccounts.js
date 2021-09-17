module.exports = (wasteBins) => {

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

    return {
        index,
        wasteDonorBins
    }
}