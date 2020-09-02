require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");

const knex = require("knex");
const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const rooms = {};

app.use(cors());
app.use(bodyParser.json({ extended: true, limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10000mb" }));
app.use(express.static("public"));
app.use((req, res, next) => {
  req.io = io;
  next();
});

routes(app);

io.on("connection", socket => {
  socket.on("join_room", roomID => {
      if (rooms[roomID]) {
          rooms[roomID].push(socket.id);
      } else {
          rooms[roomID] = [socket.id];
      }
      const otherUser = rooms[roomID].find(id => id !== socket.id);
      console.log(otherUser)
      if (otherUser) {
          socket.emit("other_user", otherUser);
          socket.to(otherUser).emit("user_joined", socket.id);
      }
  });

  socket.on("offer", payload => {
      io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", payload => {
      io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", incoming => {
      io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });
});

console.log(process.env.PORT);
server.listen(process.env.PORT);
