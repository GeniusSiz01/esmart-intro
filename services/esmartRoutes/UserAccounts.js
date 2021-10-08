const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
module.exports = (wasteBins, wasteDonor, donorAccount) => {

    const index = async (req, res) => {

        res.render('home', {

        });
    }

    const wasteDonorBins = async (req, res) => {
        let { user } = req.params;
        let bins = await wasteBins.getDonorBins(user);
        res.json({
            wasteDonor: bins,
            binCount: bins.length
        });
    }

    const getWasteDonorAccount = async (req, res) => {
        let { id } = req.params;
        console.log();
        // let account = await wasteDonor.findAccount(newFirstName);
        let account = await wasteDonor.findAccountById(id);
        let bins = await wasteBins.getDonorBins(id);
        let binTypes = await wasteBins.getAllBinTypes();
        if (account) {
            if (bins.length === 0) {
                // res.render('waste-donor-home-page', {
                //     donoName: account.firstname + " " + account.lastname,
                //     donorId: account.id,
                //     status: 'No bins available',
                //     binTypes: binTypes
                // });
                res.json({
                    donoName: account.firstname + " " + account.lastname,
                    donorId: account.id,
                    status: 'No bins available',
                    binTypes: binTypes
                })
            } else {
                res.render('waste-donor-home-page', {
                    donoName: account.firstname + " " + account.lastname,
                    bins: bins,
                    donorId: account.id,
                });
            }

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

    const simulateBins = async (req, res) => {
        let { binTypes, donorId } = req.body;
        const bins = Array.isArray(binTypes) ? binTypes : [binTypes];
        for (let x = 0; x < bins.length; x++) {
            const binId = bins[x];
            await wasteBins.updateBinsCapacity(donorId, Number(binId));
        }
        res.redirect(`/account/donor/${Number(donorId)}`);
    }

    const resetBins = async (req, res) => {
        let { id } = req.params;
        await wasteBins.resetBinsCapacity(id);
        res.redirect(`/account/donor/${id}`);
    }

    const register = (req, res) => {
        res.render('waste-donor-register-page');
    }

    const signin = (req, res) => {
        res.render('waste-donor-signin-page');
    }

    const handleCreateAccount = async (req, res) => {
        const { Firstname, Lastname, Phonenumber, email, Idnuber, password, gender } = req.body;
        if (password[0] === password[0]) {
            bcrypt.hash(password, 10, async (err, hashedPassword) => {
                if (err) console.error(err);
                const account = {
                    firstName: Firstname,
                    lastName: Lastname,
                    cellNumber: Phonenumber,
                    email: email,
                    residentialAddress: '',
                    idNumber: Idnuber,
                    gender: gender,
                    age: 0,
                    password: hashedPassword,
                    verification: false,
                }
                let results = await donorAccount.create(account);
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
        } else {
            res.redirect('/waste/donor/register');
        }
    }

    const handleSigninRequest = async (req, res) => {
        console.log(rew.body );
        const { email, password } = req.body;
        console.log(email);
        let donor = await wasteDonor.findAccountByEmail(email);
        console.log(donor);
        if (donor.response === 'Account not found') {
            req.flash('info', donor.response);
            res.redirect('/waste/donor/signin');
        } else {
            let hashPassword = donor.account.user_password;
            bcrypt.compare(password, hashPassword, async (err, userPassword) => {
                if (err) console.error(err);
                if (userPassword) {
                    const token = jwt.sign({ userId: donor.account.id }, config.secret, { expiresIn: config.tokenLife });
                    res.json({
                        status: 'success',
                        reason: 'Signing in to account',
                        token,
                        auth: true
                    })
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

    const handleAddBins = async (req, res) => {
        const { donorId } = req.body;
        let getBinTypes = await wasteBins.getAllBinTypes();
        console.log(getBinTypes);
        let getAddBinsStatus = await wasteBins.createBins(donorId, getBinTypes);
        console.log();
        if (getAddBinsStatus.response === 'Waste bins are now working') {
            res.json({
                status: 'success',
                isAdded: true
            })
        } else {
            res.json({
                status: 'Something went wrong',
                isAdded: false
            })
        }

    }

    const handleHistoryRequest = async (req, res) => {
        const { id } = req.params;
        res.redirect(`/donor/show/details/${id}`);

    }

    const renderHistoryDetails = async (req, res) => {
        const { id } = req.params;
        const donorId = Number(id);
        const historyBins = await wasteBins.getHistoryForDonor(donorId);
        if (historyBins.length !== 0) {
            res.render('donor-history-details-page', {
                bins: historyBins,
                donorId: donorId
            });
        } else {
            res.render('donor-history-details-page', {
                donorId: donorId,
                status: 'No bins available'
            });
        }

    }

    const handlePickUpBins = async (req, res) => {
        let { userId, binId } = req.body;
        // console.log(req.params);
        // console.log(userId);
        let searchQuery = {
            userId: userId,
            binId: binId
        }

        await wasteBins.setBinForCollection(searchQuery);
    }

    const showBinsReadyForCollection = async (req, res) => {
        let { userId } = req.params;
        let bins = await wasteBins.getBinsReadyForCollection(userId);
        res.json({
            wasteDonor: bins
        });
    }

    const cancelPickUpRequest = async (req, res) => {
        let { donorId, binId } = req.body;
        console.log(donorId);
        let searchQuery = {
            donorId,
            binId
        }
        await wasteBins.cancelRequest(searchQuery);
    }

    return {
        index,
        wasteDonorBins,
        getWasteDonorAccount,
        displayDonorLandingPage,
        simulateBins,
        resetBins,
        register,
        signin,
        handleCreateAccount,
        handleSigninRequest,
        handleAddBins,
        handleHistoryRequest,
        renderHistoryDetails,
        verifyToken,
        handlePickUpBins,
        showBinsReadyForCollection,
        cancelPickUpRequest
    }
}