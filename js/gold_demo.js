var ctx = document.getElementById('gold').getContext('2d');

// ======== < Load Resource > ========

var loadProgress = 0;
const MAX_LOAD_PROGRESS = 3;

var bg = new Image();
bg.src = "Pic/bg.png"
bg.onload = function() { ++loadProgress; }
var goldImg = new Image();
goldImg.src = "Pic/Au.png";
goldImg.onload = function() { ++loadProgress; }
var fingerImg = new Image();
fingerImg.src = "Pic/finger.png";
fingerImg.onload = function() { ++loadProgress; }

// Progress interval
var progressInterval;
// Render interval
var renderInterval;
// Update interval
var updateInterval;
// Clear all interval
function clearAllInterval() {
    clearInterval(renderInterval);
    clearInterval(updateInterval);
}

// Window
var width = window.innerWidth;
var height = window.innerHeight - 50;
document.getElementById('gold').setAttribute('width', width);
document.getElementById('gold').setAttribute('height', height);

// Golds
const GOLD_NUM = 12;
var golds = [];

// Game
var Score;
const FINGER_RENDER_SIZE = Math.floor(Math.sqrt(0.00164 * width * height));

function render() {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    drawGold();
    drawFinger();
    displayScore();
    // If win
    if(golds.length == 0) {
        clearAllInterval()
        ctx.font = Math.floor(0.2 * height) + 'px Consolas';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "#FFEA61";
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
    ctx.font = Math.floor(0.05 * height) + 'px Consolas';
    ctx.fillStyle = "#7E5709";
    ctx.fillText("Score:" + Score, width * 0.02, height * 0.05);
}

function startGame() {
    clearAllInterval()
    fingerInit(width * 0.5, height * 0.15, distance(width * 0.5, height * 0.15, width, height) * 0.9);
    golds = generateGold(0, height * 0.2, width, height * 0.8, GOLD_NUM);
    renderInterval = setInterval(render, 30);
    updateInterval = setInterval(fingerUpdate, 30);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
}

// Get start
Score = 0;
// Loading ...
progressInterval = setInterval(function() {
    const MARGIN = 3;
    ctx.fillStyle = "#C68017";
    ctx.fillRect(width * 0.31, height * 0.44, width * 0.38, height * 0.12);
    ctx.fillStyle = "#7E5709";
    ctx.fillRect(width * 0.32, height * 0.46, width * 0.36, height * 0.08);
    ctx.fillStyle = "#FFEA61";
    ctx.fillRect(width * 0.32 + MARGIN, height * 0.46 + MARGIN,
                 width * 0.36 * (loadProgress / MAX_LOAD_PROGRESS) - MARGIN * 2, height * 0.08 - MARGIN * 2);
    ctx.stroke();
    if (loadProgress >= MAX_LOAD_PROGRESS) {
        clearInterval(progressInterval);
        startGame();
    }
}, 30);