var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 180;
context.canvas.width = 320;

rectangle = {
  height: 32,
  jumping: true,
  width: 32,
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
  rectangle.yVelocity += 1.5; //gravity
  rectangle.x += rectangle.xVelocity;
  rectangle.y += rectangle.yVelocity;
  rectangle.xVelocity *= 0.9; // friction
  rectangle.yVelocity *= 0.9; // friction

  // if rectangle is falling below floor line
  if (rectangle.y > 180 - 16 - 32) {
    rectangle.jumping = false;
    rectangle.y = 180 - 16 - 32;
    rectangle.yVelocity = 0;
  }
  //if the rectangle is going off the left of the screen
  if (rectangle.x < -32) {
    rectangle.x = 320;
  } else if (rectangle.x > 320) {
    // if rectangle goes past the right boundary
    rectangle.x = -32;
  }

  context.fillStyle = "#202020";
  context.fillRect(0, 0, 320, 180); //x, y, width, height
  context.fillStyle = "#ff0000"; // red
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(320, 164);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
