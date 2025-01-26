let userScore = 0;
let computerScore = 0;
let history = [];
let timerInterval;
let firstGame = true;

const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('time-left');
const historyList = document.getElementById('history-list');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalPlayButton = document.getElementById('modal-play');
const modalCancelButton = document.getElementById('modal-cancel');

// Function to start the first game or show the prompt for subsequent games
function askToPlay() {
    if (firstGame) {
        firstGame = false;
        startTimer();
    } else {
        showModal("Do you want to play another round?");
    }
}

// Function to handle a new round
function playGame(userChoice) {
    clearInterval(timerInterval); // Reset timer
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);
    updateScore(winner);
    displayResult(userChoice, computerChoice, winner);
    saveGameHistory(userChoice, computerChoice, winner);
    askToPlay(); // Ask for the next game after the result is shown
}

// Function to get computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    }
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'user';
    } else {
        return 'computer';
    }
}

// Function to update the score
function updateScore(winner) {
    if (winner === 'user') {
        userScore++;
        userScoreElement.textContent = userScore;
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}

// Function to display the result
function displayResult(userChoice, computerChoice, winner) {
    if (winner === 'draw') {
        resultElement.textContent = `It's a draw! You both chose ${capitalizeFirstLetter(userChoice)}.`;
        resultElement.className = 'result draw';
    } else if (winner === 'user') {
        resultElement.textContent = `You win! ${capitalizeFirstLetter(userChoice)} beats ${computerChoice}.`;
        resultElement.className = 'result win';
    } else {
        resultElement.textContent = `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${userChoice}.`;
        resultElement.className = 'result lose';
    }
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to save the game history
function saveGameHistory(userChoice, computerChoice, winner) {
    const historyItem = `You chose ${userChoice}, Computer chose ${computerChoice} - ${winner === 'draw' ? 'Draw' : winner === 'user' ? 'You Win!' : 'Computer Wins!'}`;
    history.push(historyItem);

    const historyElement = document.createElement('li');
    historyElement.classList.add('history-item');
    historyElement.textContent = historyItem;
    historyList.appendChild(historyElement);
}

// Function to reset the game
function resetGame() {
    userScore = 0;
    computerScore = 0;
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    resultElement.textContent = "";
    resultElement.className = 'result';
    history = [];
    historyList.innerHTML = '';
    clearInterval(timerInterval);
    timerElement.textContent = "10";
}

// Function to start the countdown timer
function startTimer() {
    let timeLeft = 10;
    timerElement.textContent = timeLeft;

    // Clear any existing timer intervals
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            resultElement.textContent = "Time's up! You didn't make a move.";
            resultElement.className = 'result lose';
            askToPlay();
        }
    }, 1000);
}

// Function to show the modal popup
function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Function to hide the modal popup
function hideModal() {
    modal.style.display = 'none';
}

// Modal button event listeners
modalPlayButton.addEventListener('click', () => {
    hideModal();
    startTimer();
});

modalCancelButton.addEventListener('click', () => {
    hideModal();
    resultElement.textContent = "Game ended. Refresh to play again!";
    resultElement.className = 'result draw';
    clearInterval(timerInterval);
});

// Start the first game automatically
askToPlay();
