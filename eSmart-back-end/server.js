const express = require("express");
const app = express();
const socket = require("socket.io");
require("colors");
const cors = require("cors")
const pg = require("pg");
const { urlencoded, json } = require('body-parser');
const { notificationMananger } = require("./services/NotificationMananger");
const DonorRoutes = require("./services/routes/DonorRoutes");
const DonorApi = require("./services/api/DonorApi");
const Donor = require("./services/models/Donor");
const Collector = require("./services/models/Collector");
const CollectorRoutes = require("./services/routes/CollectorRoutes");
const CollectorApi = require("./services/api/CollectorApi");
const Bins = require("./services/models/Bins");




const { Pool } = pg;
let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
};

const connectionString = process.env.DATABASE_URL || "postgresql://pgadmin:pg123@localhost:5432/e_smart";
const pool = new Pool({
  connectionString,
  ssl: useSSL
});



app.use(express());

const port = 8000;

app.use(cors());
app.use(urlencoded({ extended: false }))
app.use(json());

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)} `
      .green
  )
);

const io = socket(server);
notificationMananger(io);
const binModel = Bins(pool);
const donorModel = Donor(pool);
const collectorModel = Collector(pool);
const donorApi = DonorApi(donorModel, binModel);
const collectorApi = CollectorApi(collectorModel, donorModel, binModel);
DonorRoutes(app, donorApi);
CollectorRoutes(app, collectorApi);


// //initializing the socket io connection 
// io.on("connection", (socket) => {
//   console.log('new user');
//   socket.on("notifications", (data) => {
//     console.log(data);
//   })

//   //for a new user joining the room
//   socket.on("joinRoom", ({ username, roomname }) => {
//     //* create user
//     const p_user = join_User(socket.id, username, roomname);
//     console.log(socket.id, "=id");
//     socket.join(p_user.room);

//     //display a welcome message to the user who have joined a room
//     socket.emit("message", {
//       userId: p_user.id,
//       username: p_user.username,
//       text: `Welcome ${p_user.username}`,
//     });

//     //displays a joined room message to all other room users except that particular user
//     socket.broadcast.to(p_user.room).emit("message", {
//       userId: p_user.id,
//       username: p_user.username,
//       text: `${p_user.username} has joined the chat`,
//     });
//   });

//   //user sending message
//   socket.on("chat", (text) => {
//     //gets the room user and the message sent
//     console.log(text + ' text message');
//     const p_user = get_Current_User(socket.id);

//     io.to(p_user.room).emit("message", {
//       userId: p_user.id,
//       username: p_user.username,
//       text: text,
//     });
//   });

//   //when the user exits the room
//   socket.on("disconnect", () => {
//     console.log('user left');
//     //the user is deleted from array of users and a left room message displayed
//     const p_user = user_Disconnect(socket.id);

//     if (p_user) {
//       io.to(p_user.room).emit("message", {
//         userId: p_user.id,
//         username: p_user.username,
//         text: `${p_user.username} has left the chat`,
//       });
//     }
//   });
// });

module.exports = {
  pool
};