// Get Game canvas
var canvas = document.getElementById("gameCanvas");
// Return a two dimensional drawing context
var ctx = gameCanvas.getContext("2d");

var currentPosition = { x: 50, y: 50 };
var gridSize = 10;
var snakeBody = [];
// initial direction
var direction = "right";
var snakeLength = 3;
var interval = setInterval(moveSnake, 100);
var score = 0;
drawFood();
var allowPressKeys = true;
var safety = false;

document.getElementById("play_menu").onclick = function() {
  pause();
  document.getElementById("pause_menu").style.display = "block";
  document.getElementById("play_menu").style.display = "none";
};
document.getElementById("pause_togglesafety").onclick = function() {
  if (safety) {
    safety = false;
    document.getElementById("pause_togglesafety").innerHTML = "Safify";
  } else {
    safety = true;
    document.getElementById("pause_togglesafety").innerHTML = "Unsafe";
  }
};
document.getElementById("pause_resume").onclick = function() {
  play();
  document.getElementById("pause_menu").style.display = "none";
  document.getElementById("play_menu").style.display = "block";
};
document.getElementById("pause_restart").onclick = function() {
  pause();
  snakeBody = [];
  snakeLength = 3;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  currentPosition = { x: 50, y: 50 };
  play();
  document.getElementById("pause_menu").style.display = "none";
  document.getElementById("play_menu").style.display = "block";
};

// Check if it on the border
function isborder() {
  if (snakeLength >= 3) {
    if (snakeBody[1][0] <= 0) {
      gameOver();
    } else if (snakeBody[1][1] <= 0) {
      gameOver();
    } else if (snakeBody[1][0] >= canvas.width - gridSize) {
      gameOver();
    } else if (snakeBody[1][1] >= canvas.height - gridSize) {
      gameOver();
    } else {
    }
  }
}
// continuous movement
function moveSnake() {
  switch (direction) {
    // left
    case "left":
      if (currentPosition["x"] > 0) {
        currentPosition["x"] -= gridSize;
        drawSnake();
        // console.log(currentPosition);
        break;
      }
      break;

    // up
    case "up":
      if (currentPosition["y"] > 0) {
        currentPosition["y"] -= gridSize;
        drawSnake();
        break;
      }
      break;

    // right
    case "right":
      if (currentPosition["x"] < canvas.width - gridSize) {
        currentPosition["x"] += gridSize;
        drawSnake();
        // console.log(currentPosition);
        break;
      }
      break;
    // down
    case "down":
      if (currentPosition["y"] < canvas.height - gridSize) {
        currentPosition["y"] += gridSize;
        drawSnake();
        // console.log(currentPosition);
        break;
      }
      break;
  }
}
// Check key hit
document.onkeydown = function(e) {
  if (!allowPressKeys) {
    return null;
  }
  var keyCode = e.keyCode;

  switch (keyCode) {
    // left
    case 37:
      if (direction != "right" && currentPosition["x"] > 0) {
        currentPosition["x"] -= gridSize;
        direction = "left";
        drawSnake();
        break;
      }
      break;
    // up
    case 38:
      if (direction != "down" && currentPosition["y"] > 0) {
        currentPosition["y"] -= gridSize;
        direction = "up";
        drawSnake();
        break;
      }
      break;

    // right
    case 39:
      if (
        direction != "left" &&
        currentPosition["x"] < canvas.width - gridSize
      ) {
        currentPosition["x"] += gridSize;
        direction = "right";
        drawSnake();
        break;
      }
      break;

    // down
    case 40:
      if (
        direction != "up" &&
        currentPosition["y"] < canvas.height - gridSize
      ) {
        currentPosition["y"] += gridSize;
        direction = "down";
        drawSnake();
        break;
      }
      break;
  }
};

function drawFood() {
  randomPoint = [
    Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
  ];
  // Check if snakebody has same point as drawfood
  if (snakeBody.some(hasPoint)) {
    drawFood();
  } else {
    ctx.fillStyle = "green";
    ctx.fillRect(randomPoint[0], randomPoint[1], gridSize, gridSize);
  }
}
function hasPoint(element) {
  return element[0] == randomPoint[0] && element[1] == randomPoint[1];
}

function hasEaten(element) {
  return (
    element[0] == currentPosition["x"] && element[1] == currentPosition["y"]
  );
}

function pause() {
  clearInterval(interval);
  allowPressKeys = false;
}

function play() {
  interval = setInterval(moveSnake, 100);
  allowPressKeys = true;
}

function gameOver() {
  pause();
  var score = (snakeLength - 3)*10
  alert("Game Over. Your score was " + score);
  snakeBody = [];
  snakeLength = 3;
  currentPosition = { x: 50, y: 50 };
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  play();
  score = 0;
}
// Update score
function updateScore(){
  var score = (snakeLength - 3)*10
  document.getElementById('score').innerText = score;
}
// Main function that setinterval calls
function drawSnake() {
  ctx.fillStyle = "rgb(200,0,0)";
  snakeBody.push([currentPosition["x"], currentPosition["y"]]);
  ctx.fillRect(currentPosition["x"], currentPosition["y"], gridSize, gridSize);
  if (snakeBody.length > snakeLength) {
    var itemToRemove = snakeBody.shift();
    ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
  }
  if (!safety) {
    isborder();
  }
  // Create snake tail which doesn't include the first element of the snake body
  snakeTail = [...snakeBody];
  snakeTail.pop();
  if (snakeTail.some(hasEaten)) {
    gameOver();
    return false;
  }
  console.log(snakeBody);
  if (
    currentPosition["x"] == randomPoint[0] &&
    currentPosition["y"] == randomPoint[1]
  ) {
    drawFood();
    snakeLength += 1;
  }
  updateScore()
}
