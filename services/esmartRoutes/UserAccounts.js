const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = (wasteBins, wasteDonor, donorAccount) => {

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
        let binTypes = await wasteBins.getAllBinTypes();
        if (account) {
            if (bins.length === 0) {
                res.render('waste-donor-home-page', {
                    donoName: account.firstname + " " + account.lastname,
                    donorId: account.id,
                    status: 'No bins available',
                    binTypes: binTypes
                });
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
        let { id } = req.params;
        let results = await wasteBins.updateBinsCapacity(id);
        res.redirect(`/account/donor/${id}`);
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
            console.log(password);
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
                    res.redirect('/waste/donor/signin');
                } else {
                    res.redirect('/waste/donor/signin');
                }
            });
        } else {
            res.redirect('/waste/donor/register');
        }
    }

    const handleSigninRequest = async (req, res) => {
        const { email, password } = req.body;
        let donor = await wasteDonor.findAccountByEmail(email);
        if (donor.response === 'Account not found') {
            req.flash('info', donor.response);
            res.redirect('/waste/donor/signin');
        } else {
            let hashPassword = donor.account.user_password;
            bcrypt.compare(password, hashPassword, async (err, userPassword) => {
                if (err) console.error(err);
                if (userPassword) {
                    res.redirect(`/account/donor/${donor.account.id}`);
                } else {
                    req.flash('info', 'You have entered an invalid email or password');
                    res.redirect('/waste/donor/signin');
                }
            });
        }


    }

    const handleAddBins = async (req, res) => {
        const { bins, donor } = req.body;
        await wasteBins.createBins(donor, bins);
        res.redirect(`/account/donor/${donor}`);
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
                status:'No bins available'
            });
        }

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
        renderHistoryDetails
    }
}