const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let paddleWidth, paddleHeight, ballSize, ballSpeedX, ballSpeedY;
let leftPaddleY, rightPaddleY, ballX, ballY;
let leftScore = 0;
let rightScore = 0;

function setDimensions() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    paddleWidth = 10;
    paddleHeight = canvas.height * 0.15; // Paddle height is 15% of canvas height
    ballSize = 10;
    ballSpeedX = canvas.width * 0.007; // Ball speed scales with width
    ballSpeedY = canvas.height * 0.007; // Ball speed scales with height

    leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    rightPaddleY = canvas.height / 2 - paddleHeight / 2;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

window.addEventListener('resize', setDimensions);
window.addEventListener('load', () => {
    setDimensions();
    gameLoop();
});

function draw() {
    // Clear the canvas
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = '#fff';
    context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    context.beginPath();
    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    context.fill();

    // Draw scores
    context.font = '30px Arial';
    context.fillText(leftScore, canvas.width / 4, 50);
    context.fillText(rightScore, canvas.width * 3 / 4, 50);
}

let gameOver = false;
let countdown = 10;

function update() {
    if (gameOver) {
        return;
    }

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom walls
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
        (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
        (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Score points
    if (ballX - ballSize < 0) {
        rightScore++;
        checkWin();
        resetBall();
    } else if (ballX + ballSize > canvas.width) {
        leftScore++;
        checkWin();
        resetBall();
    }

    // AI for paddles
    const paddleMaxSpeed = 7;
    // Left Paddle AI
    const leftPaddleCenter = leftPaddleY + paddleHeight / 2;
    let leftPaddleSpeed = (ballY - leftPaddleCenter) * 0.1;
    if (Math.abs(leftPaddleSpeed) > paddleMaxSpeed) {
        leftPaddleSpeed = paddleMaxSpeed * Math.sign(leftPaddleSpeed);
    }
    leftPaddleY += leftPaddleSpeed;

    // Right Paddle AI
    const rightPaddleCenter = rightPaddleY + paddleHeight / 2;
    let rightPaddleSpeed = (ballY - rightPaddleCenter) * 0.1;
    if (Math.abs(rightPaddleSpeed) > paddleMaxSpeed) {
        rightPaddleSpeed = paddleMaxSpeed * Math.sign(rightPaddleSpeed);
    }
    rightPaddleY += rightPaddleSpeed;
}

function checkWin() {
    if (leftScore === 20 || rightScore === 20) {
        gameOver = true;
        startCountdown();
    }
}

function startCountdown() {
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    leftScore = 0;
    rightScore = 0;
    gameOver = false;
    countdown = 10;
    resetBall();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function gameLoop() {
    update();
    draw();

    if (gameOver) {
        context.fillStyle = '#fff';
        context.font = '50px Arial';
        context.fillText('Game Over', canvas.width / 2 - 150, canvas.height / 2);
        context.font = '30px Arial';
        context.fillText(`Restarting in ${countdown}...`, canvas.width / 2 - 150, canvas.height / 2 + 50);
    }

    requestAnimationFrame(gameLoop);
}
