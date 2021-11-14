const notificationMananger = (io) => {
    io.on("connection", socket => {
        console.log("new user joined");
        socket.on("notifications", (data) => {
            console.log(data);
        });
    });
}

module.exports = {
    notificationMananger
}