module.exports = (app, donorApi) => {
    app.post('/create/donor/account', donorApi.donorSignUp);
    app.post('/donor/signin', donorApi.donorSignIn);
    app.post('/verify/donor', donorApi.verifyToken);
    app.post('/donor/home', donorApi.geBins);
    app.post('/donor/send/request', donorApi.sendPickUpRequest);
    app.post('/donor/get/requests', donorApi.getSentRequests)
};