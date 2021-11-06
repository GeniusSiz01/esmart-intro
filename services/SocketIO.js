module.exports = (io) => {

    io.on("connection", async socket => {

        socket.on('notifications', () => {
            console.log('accessing notifications');
        });

        socket.on("disconnect", () => {
            console.log('user left');
        });
    });
}