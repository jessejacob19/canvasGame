var context, controller, rectangle, loop;

const gravity = 1.5;
const friction = 0.9;
const canvasHeight = 700;
const canvasWidth = 1400;
const rectangleWidth = 32;
const rectangleHeight = 32;
const lineWidth = 4;
const center = 144;
const middle = 164;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = canvasHeight;
context.canvas.width = canvasWidth;

rectangle = {
  // dimensions and state of rectangle
  height: rectangleHeight,
  jumping: true,
  width: rectangleWidth,
  x: center,
  xVelocity: 0,
  y: 0,
  yVelocity: 0
};

controller = {
  left: false,
  right: false,
  up: false,

  keyListener: function(event) {
    var keyState = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37: //left key
        controller.left = keyState;
        break;
      case 38: // up key
        controller.up = keyState;
        break;
      case 39: //right key
        controller.right = keyState;
        break;
    }
  }
};

loop = function() {
  if (controller.up && rectangle.jumping == false) {
    rectangle.yVelocity -= 30;
    rectangle.jumping = true;
  }

  if (controller.left) {
    rectangle.xVelocity -= 1;
  }

  if (controller.right) {
    rectangle.xVelocity += 1;
  }
  rectangle.yVelocity += gravity;
  rectangle.x += rectangle.xVelocity;
  rectangle.y += rectangle.yVelocity;
  rectangle.xVelocity *= friction;
  rectangle.yVelocity *= friction;

  // if rectangle is falling below floor line
  //need to make a function that
  if (rectangle.y > canvasHeight - 16 - 32) {
    rectangle.jumping = false;
    rectangle.y = canvasHeight - 16 - 32;
    rectangle.yVelocity = 0;
  }
  //if the rectangle is going off the left of the screen
  if (rectangle.x < -32) {
    rectangle.x = canvasWidth;
  } else if (rectangle.x > canvasWidth) {
    // if rectangle goes past the right boundary
    rectangle.x = -32;
  }

  context.fillStyle = "#202020";
  context.fillRect(0, 0, canvasWidth, canvasHeight); //x, y, width, height
  context.fillStyle = "#ff0000"; // red
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(0, middle);
  context.lineTo(canvasWidth, middle);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
