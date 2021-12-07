const notificationMananger = (io, binModel) => {
    io.on("connection", socket => {
        socket.on("notifications", async (data) => {
            const { collectorId } = data;
            let res = await binModel.getNotificationsForCollectionInProgressForCollector(collectorId);
            console.log(res);
            socket.emit("");
        });

        socket.on("request", () => {
            console.log('request sent');
            socket.emit("get request");
        });

        socket.on("get request", () => {
            console.log("getting request");
            socket.emit("get current requests");
        })
    });
};

module.exports = {
    notificationMananger
};