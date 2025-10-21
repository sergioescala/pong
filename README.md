# AI vs AI Pong

This project is a self-playing Pong game where two AI players compete against each other. The game is built with vanilla HTML, CSS, and JavaScript, and is designed to be published on GitHub Pages. It features a modern-retro aesthetic with responsive design, making it playable on both desktop and mobile devices.

## Features

*   **AI vs AI Gameplay**: Watch two AI players battle it out in a classic game of Pong.
*   **Selectable AI Difficulty**: Independently set the difficulty ('Easy', 'Medium', 'Hard') for each AI player before the game starts.
*   **Responsive Design**: The game's layout is fully responsive and works on mobile devices without appearing cropped.
*   **Pre-Game Setup Screen**: A setup screen allows you to configure the AI difficulty before starting the game.
*   **Game Over and Restart**: The game ends when a player reaches 20 points, and a new game automatically begins after a 10-second countdown.
*   **Modern-Retro Aesthetic**: The game uses the 'Press Start 2P' font and a clean, minimalist design to create a modern-retro feel.

## How to Play

1.  **Open the Game**: Open the `index.html` file in your web browser.
2.  **Select AI Difficulty**: On the setup screen, choose the difficulty level for each AI player from the dropdown menus.
3.  **Start the Game**: Click the 'Start Game' button to begin the match.
4.  **Watch the Match**: The game will play out automatically. The first player to reach 20 points wins.
5.  **Game Over**: After a player wins, a 'Game Over' message is displayed, and a new game will start after a 10-second countdown.

## Setup for Developers

To run the game locally, follow these simple steps:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```
2.  **Navigate to the Directory**:
    ```bash
    cd your-repository
    ```
3.  **Open the Game**: Open the `index.html` file in your web browser. No local server is required.

## Technology Stack

*   **HTML**: The structure of the game is built with semantic HTML5.
*   **CSS**: The game is styled with vanilla CSS, using Flexbox for layout and a responsive design approach.
*   **JavaScript**: The entire game logic, including the AI, is written in vanilla JavaScript.

## Code Structure

The project is organized into three main files:

*   **`index.html`**: This file contains the basic structure of the game, including the setup screen, the game canvas, and the footer.
*   **`style.css`**: This file handles all the styling for the game, including the modern-retro aesthetic, responsive design, and animations.
*   **`script.js`**: This is the core of the project, containing all the game logic:
    *   **Game Setup**: Initializes the canvas, sets the dimensions, and handles the pre-game setup screen.
    *   **Game Loop**: The main game loop updates the game state and re-renders the canvas on each frame.
    *   **AI Logic**: The AI for the paddles is implemented with adjustable difficulty settings, including factors for speed, error, and strategy.
    *   **Collision Detection**: Handles the collision of the ball with the paddles and the walls.
    *   **Scoring and Game Over**: Manages the score and the game-over condition.

## Screenshots

*A screenshot of the setup screen would go here.*

*A screenshot of the gameplay in action would go here.*

*A screenshot of the "Game Over" screen would go here.*

## Known Issues / Future Improvements

*   There are currently no known issues.
*   Future improvements could include:
    *   Adding more difficulty levels.
    *   Implementing different game modes.
    *   Adding sound effects.
