// Game Variables
var rows = 2; // Initial number of rows
var cols = 2; // Initial number of columns
var maxTableSize = 300; // Fixed table width and height in pixels
var timer = 20; // Game duration in seconds
var correctClicks = 0;
var wrongClicks = 0;
var score = 0;
var multiplier = 1;
var lighterCell = "";
var maxWrongClicks = 6; // Maximum wrong selections allowed
var timerInterval;

// Initialize Game
function initializeGame() {
    resetGameVariables();
    createTable(rows, cols);
    startTimer();
}

// Reset Game Variables
function resetGameVariables() {
    rows = 2;
    cols = 2;
    timer = 20;
    correctClicks = 0;
    wrongClicks = 0;
    score = 0;
    multiplier = 1;
    updateStats();
    clearInterval(timerInterval); // Stop any running timer
}

// Generate Random Color
function generateRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Create a Dynamic Table
function createTable(rows, cols) {
    var gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear existing table

    var table = document.createElement("table");
    var cellWidth = maxTableSize / cols;
    var cellHeight = maxTableSize / rows;
    var randomRow = Math.floor(Math.random() * rows);
    var randomCol = Math.floor(Math.random() * cols);
    lighterCell = randomRow + "-" + randomCol;

    var tableColor = generateRandomColor();

    for (var row = 0; row < rows; row++) {
        var tableRow = document.createElement("tr");
        for (var col = 0; col < cols; col++) {
            var cell = document.createElement("td");
            cell.id = row + "-" + col;

            // Set dynamic cell size
            cell.style.width = cellWidth + "px";
            cell.style.height = cellHeight + "px";

            // Apply random color
            cell.style.backgroundColor = tableColor;

            if (cell.id === lighterCell) {
                cell.classList.add("lighter");
            }

            cell.addEventListener("click", function () {
                handleCellClick(this);
            });

            tableRow.appendChild(cell);
        }
        table.appendChild(tableRow);
    }
    gameContainer.appendChild(table);
}

// Handle Cell Click
function handleCellClick(cell) {
    if (cell.id === lighterCell) {
        correctClicks++;
        multiplier++;
        score += 10 * multiplier;

        // Increase rows and columns
        rows++;
        cols++;

        flashCell(cell, "correct");
        updateStats();
        createTable(rows, cols); // Generate a new table with updated rows and cols
    } else {
        wrongClicks++;
        multiplier = 1; // Reset multiplier
        flashCell(cell, "wrong");
        updateStats();
        if (wrongClicks >= maxWrongClicks) {
            endGame(); // End the game if wrong clicks exceed the limit
        }
    }
}

// Flash Cell for Feedback
function flashCell(cell, type) {
    cell.classList.add(type);
    setTimeout(() => cell.classList.remove(type), 300);
}

// Update Stats
function updateStats() {
    document.getElementById("current-score").innerText = score;
    document.getElementById("correct-clicks").innerText = correctClicks;
    document.getElementById("wrong-clicks").innerText = wrongClicks;
}

// Start Timer
function startTimer() {
    var timerElement = document.getElementById("timer");
    timerInterval = setInterval(function () {
        timer--;
        timerElement.innerText = "Time: " + timer + "s";
        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// End Game
function endGame() {
    clearInterval(timerInterval); // Stop the timer
    alert(`Game Over! \nScore: ${score}\nCorrect Clicks: ${correctClicks}\nWrong Clicks: ${wrongClicks}`);
    document.getElementById("game-container").innerHTML = "<h2>Game Over</h2>";
}

// Restart Game
function restartGame() {
    initializeGame();
}

// Start the Game
initializeGame();