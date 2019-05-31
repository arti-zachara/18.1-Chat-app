const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
// --------- requirements ---------------

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// --------- server listening ---------------
server.listen(3000, () => {
  console.log("listening on *:3000");
});
