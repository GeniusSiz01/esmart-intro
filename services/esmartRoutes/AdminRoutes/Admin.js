module.exports = (wasteModel) => {

    const getBins = async (req, res) => {
        let bins = await wasteModel.getAllBinTypes()
        console.log(bins);
        res.json({
            bins: bins
        })
    }
    return {
        getBins
    }
}