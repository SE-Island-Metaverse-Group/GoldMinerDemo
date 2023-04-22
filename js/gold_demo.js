var ctx = document.getElementById('gold').getContext('2d');

var img = new Image();
img.src = "Pic/Au.png";
img.onload = function() {
    console.log("Pic/Au.png has been loaded!");
}
var goldImg = new Image();
goldImg.src = "Pic/Au.png";
var fingerImg = new Image();
fingerImg.src = "Pic/finger.png";

var interval;

// Window
var width = window.innerWidth;
var height = window.innerHeight - 50;

// Golds
const GOLD_NUM = 12;
var golds = [];

// Game
var Score;

function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    fingerUpdate();
    drawGold();
    drawFinger();
    displayScore();
    // If win
    if(golds.length == 0) {
        clearInterval(interval);
        ctx.font = '112px Consolas';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("CLEAR", width * 0.5, height * 0.5);
        setTimeout(startGame, 2000);
    }
}

function drawGold() {
    for(let i = 0; i < golds.length; ++i) {
        ctx.drawImage(img, golds[i].x, golds[i].y, golds[i].scale, golds[i].scale);
    }
}

function drawFinger() {
    ctx.drawImage(fingerImg, Finger.headX - 16, Finger.headY - 16, 32, 32);
    if (Finger.state == FINGER_STATUS.IDLING) {
        let direction = fingerDirection();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(Finger.x, Finger.y);
        ctx.lineTo(Finger.x + direction.x * 40, Finger.y + direction.y * 40);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(Finger.x, Finger.y);
        ctx.lineTo(Finger.headX, Finger.headY);
        ctx.stroke();
    }
}

function displayScore() {
    ctx.font = '32px Consolas';
    // ctx.textAlign = 'center';
    ctx.fillText("Score:" + Score, width * 0.02, height * 0.05);
}

function startGame() {
    clearInterval(interval);
    fingerInit(width * 0.5, height * 0.15, distance(width * 0.5, height * 0.15, width, height) * 0.9);
    golds = generateGold(0, height * 0.15, width, height * 0.85, GOLD_NUM);
    interval = setInterval(render, 30);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
}

// Main?
console.log(width);
console.log(height);
document.getElementById('gold').setAttribute('width', width);
document.getElementById('gold').setAttribute('height', height);
// Get start
Score = 0;
startGame();