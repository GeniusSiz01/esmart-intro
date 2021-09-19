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
        console.log(id);
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
        let account = await wasteDonor.findAccountByEmail(email);
        console.log(account);
        let hashPassword = account.user_password;
        console.log(hashPassword + ' user password');
        bcrypt.compare(password, hashPassword, async (err, userPassword) => {
            if (err) console.error(err);
            console.log(userPassword);
            if (userPassword) {
                res.redirect(`/account/donor/${account.id}`);
            }
        });
    }

    const handleAddBins = async (req, res) => {
        // console.log(req.body);
        const { bins, donor } = req.body;
        let makeBins = await wasteBins.createBins(donor, bins);
        // console.log(makeBins);
        res.redirect(`/account/donor/${donor}`);
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
        handleAddBins
    }
}