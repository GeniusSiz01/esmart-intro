const bcrypt = require('bcrypt');
const _ = require('lodash');
const saltRounds = 10;

module.exports = (wasteCollector, collectorAccount, wasteDonor, wasteBin) => {

    const displayCollectorLandingPage = async (req, res) => {
        let results = await wasteCollector.getAccounts();
        res.render('collector-landing-screen', {
            accounts: results
        });
    }

    const getWasteCollectorAccount = async (req, res) => {
        let { id } = req.params;
        let account = await wasteCollector.findAccountById(id);
        res.render('collector-home-page', {
            collectorName: account.first_name + " " + account.last_name,
            collectorId: account.id

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
        const { id } = req.params;
        let collectorId = Number(id);
        let collector = await wasteCollector.findAccountById(collectorId);
        let bins = await wasteCollector.collectFullBins();
        // console.log(bins);
        if (bins.length !== 0) {
            let wasteBins = {
                wasteDonorsList: []
            }

            let binsToBeCollectedList = [
                {
                    firstName: '',
                    binCount: 0
                }
            ]

            let people = {
                firstname: '',
                count: 0
            }


            // console.log(bins);
            let out = await _.groupBy(bins, 'waste_donor_id');
            let fullBins = await _.groupBy(bins, 'firstname')
            let newArray = []
            wasteBins.wasteDonorsList.push(out);
            // console.log(fullBins);
            const value = Object.entries(fullBins);
            // console.log(value);
            // console.log(wasteBins.wasteDonorsList);
            let donorBinsList = wasteBins.wasteDonorsList[0];
            const keys = Object.keys(out);

            for (let x = 0; x < keys.length; x++) {
                const donorsId = Number(keys[x]);
                let getAccounts = await wasteDonor.findAccountById(donorsId);
                newArray.push(getAccounts);
                // console.log(getAccounts.firstname);
                let myBins = await wasteBin.getFullBinForDonor(getAccounts.id);
                // console.log(myBins);
                for (let x = 0; x < myBins.length; x++) {
                    const setName = myBins[x];
                    // setName.firstName = getAccounts.firstname;
                    // console.log(setName.firstname);
                    if (setName.firstname === setName.firstname) {

                    }

                }
            }

            console.log(collector.id);

            res.render('ready-to-collect-bins', {
                collector: `${collector.first_name} ${collector.last_name}`,
                readyBins: newArray,
                collectorId: collector.id
            });
        } else {
            res.render('ready-to-collect-bins', {
                collector: `${collector.first_name} ${collector.last_name}`,
                status: "No bins availabe"
            });
        }
    }

    const register = (req, res) => {
        res.render('waste-collector-signup-page');
    }

    const signin = (req, res) => {
        res.render('waste-collector-signin-page');
    }

    const handleCreateAccount = async (req, res) => {
        const { Firstname, Lastname, Phonenumber, email, Idnuber, password, gender } = req.body;
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) console.error(err);
            const account = {
                firstName: Firstname,
                lastName: Lastname,
                cellNumber: Phonenumber,
                email: email,
                location: '',
                idNumber: Idnuber,
                gender: gender,
                age: 0,
                password: hashedPassword,
                verification: false,
                vehicleRegNo: ''
            }
            let results = await wasteCollector.createAccount(account);
            if (results.response === 'Account already exist') {
                res.redirect('/waste/collector/signin');
            } else {
                res.redirect('/waste/collector/signin');
            }
        });
    }

    const handleSigninRequest = async (req, res) => {
        const { email, password } = req.body;
        let collector = await wasteCollector.findAccountByEmail(email);
        if (collector.response === 'Account not found') {
            req.flash('info', collector.response);
            res.redirect('/waste/collector/signin');
        } else {
            console.log(collector);
            let hashPassword = collector.account.user_password;
            bcrypt.compare(password, hashPassword, async (err, userPassword) => {
                if (err) console.error(err);
                if (userPassword) {
                    res.redirect(`/account/collector/${collector.account.id}`);
                } else {
                    req.flash('info', 'You have entered an invalid email or password');
                    res.redirect('/waste/collector/signin');
                }
            });
        }

    }

    const collectBin = async (req, res) => {
        const { donorId, collectorId } = req.body;
        const id = Number(donorId);
        let myBins = await wasteBin.getFullBinForDonor(id);
        if (myBins.length !== 0) {
            await wasteBin.resetBinsCapacity(id);
            res.redirect('/select/bin');    
        }

    }

    const selectBins = async (req, res) => {
        // console.log(req.body);
        // const { donorId, collectorId } = req.params;
        // console.log(donorId);
        res.render('thank-you-screen');
    }

    return {
        displayCollectorLandingPage,
        getWasteCollectorAccount,
        showReadyToCollectBins,
        readyToCollectBins,
        register,
        signin,
        handleCreateAccount,
        handleSigninRequest,
        collectBin,
        selectBins
    }
}