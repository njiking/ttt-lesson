let userTurn = true;
let message = document.querySelector('#message');
let playerXScore = localStorage.getItem('X');
let playerOScore = localStorage.getItem('O');
let playerXScoreElement = document.querySelector('#player-x-score');
let playerOScoreElement = document.querySelector('#player-o-score');
let randomNumber = Math.random() * 10;

function checkScore() {
    /*
     * When user loads the page for the first time
     * playerXScore value is null
     */
    if (!playerXScore && !playerOScore) {
        localStorage.setItem('X', 0);
        localStorage.setItem('O', 0);
        playerXScore = 0;
        playerOScore = 0;
    }
    playerXScoreElement.textContent = localStorage.getItem('X');
    playerOScoreElement.textContent = localStorage.getItem('O');
}
checkScore();

// Randomize each player's turn
if (randomNumber < 5.5) {
    userTurn = true;
    message.textContent = "Player X's Turn";
} else {
    userTurn = false;
    message.textContent = "Player O's Turn";
}

// Mark X or O in the selected cell
function markCell(event) {
    let input = event.target;

    if (userTurn === true) {
        input.value = 'X';
        input.disabled = true;
        userTurn = false;
    } else {
        input.value = 'O';
        input.disabled = true;
        userTurn = true;
    }
}

// The main logic of winning the game
function gameLogic() {
    // Array of id names of cells
    let cellIds = [
        'cell-1',
        'cell-2',
        'cell-3',
        'cell-4',
        'cell-5',
        'cell-6',
        'cell-7',
        'cell-8',
        'cell-9',
    ];

    // Array of cell elements
    let cellElements = cellIds.map((cell) =>
        document.querySelector(`#${cell}`)
    );

    // Array of cell values
    let cellValues = cellElements.map((cell) => cell.value);

    // Array of winning patterns
    let winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Flag for match tied condition
    let won = false;

    // Number of empty cells left
    let numberOfEmptyCells = cellValues.filter((value) => value === '').length;

    // Evaluate if X or O wins
    winPatterns.forEach((pattern) => {
        let cell1 = cellElements[pattern[0]];
        let cell2 = cellElements[pattern[1]];
        let cell3 = cellElements[pattern[2]];
        if (cell1.value === 'X' && cell2.value === 'X' && cell3.value === 'X') {
            cell1.classList.add('win');
            cell2.classList.add('win');
            cell3.classList.add('win');
            winner('X');
        } else if (
            cell1.value === 'O' &&
            cell2.value === 'O' &&
            cell3.value === 'O'
        ) {
            cell1.classList.add('win');
            cell2.classList.add('win');
            cell3.classList.add('win');
            winner('O');
        }
    });

    // Check if the match is tied
    if (numberOfEmptyCells === 0 && won === false) {
        message.textContent = 'Match Tied!';
    }

    // Winner player logic
    function winner(player) {
        if (player === 'X') {
            playerXScore = Number(playerXScore) + 1;
            localStorage.setItem('X', playerXScore);
            playerXScoreElement.textContent = playerXScore;
            message.textContent = 'Player X Wins!';
        } else {
            playerOScore = Number(playerOScore) + 1;
            localStorage.setItem('O', playerOScore);
            playerOScoreElement.textContent = playerOScore;
            message.textContent = 'Player O Wins!';
        }
        message.classList.add('win');
        disableInputs();
        won = true;
    }

    // Disable all inputs
    function disableInputs() {
        cellElements.forEach((cell) => {
            cell.disabled = true;
        });
    }
}

// Restart the game
function restart() {
    window.location.reload();
}

// Reset the score and restart the game
function reset() {
    let message = 'Do you really want to RESET the score?';
    if (confirm(message) === true) {
        localStorage.setItem('X', 0);
        localStorage.setItem('O', 0);
        alert('Score Reset!');
        restart();
    } else {
        alert('Score Kept!');
    }
}
