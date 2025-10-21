const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let paddleWidth, paddleHeight, ballSize, ballSpeedX, ballSpeedY;
let leftPaddleY, rightPaddleY, ballX, ballY;
let leftScore = 0;
let rightScore = 0;
let player1Difficulty, player2Difficulty;

function getDifficultySettings(difficulty) {
    switch (difficulty) {
        case 'easy':
            return { maxSpeed: 4, difficulty: 0.07, errorFactor: 0.6 };
        case 'medium':
            return { maxSpeed: 7, difficulty: 0.1, errorFactor: 0.3 };
        case 'hard':
            return { maxSpeed: 10, difficulty: 0.15, errorFactor: 0.1 };
    }
}

function setDimensions() {
    const aspectRatio = 4 / 3;
    const padding = 20;
    let newWidth = window.innerWidth - padding;
    let newHeight = window.innerHeight - padding;

    if (newWidth / newHeight > aspectRatio) {
        newWidth = newHeight * aspectRatio;
    } else {
        newHeight = newWidth / aspectRatio;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;

    paddleWidth = 10;
    paddleHeight = canvas.height * 0.15;
    ballSize = 10;
    ballSpeedX = canvas.width * 0.007;
    ballSpeedY = canvas.height * 0.007;

    leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    rightPaddleY = canvas.height / 2 - paddleHeight / 2;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

window.addEventListener('resize', setDimensions);
window.addEventListener('load', () => {
    setDimensions();
});

document.getElementById('startGame').addEventListener('click', () => {
    const player1Difficulty = document.getElementById('player1Difficulty').value;
    const player2Difficulty = document.getElementById('player2Difficulty').value;

    document.getElementById('setupScreen').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';

    setDimensions();
    startGame(player1Difficulty, player2Difficulty);
});

function startGame(p1Difficulty, p2Difficulty) {
    player1Difficulty = p1Difficulty;
    player2Difficulty = p2Difficulty;
    gameLoop();
}

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
    const scoreFontSize = canvas.width * 0.05;
    context.font = `${scoreFontSize}px Arial`;
    context.textAlign = 'center';
    context.fillText(leftScore, canvas.width / 4, scoreFontSize + 10);
    context.fillText(rightScore, canvas.width * 3 / 4, scoreFontSize + 10);
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
    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        const intersectY = (leftPaddleY + paddleHeight / 2) - ballY;
        const normalizedIntersectY = intersectY / (paddleHeight / 2);
        const bounceAngle = normalizedIntersectY * (Math.PI / 4);
        ballSpeedX = Math.abs(ballSpeedX);
        ballSpeedY = -Math.sin(bounceAngle) * (Math.abs(ballSpeedX) + Math.abs(ballSpeedY));
    }

    if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        const intersectY = (rightPaddleY + paddleHeight / 2) - ballY;
        const normalizedIntersectY = intersectY / (paddleHeight / 2);
        const bounceAngle = normalizedIntersectY * (Math.PI / 4);
        ballSpeedX = -Math.abs(ballSpeedX);
        ballSpeedY = -Math.sin(bounceAngle) * (Math.abs(ballSpeedX) + Math.abs(ballSpeedY));
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
    const leftPaddleSettings = getDifficultySettings(player1Difficulty);
    const rightPaddleSettings = getDifficultySettings(player2Difficulty);

    // Left Paddle AI
    let targetYLeft = ballY;
    if (Math.random() < leftPaddleSettings.errorFactor) { // Chance to try a trick shot
        targetYLeft = ballY + (Math.random() - 0.5) * paddleHeight;
    }
    const leftPaddleCenter = leftPaddleY + paddleHeight / 2;
    let leftPaddleSpeed = (targetYLeft - leftPaddleCenter) * leftPaddleSettings.difficulty;
    if (Math.abs(leftPaddleSpeed) > leftPaddleSettings.maxSpeed) {
        leftPaddleSpeed = leftPaddleSettings.maxSpeed * Math.sign(leftPaddleSpeed);
    }
    leftPaddleY += leftPaddleSpeed;

    // Right Paddle AI
    let targetYRight = ballY;
    if (Math.random() < rightPaddleSettings.errorFactor) { // Chance to try a trick shot
        targetYRight = ballY + (Math.random() - 0.5) * paddleHeight;
    }
    const rightPaddleCenter = rightPaddleY + paddleHeight / 2;
    let rightPaddleSpeed = (targetYRight - rightPaddleCenter) * rightPaddleSettings.difficulty;
    if (Math.abs(rightPaddleSpeed) > rightPaddleSettings.maxSpeed) {
        rightPaddleSpeed = rightPaddleSettings.maxSpeed * Math.sign(rightPaddleSpeed);
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
        const gameOverFontSize = canvas.width * 0.08;
        context.font = `${gameOverFontSize}px Arial`;
        context.textAlign = 'center';
        context.fillText('Game Over', canvas.width / 2, canvas.height / 2);

        const restartFontSize = canvas.width * 0.04;
        context.font = `${restartFontSize}px Arial`;
        context.fillText(`Restarting in ${countdown}...`, canvas.width / 2, canvas.height / 2 + gameOverFontSize);
    }

    requestAnimationFrame(gameLoop);
}
