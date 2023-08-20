"use strict";
import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

let width = context.canvas.width;
let height = context.canvas.height;
let carX = 10; 
let carSpeed = 2; 
let driving = true; 

setup();
animate();
drawCar(10, 285);

// Setup code background + name
function setup() {
  context.textAlign = "center";
  context.font = "bold 48pt Arial";
  context.shadowColor = Utils.rgb(255, 0, 0);
  context.shadowBlur = 20;

  let gradient = context.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, Utils.rgb(255, 0, 0));
  gradient.addColorStop(1, Utils.rgb(0, 0, 0));

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.fillStyle = "white";
  context.fillText("Noham Pace", width / 2, height / 2 + 24);
}

function drawCar(x, y) {
  const carWidth = 120;
  const carHeight = 25;
  const spoilerHeight = 15;

  // This code draws the Road
  context.fillStyle = "#808080"; 
  context.fillRect(0, height / 2 + 110, width, 45);

  // This code draws the body
  context.fillStyle = "white";
  context.fillRect(x, y - carHeight, carWidth, carHeight);

  // This code draws the spoiler
  context.fillStyle = "black";
  context.fillRect(x + carWidth - 128, y - carHeight - spoilerHeight, 10, spoilerHeight);

  // This code draws the wheels
  const wheelRadius = 15;
  context.fillStyle = "black";
  context.beginPath();
  context.arc(x + 25, y, wheelRadius, 0, 2 * Math.PI);
  context.arc(x + 95, y, wheelRadius, 0, 2 * Math.PI);
  context.fill();

  // This code draws the the side skirts, front and rear bumpers
  context.fillStyle = "light blue"
  context.fillRect(x + 110, y ,10,5);
  context.fillRect(x, y ,20,5);
  context.fillRect(x + 40, y ,40,5);
  context.fillStyle = "#5a98f8"
  context.fillRect(x + 110, y - 20 ,10,5); // This code draws the front lights
  context.fillStyle = "red"
  context.fillRect(x , y - 20 ,6,5); // This code draws the rear lights

}

function moveCar() {
  if (driving) {
    carX += carSpeed;

    // This code draws a new car when the other leaves the canvas
    if (carX > width) {
      carX = -120; 
      drawCar(carX + 15, height / 2 + 100); 
    }
  }
}


function animate() {
  // This code resets the background
  let gradient = context.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, Utils.rgb(255, 0, 0));
  gradient.addColorStop(1, Utils.rgb(0, 0, 0));

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  context.fillStyle = "white";
  context.fillText("Noham Pace", width / 2, height / 2 + 24);

  // Moves the car
  moveCar();

  // Draws the new car at the starting point
  drawCar(carX + 15, height / 2 + 100);
  
  requestAnimationFrame(animate);
}