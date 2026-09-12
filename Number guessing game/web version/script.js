let maxNumber = 50;

let secretNumber = 0;

let attempts = 0;

let gameMode = "computer";

let secretSet = false;


// Elements

const computerMode =
    document.getElementById("computerMode");

const twoPlayerMode =
    document.getElementById("twoPlayerMode");

const difficultySection =
    document.getElementById("difficultySection");

const difficultyButtons =
    document.querySelectorAll(".difficulty-btn");

const secretSection =
    document.getElementById("secretSection");

const secretInput =
    document.getElementById("secretInput");

const setSecretButton =
    document.getElementById("setSecretButton");

const guessInput =
    document.getElementById("guessInput");

const guessButton =
    document.getElementById("guessButton");

const message =
    document.getElementById("message");

const attemptsDisplay =
    document.getElementById("attempts");

const rangeDisplay =
    document.getElementById("rangeDisplay");

const rangeText =
    document.getElementById("rangeText");

const restartButton =
    document.getElementById("restartButton");


// ===============================
// START GAME
// ===============================

function startGame() {

    attempts = 0;

    secretSet = false;

    attemptsDisplay.textContent = attempts;

    rangeDisplay.textContent =
        `1-${maxNumber}`;

    rangeText.innerHTML =
        `Guess a number between <strong>1</strong> and <strong>${maxNumber}</strong>`;

    guessInput.value = "";

    secretInput.value = "";

    guessInput.disabled = false;

    guessButton.disabled = false;

    message.textContent =
        "Make your first guess!";


    // COMPUTER MODE

    if (gameMode === "computer") {

        secretNumber =
            Math.floor(Math.random() * maxNumber) + 1;

    }


    // TWO PLAYER MODE

    else {

        secretNumber = 0;

        secretSection.classList.remove("hidden");

        guessInput.disabled = true;

        guessButton.disabled = true;

        message.textContent =
            "Player 1: Set the secret number.";

    }


    if (gameMode === "computer") {

        secretSection.classList.add("hidden");

    }


    guessInput.focus();
}


// ===============================
// COMPUTER MODE
// ===============================

computerMode.addEventListener("click", () => {

    gameMode = "computer";

    computerMode.classList.add("active");

    twoPlayerMode.classList.remove("active");

    difficultySection.classList.remove("hidden");

    startGame();

});


// ===============================
// TWO PLAYER MODE
// ===============================

twoPlayerMode.addEventListener("click", () => {

    gameMode = "twoPlayer";

    twoPlayerMode.classList.add("active");

    computerMode.classList.remove("active");

    difficultySection.classList.remove("hidden");

    startGame();

});


// ===============================
// DIFFICULTY
// ===============================

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        maxNumber =
            Number(button.dataset.range);

        startGame();

    });

});


// ===============================
// SET SECRET NUMBER
// ===============================

setSecretButton.addEventListener("click", () => {

    const value =
        Number(secretInput.value);


    if (!secretInput.value) {

        message.textContent =
            "⚠️ Please enter a secret number.";

        return;
    }


    if (value < 1 || value > maxNumber) {

        message.textContent =
            `⚠️ Enter a number between 1 and ${maxNumber}.`;

        return;
    }


    secretNumber = value;

    secretSet = true;

    secretInput.value = "";

    secretSection.classList.add("hidden");

    guessInput.disabled = false;

    guessButton.disabled = false;

    message.textContent =
        "Player 2: Try to guess the secret number!";

    guessInput.focus();

});


// ===============================
// CHECK GUESS
// ===============================

function checkGuess() {

    const guess =
        Number(guessInput.value);


    // TWO PLAYER CHECK

    if (gameMode === "twoPlayer" && !secretSet) {

        message.textContent =
            "⚠️ Player 1 must set the secret number first.";

        return;
    }


    // EMPTY INPUT

    if (!guessInput.value) {

        message.textContent =
            "⚠️ Please enter a number.";

        return;
    }


    // RANGE CHECK

    if (guess < 1 || guess > maxNumber) {

        message.textContent =
            `⚠️ Enter a number between 1 and ${maxNumber}.`;

        return;
    }


    attempts++;

    attemptsDisplay.textContent =
        attempts;


    // TOO HIGH

    if (guess > secretNumber) {

        message.textContent =
            "📈 Too High! Try a smaller number.";

    }


    // TOO LOW

    else if (guess < secretNumber) {

        message.textContent =
            "📉 Too Low! Try a larger number.";

    }


    // CORRECT

    else {

        message.textContent =
            `🎉 Correct! You found the number in ${attempts} attempts!`;

        guessInput.disabled = true;

        guessButton.disabled = true;

    }


    guessInput.value = "";

    guessInput.focus();

}


// ===============================
// GUESS BUTTON
// ===============================

guessButton.addEventListener(
    "click",
    checkGuess
);


// ===============================
// ENTER KEY
// ===============================

guessInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            checkGuess();

        }

    }
);


// ===============================
// NEW GAME
// ===============================

restartButton.addEventListener(
    "click",
    startGame
);


// ===============================
// INITIAL GAME
// ===============================

startGame();