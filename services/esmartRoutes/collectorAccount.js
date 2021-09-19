const bcrypt = require('bcrypt');
const _ = require('lodash');
const saltRounds = 10;

module.exports = (wasteCollector, collectorAccount, wasteDonor) => {

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
            id: account.id

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
            let out = await _.groupBy(bins, 'waste_donor_id');
            let newArray = []
            wasteBins.wasteDonorsList.push(out);
            // console.log(wasteBins.wasteDonorsList);
            let donorBinsList = wasteBins.wasteDonorsList[0];
            const keys = Object.keys(out);

            for (let x = 0; x < keys.length; x++) {
                const donorsId = Number(keys[x]);
                let getAccounts = await wasteDonor.findAccountById(donorsId);
                newArray.push(getAccounts);
            }

            console.log(newArray);
            res.render('ready-to-collect-bins', {
                collector: `${collector.first_name} ${collector.last_name}`,
                readyBins: newArray
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
        let account = await wasteCollector.findAccountByEmail(email);
        let hashPassword = account.user_password;
        console.log(hashPassword);
        bcrypt.compare(password, hashPassword, async (err, userPassword) => {
            if (err) console.error(err);
            console.log(userPassword);
            if (userPassword) {
                res.redirect(`/account/collector/${account.id}`);
            }
        });
    }

    return {
        displayCollectorLandingPage,
        getWasteCollectorAccount,
        showReadyToCollectBins,
        readyToCollectBins,
        register,
        signin,
        handleCreateAccount,
        handleSigninRequest
    }
}