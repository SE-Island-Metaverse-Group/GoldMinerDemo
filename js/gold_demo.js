var ctx = document.getElementById('gold').getContext('2d');

var bg = new Image();
bg.src = "Pic/bg.png";
var goldImg = new Image();
goldImg.src = "Pic/Au.png";
var fingerImg = new Image();
fingerImg.src = "Pic/finger.png";

var interval;

// Window
var width = window.innerWidth;
var height = window.innerHeight - 10;
const FINGER_RENDER_SIZE = Math.floor(Math.sqrt(0.00164 * width * height));

// Golds
const GOLD_NUM = 12;
var golds = [];

// Game
var Score;

function render() {
    ctx.clearRect(0, 0, width, height);
    fingerUpdate();
    drawBackground();
    drawGold();
    drawFinger();
    displayScore();
    // If win
    if(golds.length == 0) {
        clearInterval(interval);
        ctx.font = Math.floor(0.1489 * height) + 'px Consolas';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("CLEAR", width * 0.5, height * 0.5);
        setTimeout(startGame, 2000);
    }
}

function drawBackground() {
    ctx.drawImage(bg, 0, 0, width, height);
}

function drawGold() {
    for(let i = 0; i < golds.length; ++i) {
        // Rotate
        ctx.translate(golds[i].x + 0.5 * golds[i].scale, golds[i].y + 0.5 * golds[i].scale);
        ctx.rotate(golds[i].rotate);
        // Draw
        ctx.drawImage(goldImg, -0.5 * golds[i].scale, -0.5 * golds[i].scale, golds[i].scale, golds[i].scale);
        // Recover
        ctx.rotate(-golds[i].rotate);
        ctx.translate(-golds[i].x - 0.5 * golds[i].scale, -golds[i].y - 0.5 * golds[i].scale);
    }
}

function drawFinger() {
    // Finger
    let _angular = Math.sin(FINGER_ANGULAR_VELOCITY*DEGREE*Finger.t) * Math.PI * 0.5;
    ctx.translate(Finger.headX, Finger.headY);
    ctx.rotate(-_angular);
    ctx.drawImage(fingerImg, -0.5 * FINGER_RENDER_SIZE, -0.5 * FINGER_RENDER_SIZE, FINGER_RENDER_SIZE, FINGER_RENDER_SIZE);
    ctx.rotate(_angular);
    ctx.translate(-Finger.headX, -Finger.headY);
    // Line
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(Finger.x, Finger.y);
    ctx.lineTo(Finger.headX, Finger.headY);
    ctx.stroke();
}

function displayScore() {
    ctx.font = Math.floor(0.0425 * height) + 'px Consolas';
    // ctx.textAlign = 'center';
    ctx.fillText("Score:" + Score, width * 0.02, height * 0.05);
}

function startGame() {
    clearInterval(interval);
    fingerInit(width * 0.5, height * 0.15, distance(width * 0.5, height * 0.15, width, height) * 0.9);
    golds = generateGold(0, height * 0.2, width, height * 0.8, GOLD_NUM);
    interval = setInterval(render, 30);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
}

// Main?
document.getElementById('gold').setAttribute('width', width);
document.getElementById('gold').setAttribute('height', height);
// Get start
Score = 0;
startGame();