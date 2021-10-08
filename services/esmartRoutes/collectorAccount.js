const bcrypt = require('bcrypt');
const _ = require('lodash');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

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
        const { id } = req.body;
        let collectorId = Number(id);
        let collector = await wasteCollector.findAccountById(collectorId);
        let bins = await wasteCollector.collectFullBins();
        if (bins.length !== 0) {
            let out = _.groupBy(bins, 'waste_donor_id');
            let newArray = [];
            const keys = Object.keys(out);

            for (let x = 0; x < keys.length; x++) {
                const donorsId = Number(keys[x]);
                let getAccounts = await wasteDonor.findAccountById(donorsId);
                newArray.push(getAccounts);
            }
            res.json({
                status: 'success',
                readyBins: newArray,
                collector: collector
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
                res.json({
                    status: 'failure',
                    reason: 'Trying to create account'
                })
            } else {
                const token = jwt.sign({ userId: results.account.id }, config.secret, { expiresIn: config.tokenLife });
                res.json({
                    status: 'success',
                    reason: 'Created account',
                    token
                });
            }
        });
    }

    const handleSigninRequest = async (req, res) => {
        const { email, password } = req.body;
        let collector = await wasteCollector.findAccountByEmail(email);
        if (collector.response === 'Account not found') {
            // req.flash('info', collector.response);
            // res.redirect('/waste/collector/signin');
        } else {
            console.log(collector);
            let hashPassword = collector.account.user_password;
            bcrypt.compare(password, hashPassword, async (err, userPassword) => {
                if (err) console.error(err);
                if (userPassword) {
                    const token = jwt.sign({ userId: collector.account.id }, config.secret, { expiresIn: config.tokenLife });

                    res.json({
                        status: 'success',
                        reason: 'Signing in to account',
                        token,
                        auth: true
                    });
                } else {
                    res.json({
                        status: 'failure',
                        reason: 'Trying to signin to account',
                        auth: false
                    })
                }
            });
        }

    }

    const verifyToken = (req, res) => {
        let { token } = req.body;
        const tokenStatus = jwt.verify(token, config.secret);
        if (tokenStatus) {
            res.json({
                status: 'success',
                userId: tokenStatus.userId,
                auth: true
            });
        } else {
            res.json({
                status: 'failure',
                auth: false
            })
        }
    }

    const collectBin = async (req, res) => {
        const { donorId, collectorId } = req.body;
        const id = Number(donorId);
        res.redirect(`/collect/bins/${donorId}/${collectorId}`);
        // let myBins = await wasteBin.getFullBinForDonor(id);
        // if (myBins.length !== 0) {
        //     await wasteBin.resetBinsCapacity(id);
        //     res.redirect('/select/bin');    
        // }

    }

    const selectBins = async (req, res) => {
        const { donorId, collectorId } = req.params;
        // console.log(donorId);
        const donor = Number(donorId);
        const collector = Number(collectorId);
        const getDonorBins = await wasteBin.getFullBinForDonor(donor);
        console.log(getDonorBins);
        if (getDonorBins.length !== 0) {
            res.render('select-bins-to-collect', {
                bins: getDonorBins,
                donorName: `${getDonorBins[0].firstname} ${getDonorBins[0].lastname}`,
                collectorId: collector,
                donorId: donor
            });
        } else {
            res.render('select-bins-to-collect', {
                status: 'No bins avalable for collection'
            });
        }

    }

    const collecting = async (req, res) => {
        const { collectorId, binTypes, donorId } = req.body;
        console.log(req.body);
        let date = new Date();
        const collector = Number(collectorId);
        const donor = Number(donorId);
        req.flash('info', 'Check your bin collection history');
        const bins = Array.isArray(binTypes) ? binTypes : [binTypes];
        for (let x = 0; x < bins.length; x++) {
            const binIds = bins[x];
            let strToNumber = Number(binIds);
            const binData = {
                date: date,
                status: 'Collected',
                binId: strToNumber,
                donorId: donor,
                collectorId: collector,
                weight: 0,
                binType: strToNumber
            }
            await wasteBin.binActivity(binData);
        }
        await wasteBin.resetBinsCapacity(donor);

        res.redirect(`/account/collector/${collector}`);
    }

    const renderHistory = async (req, res) => {
        const { id } = req.params;
        const collectorId = Number(id);
        const historyBins = await wasteBin.getHistory(collectorId);
        let donorsList = [];
        const sortBinsById = _.groupBy(historyBins, 'waste_donor_id');
        const getSortedBinsKey = Object.keys(sortBinsById);
        for (let x = 0; x < getSortedBinsKey.length; x++) {
            const donor_id = Number(getSortedBinsKey[x]);
            let getAccounts = await wasteDonor.findAccountById(donor_id);
            donorsList.push(getAccounts);

        }
        console.log(donorsList);
        res.render('collecter-history-page', {
            bins: donorsList,
            collectorId: collectorId
        });
    }

    const handleDeatilsRequest = async (req, res) => {
        const { donorId, collectorId } = req.body;
        const donor = Number(donorId);
        const collector = Number(collectorId);

        res.redirect(`/bins/history/view/${donor}/${collector}`);
    }

    const renderDetails = async (req, res) => {
        const { donorId, collectorId } = req.params;
        const donor = Number(donorId);
        const collector = Number(collectorId);
        const historyBins = await wasteBin.getHistory(collector);
        console.log(historyBins);
        res.render('history-details-page', {
            bins: historyBins,
            donorName: `${historyBins[0].firstname} ${historyBins[0].lastname}`,
            collectorId: collectorId
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
        handleSigninRequest,
        collectBin,
        selectBins,
        collecting,
        renderHistory,
        handleDeatilsRequest,
        renderDetails,
        verifyToken
    }
}