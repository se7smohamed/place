var socket = io("http://localhost:3000/");
let canvasState = [];
let state = { color: "#fff" };
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let scale = 15;
dx = window.innerWidth;
dy = window.innerHeight;
canvas.width = dx;
canvas.height = dy;
let lastMouse = { x: 0, y: 0, bg: "#000" };
let lastHover = false;
let color = "#fff";

let changeColor = c => {
  color = c;
};
let main = () => {
  // clear
  ctx.fillStyle = "#001";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  // fill from array
  canvasState.forEach((x, xi) => {
    if (!x) return 1;
    x.forEach((y, yi) => {
      if (!y) return 1;
      ctx.fillStyle = y;
      ctx.fillRect(xi, yi, scale, scale);
    });
  });
  if (lastHover) {
    hoverHandler(lastHover);
  }
};

let rescale = value => Math.floor(value / scale) * scale;

let hoverHandler = event => {
  lastHover = event;
  let target = handler(event);
  ctx.fillStyle = target.color;
  ctx.fillRect(target.x, target.y, scale, scale);
};
let handler = event => {
  let { clientX, clientY } = event;
  let x = rescale(clientX),
    y = rescale(clientY);
  let target = {
    x,
    y,
    color
  };
  return target;
};

let clickHandler = event => {
  let target = handler(event);

  canvasState[target.x] = canvasState[target.x] || [];
  canvasState[target.x][target.y] = target.color;

  ctx.fillStyle = target.color;
  ctx.fillRect(target.x, target.y, scale, scale);

  socket.emit("click", { x: target.x, y: target.y, color: target.color });
};

socket.on("canvasState", data => {
  canvasState = data || [];
});

socket.on("clickGet", data => (canvasState = data || []));

canvas.addEventListener("click", clickHandler);
canvas.addEventListener("mousemove", hoverHandler);

setInterval(main, 60**-1);