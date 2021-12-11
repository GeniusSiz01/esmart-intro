module.exports = (app, collectorApi) => {
    app.post('/create/collector/account', collectorApi.collectorSignUp);
    app.post('/collector/signin', collectorApi.collectorSignIn);
    app.post('/bins/full', collectorApi.getRequests);
    app.post('/collect', collectorApi.handlePickUpBins);
    app.post('/accept/request', collectorApi.collectDonorFullBins);
    app.post('/verify/collector/token', collectorApi.verifyToken);
    app.post('/collector/notifications', collectorApi.getNotifications);
    app.post('/end/trip', collectorApi.endTrip);
};