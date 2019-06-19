var context, controller, rectangle, loop;

const gravity = 1.5;
const friction = 0.9;
const canvasHeight = 180;
const canvasWidth = 320;
const rectangleWidth = 32;
const rectangleHeight = 32

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = canvasHeight;
context.canvas.width = canvasWidth;

rectangle = { // dimensions and state of rectangle
  height: rectangleHeight,
  jumping: true,
  width: rectangleWidth,
  x: 144,
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
    rectangle.yVelocity -= 20;
    rectangle.jumping = true;
  }

  if (controller.left) {
    rectangle.xVelocity -= 0.5;
  }

  if (controller.right) {
    rectangle.xVelocity += 0.5;
  }
  rectangle.yVelocity += gravity;
  rectangle.x += rectangle.xVelocity;
  rectangle.y += rectangle.yVelocity;
  rectangle.xVelocity *= friction;
  rectangle.yVelocity *= friction;

  // if rectangle is falling below floor line
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
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(canvasWidth, 164);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
