// Get Game canvas
var gameCanvas = document.getElementById("gameCanvas");
// Return a two dimensional drawing context
var ctx = gameCanvas.getContext("2d");

var currentPosition = { x: 50, y: 50 };
var gridSize = 10;

// initial direction
var direction = "down"
setInterval(moveSnake,100)

// continuous movement
function moveSnake(){
  switch(direction){
    // left
    case 'left':
      currentPosition.x -= gridSize;
      drawSnake();
      break;
    // up
    case 'up':
      currentPosition.y -= gridSize;
      drawSnake();
      break;
    // right
    case 'right':
      currentPosition.x += gridSize;
      drawSnake();
      break;
    // down
    case 'down':
      currentPosition.y += gridSize;
      drawSnake();
      break;
  }
}

// Check key hit
document.onkeydown = function(e) {
  var keyCode = e.keyCode;

  switch (keyCode) {
    // left
    case 37:
      currentPosition.x -= gridSize;
      drawSnake();
      console.log(keyCode);
      break;
    // up
    case 38:
      currentPosition.y -= gridSize;
      drawSnake();
      console.log(keyCode);
      break;
    // right
    case 39:
      currentPosition.x += gridSize;
      drawSnake();

      console.log(keyCode);
      break;
    // down
    case 40:
      currentPosition.y += gridSize;
      drawSnake();
      console.log(keyCode);
      break;
  }
};

function drawSnake() {
  ctx.fillRect(currentPosition.x, currentPosition.y, gridSize, gridSize);
}

ctx.fillStyle = "rgb(200,0,0)";
ctx.fillRect(currentPosition.x, currentPosition.y, gridSize, gridSize);

// // Start Horizontal velocity / Vertical Velocity
// let dx = 10;
// let dy = 0;

// advanceSnake()
// dx = 0
// dy = -10

// advanceSnake()

// drawSnake()

// function advanceSnake(){
//   const head = {x:snake[0].x+dx, y:snake[0].y + dy}
//   snake.unshift(head);
//   snake.pop();
// }

// function drawSnakePart(snakePart) {
//   ctx.fillStyle = "lightgreen";
//   ctx.strokestyle = "darkgreen";
//   ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
//   ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
// }

// function drawSnake() {
//   snake.forEach(drawSnakePart);
// }
