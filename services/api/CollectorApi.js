const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const _ = require('lodash');

module.exports = (collectorModel, donorModel, binModel) => {
    const collectorSignUp = async(req, res) => {
        const { firstName, lastName, phoneNumber, password } = req.body;
        bcrypt.hash(password, 10, async(err, hashedPassword) => {
            if (err) console.error(err);
            const account = {
                firstName: firstName,
                lastName: lastName,
                cellNumber: phoneNumber,
                email: '',
                location: '',
                idNumber: 0,
                gender: '',
                age: 0,
                password: hashedPassword,
                verification: false,
                vehicleRegNo: ''
            }
            let results = await collectorModel.createAccount(account);
            if (!results.response) {
                res.json({
                    status: 'failure',
                    reason: 'Account already exists',
                    isCreated: false
                })
            } else {
                res.json({
                    status: 'success',
                    reason: 'Account was created',
                    isCreated: true
                });
            }
        });
    }

    const collectorSignIn = async(req, res) => {
        const { phone, password } = req.body;
        console.log(req.body);
        let collector = await collectorModel.findAccountByPhoneNumber(phone);
        if (!collector.response) {
            res.json({
                status: "failure",
                reason: "Account not found",
                auth: false,
                
            });
        } else {
            let hashPassword = collector.account.user_password;
            bcrypt.compare(password, hashPassword, async(err, userPassword) => {
                if (err) console.error(err);
                if (userPassword) {
                    const token = jwt.sign({ userId: collector.account.id }, config.secret);

                    res.json({
                        status: 'success',
                        reason: 'Signing in to account',
                        token,
                        auth: true
                    });
                } else {
                    res.json({
                        status: 'failure',
                        reason: 'Password or phone number is incorrect',
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
        };
    };

    const getRequests = async(req, res) => {
        const { id } = req.body;
        let collector = await collectorModel.findAccountById(id);
        let bins = await collectorModel.collectFullBins();
        if (bins.length !== 0) {
            let out = _.groupBy(bins, 'waste_donor_id');
            let newArray = [];
            const keys = Object.keys(out);

            for (let x = 0; x < keys.length; x++) {
                const donorsId = Number(keys[x]);
                let getAccounts = await donorModel.findAccountById(donorsId);
                newArray.push(getAccounts);
            }
            res.json({
                status: 200,
                readyBins: newArray,
                collector: collector,
                isEmpty: false
            });
        } else {
            res.json({
                status: 200,
                isEmpty: true
            })
        }
    }

    const handlePickUpBins = async(req, res) => {
        let { donorId, collectorId, binTypeId } = req.body;
        console.log(binTypeId);
        const bins = Array.isArray(binTypeId) ? binTypeId : [binTypeId];
        for (let x = 0; x < bins.length; x++) {
            const binId = bins[x].id;
            let request = {
                    dateTime: new Date(),
                    donor: donorId,
                    collector: collectorId,
                    wasteBins: binId,
                    status: true
                }
                // console.log(request);
            await binModel.binActivity(request);
        }
    }

    const collectDonorFullBins = async(req, res) => {
        let { donorId } = req.body;
        let getBins = await binModel.getBinsReadyForCollection(donorId);
        res.json({
            bins: getBins
        });
    }

    const getNotifications = async(req, res) => {
        const { collectorId } = req.body;
        let notifications = await binModel.getNotificationsForCollectionInProgressForCollector(collectorId);
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

    const endTrip = async (req,res) => { 
        const { cid } = req.body;
console.log(req.body);
        let status = await binModel.closePickUpRequest(cid);
        if (status.response) {
            res.json({
                status:200,
                isEnded: true,
            });
        }else{
            res.json({
                status:200,
                isEnded: false,
            });
        }

    }

    return {
        collectorSignUp,
        collectorSignIn,
        verifyToken,
        getRequests,
        handlePickUpBins,
        collectDonorFullBins,
        getNotifications,
        endTrip
    }
}