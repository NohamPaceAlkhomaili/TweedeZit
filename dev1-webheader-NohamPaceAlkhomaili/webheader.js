"use strict";
import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

let width = context.canvas.width;
let height = context.canvas.height;
let carX = 10; 
let carSpeed = 0; 
let driving = false; 
const smokeTrails = []; 

setup();
animate();
drawCar(carX, height / 2 + 100); 

// Eventhandlers
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

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

    // Create smokeTrails
    smokeTrails.push({ x: carX + 15, y: height / 2 + 110, radius: Math.random() * 5 + 2 });

    if (carX > width) {
      carX = -120;
      drawCar(carX, height / 2 + 100);
    } else if (carX < -120) {
      carX = width;
      drawCar(carX, height / 2 + 100);
    }
  }
}


function updatesmokeTrails() {
  for (let i = smokeTrails.length - 1; i >= 0; i--) {
    smokeTrails[i].y -= 2; // Move smokeTrails upwards
    if (smokeTrails[i].y < 0) {
      smokeTrails.splice(i, 1); // This code removes the smoketrails that leave the canvas
    }
  }
}

function animate() {
  // Resets the background
  let gradient = context.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, Utils.rgb(255, 0, 0));
  gradient.addColorStop(1, Utils.rgb(0, 0, 0));

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  context.fillStyle = "white";
  context.fillText("Noham Pace", width / 2, height / 2 + 24);

  updatesmokeTrails();

  context.fillStyle = "rgba(255, 255, 255, 0.5)";
  for (const smokeTrail of smokeTrails) {
    context.beginPath();
    context.arc(smokeTrail.x, smokeTrail.y, smokeTrail.radius, 0, 2 * Math.PI);
    context.fill();
  }

  moveCar();
  drawCar(carX, height / 2 + 100);
  requestAnimationFrame(animate);
}

// This code moves the car right/left when key is pressed
function handleKeyDown(event) {
  if (event.key === "ArrowRight") {
    carSpeed = 2; 
    driving = true; 
  } else if (event.key === "ArrowLeft") {
    carSpeed = -2; 
    driving = true; 
  }
}

// This code stops the car from moving when the key is not pressed
function handleKeyUp(event) {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    carSpeed = 0; 
    driving = false; 
  }
}