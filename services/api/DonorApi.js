const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

module.exports = (donorModel, binModel) => {

    const donorSignUp = async(req, res) => {
        const { firstName, lastName, phoneNumber, password } = req.body;
        bcrypt.hash(password, 10, async(err, hashedPassword) => {
            if (err) console.error(err);
            const account = {
                firstName: firstName,
                lastName: lastName,
                cellNumber: phoneNumber,
                email: '',
                residentialAddress: '',
                idNumber: 0,
                gender: '',
                age: 0,
                password: hashedPassword,
                verification: false,
            }
            let results = await donorModel.createAccount(account);
            if (results.response === false) {
                res.json({
                    status: 'failure',
                    reason: 'Account already exists',
                    isCreated: false
                })
            } else {
                res.json({
                    status: 'success',
                    reason: 'Created account',
                    isCreated: true
                });
            }
        });
    }

    const donorSignIn = async(req, res) => {
        const { phone, password } = req.body;
        console.log(req.body);
        let donor = await donorModel.findAccountByPhoneNumber(phone);
        if (donor.response === false) {
            res.json({
                status: "failure",
                reason: "Account not found",
                auth: false,

            });
        } else {
            let hashPassword = donor.account.user_password;
            bcrypt.compare(password, hashPassword, async(err, userPassword) => {
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
                        reason: 'Password or phone number is incorrect',
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

    const geBins = async(req, res) => {
        const { uid } = req.body;
        let bins = await binModel.getAllBinTypes();
        let account = await donorModel.findAccountById(uid);;

        res.json({
            status: 'success',
            bins,
            account
        });
    };

    const sendPickUpRequest = async(req, res) => {
        const { userId, binId } = req.body;
        let searchQuery = {
            userId,
            binId
        };
        let results = await binModel.setBinForCollection(searchQuery);
        if (results.response) {
            res.json({
                status: 'success',
                isSent: true
            });
        }

    };

    const getSentRequests = async(req, res) => {
        const { userId } = req.body;
        let bins = await binModel.getBinsReadyForCollection(userId);
        res.json({
            status: "success",
            bins
        })
    }

    const getNotifications = async(req, res) => {
        const { donorId } = req.body;
        const notifications = await binModel.getNotificationsForCollectionInProgressForDonor(donorId);
        if (notifications.length !== 0) {
            res.json({
                status: 200,
                notifications,
                isAvailable: true
            });
        } else {
            res.json({
                status: 200,
                isAvailable: false
            });
        }
    }

    const addUserAddress = async(req,res) => {
        const {address, donorId} = req.body;
        console.log(req.body);
        const isAdded = await donorModel.updateAddress(donorId, address);
        if (isAdded.response) {
            res.json({
                status:200,
                isAdded
            });
        }else { 
            res.json({
                status:200,
                isAdded
            });
        }
     }

    return {
        donorSignUp,
        donorSignIn,
        verifyToken,
        geBins,
        sendPickUpRequest,
        getSentRequests,
        getNotifications,
        addUserAddress
    }
}