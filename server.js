const server = require("http").createServer();
const io = require("socket.io")(server);

// holds current canvas state
let globalState = [];

// draw a random shape
for (let i = 0; i < 100; i++) {
  let x = Math.floor(Math.floor(Math.random() * 10) * 30) + 30;
  let y = Math.floor(Math.floor(Math.random() * 10) * 30) + 30;
  globalState[x] = globalState[x] || [];
  globalState[x][y] = "#123";
}

io.on("connection", client => {
  // send current state to each new connection
  client.emit("canvasState", globalState);

  client.on("click", data => {
    // recieved a new click, update state and notify other users
    globalState[data.x] = globalState[data.x] || [];
    globalState[data.x][data.y] = data.color;
    io.emit("clickGet", globalState);
  });
});

let PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}.`);
});