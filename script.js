// Get Game canvas
var canvas = document.getElementById("gameCanvas");
// Return a two dimensional drawing context
var ctx = gameCanvas.getContext("2d");

var currentPosition = { x: 50, y: 50 };
var gridSize = 10;
var snakeBody = []
// initial direction
var direction = "right";
setInterval(moveSnake, 100);

// continuous movement
function moveSnake() {
  switch (direction) {
    // left
    case "left":
      if(currentPosition["x"]>0){
        currentPosition["x"] -= gridSize;
        drawSnake()
        console.log(currentPosition)
        break;
      }
      break;

    // up
    case "up":
      if (currentPosition["y"]>0){
        currentPosition["y"] -= gridSize;
        drawSnake()
        break;
      }
      break;

    // right
    case "right":
      if (currentPosition["x"]<canvas.width-gridSize){
        currentPosition["x"] += gridSize;
        drawSnake()
        console.log(currentPosition)
        break;
      }
      break;
    // down
    case "down":
      if (currentPosition["y"]<canvas.height-gridSize){
        currentPosition["y"] += gridSize;
        drawSnake()
        console.log(currentPosition)
        break;
      }
      break;
  }
}

// Check key hit
document.onkeydown = function(e) {
  var keyCode = e.keyCode;

  switch (keyCode) {
    // left
    case 37:
      currentPosition["x"] -= gridSize;
      direction ='left'
      drawSnake()
      break;
    // up
    case 38:
      currentPosition["y"] -= gridSize;
      direction ='up'
      drawSnake()
      break;
    // right
    case 39:
      currentPosition["x"] += gridSize;
      direction ='right'
      drawSnake()
      break;
    // down
    case 40:
      currentPosition["y"] += gridSize;
      direction ='down'
      drawSnake()
      break;
  }
};


ctx.fillStyle = "rgb(200,0,0)";
function drawSnake() {
  snakeBody.push([currentPosition['x'], currentPosition['y']])
  ctx.fillRect(currentPosition["x"], currentPosition["y"], gridSize, gridSize);
  if (snakeBody.length>3){
    var itemToRemove = snakeBody.shift()
    ctx.clearRect(itemToRemove[0], itemToRemove[1],gridSize,gridSize)
  }
}

