const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

module.exports = (donorModel, binModel) => {

    const donorSignUp = async (req, res) => {
        const { Firstname, Lastname, Phonenumber, email, Idnumber, password, gender } = req.body;
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) console.error(err);
            const account = {
                firstName: Firstname,
                lastName: Lastname,
                cellNumber: Phonenumber,
                email: email,
                residentialAddress: '',
                idNumber: Idnumber,
                gender: gender,
                age: 0,
                password: hashedPassword,
                verification: false,
            }
            let results = await donorModel.createAccount(account);
            if (results.response === false) {
                res.json({
                    status: 'failure',
                    reason: 'Account already exists'
                })
            } else {
                // const token = jwt.sign({ userId: results.account.id }, config.secret);
                res.json({
                    status: 'success',
                    reason: 'Created account',
                    token
                });
            }
        });
    }

    const donorSignIn = async (req, res) => {
        const { email, password } = req.body;
        let donor = await donorModel.findAccountByEmail(email);
        if (donor.response === false) {
            res.json({
                status: "failure",
                reason: "Account not found"
            });
        } else {
            let hashPassword = donor.account.user_password;
            bcrypt.compare(password, hashPassword, async (err, userPassword) => {
                if (err) console.error(err);
                if (userPassword) {
                    const token = jwt.sign({ userId: donor.account.id }, config.secret);
                    res.json({
                        status: 'success',
                        reason: 'Signing in to account',
                        token,
                        auth: true
                    })
                } else {
                    res.json({
                        status: 'failure',
                        reason: 'Password incorrect',
                        auth: false
                    })
                }
            });
        };
    };

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
        };
    };

    const geBins = async (req, res) => {
        let bins = await binModel.getAllBinTypes();
        res.json({
            status: 'success',
            bins
        });
    };

    const sendPickUpRequest = async (req, res) => {
        const { userId, binId } = req.body;
        let searchQuery = {
            userId,
            binId
        };
        await binModel.setBinForCollection(searchQuery);
    };

    const getSentRequests = async (req, res) => {
        const { userId } = req.body;
        let bins = await binModel.getBinsReadyForCollection(userId);
        res.json({
            status: "success",
            bins
        })
    }

    return {
        donorSignUp,
        donorSignIn,
        verifyToken,
        geBins,
        sendPickUpRequest,
        getSentRequests
    }
}