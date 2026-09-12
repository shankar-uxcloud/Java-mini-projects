// ==========================================
// PASSWORD GENERATOR
// ==========================================

// Character sets

const uppercase =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowercase =
    "abcdefghijklmnopqrstuvwxyz";

const numbers =
    "0123456789";

const specialCharacters =
    "!@#$%^&*()-_=+[]{}";


// Get elements

const passwordInput =
    document.getElementById("password");

const lengthSlider =
    document.getElementById("length");

const lengthValue =
    document.getElementById("lengthValue");

const uppercaseCheckbox =
    document.getElementById("uppercase");

const lowercaseCheckbox =
    document.getElementById("lowercase");

const numbersCheckbox =
    document.getElementById("numbers");

const specialCheckbox =
    document.getElementById("special");

const generateButton =
    document.getElementById("generateButton");

const copyButton =
    document.getElementById("copyButton");

const errorMessage =
    document.getElementById("errorMessage");

const strengthText =
    document.getElementById("strengthText");

const strengthBar =
    document.getElementById("strengthBar");


// ==========================================
// SECURE RANDOM CHARACTER
// ==========================================

function getRandomCharacter(characters) {

    const randomIndex =
        Math.floor(
            Math.random() * characters.length
        );

    return characters[randomIndex];
}


// ==========================================
// SHUFFLE PASSWORD
// ==========================================

function shufflePassword(password) {

    const array =
        password.split("");

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];
    }

    return array.join("");
}


// ==========================================
// GENERATE PASSWORD
// ==========================================

function generatePassword() {

    const length =
        parseInt(lengthSlider.value);


    let characters = "";

    let password = "";


    // Check selected character types

    const useUppercase =
        uppercaseCheckbox.checked;

    const useLowercase =
        lowercaseCheckbox.checked;

    const useNumbers =
        numbersCheckbox.checked;

    const useSpecial =
        specialCheckbox.checked;


    // Make sure at least one option is selected

    if (
        !useUppercase &&
        !useLowercase &&
        !useNumbers &&
        !useSpecial
    ) {

        errorMessage.textContent =
            "Select at least one character type.";

        passwordInput.value = "";

        strengthText.textContent = "—";

        strengthBar.style.width = "0%";

        return;
    }


    errorMessage.textContent = "";


    // Add selected character sets

    if (useUppercase) {

        characters += uppercase;

        password +=
            getRandomCharacter(uppercase);
    }


    if (useLowercase) {

        characters += lowercase;

        password +=
            getRandomCharacter(lowercase);
    }


    if (useNumbers) {

        characters += numbers;

        password +=
            getRandomCharacter(numbers);
    }


    if (useSpecial) {

        characters += specialCharacters;

        password +=
            getRandomCharacter(
                specialCharacters
            );
    }


    // Add remaining characters

    while (password.length < length) {

        password +=
            getRandomCharacter(characters);
    }


    // Shuffle characters

    password =
        shufflePassword(password);


    // Display password

    passwordInput.value = password;


    // Update strength

    updateStrength(
        password,
        characters
    );
}


// ==========================================
// PASSWORD STRENGTH
// ==========================================

function updateStrength(
    password,
    characters
) {

    const length =
        password.length;

    let score = 0;


    // Length

    if (length >= 8) {
        score++;
    }

    if (length >= 12) {
        score++;
    }

    if (length >= 16) {
        score++;
    }


    // Character variety

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    let strength;

    let width;


    if (score <= 2) {

        strength = "Weak";

        width = "25%";

    } else if (score <= 4) {

        strength = "Medium";

        width = "50%";

    } else if (score <= 6) {

        strength = "Strong";

        width = "75%";

    } else {

        strength = "Very Strong";

        width = "100%";
    }


    strengthText.textContent =
        strength;

    strengthBar.style.width =
        width;
}


// ==========================================
// COPY PASSWORD
// ==========================================

async function copyPassword() {

    const password =
        passwordInput.value;


    if (!password) {

        errorMessage.textContent =
            "Generate a password first.";

        return;
    }


    try {

        await navigator.clipboard.writeText(
            password
        );

        copyButton.textContent =
            "Copied!";

        copyButton.classList.add(
            "copied"
        );


        setTimeout(() => {

            copyButton.textContent =
                "Copy";

            copyButton.classList.remove(
                "copied"
            );

        }, 1500);

    } catch (error) {

        errorMessage.textContent =
            "Unable to copy password.";
    }
}


// ==========================================
// LENGTH SLIDER
// ==========================================

lengthSlider.addEventListener(
    "input",
    function () {

        lengthValue.textContent =
            lengthSlider.value;

        generatePassword();
    }
);


// ==========================================
// OPTION CHANGES
// ==========================================

uppercaseCheckbox.addEventListener(
    "change",
    generatePassword
);

lowercaseCheckbox.addEventListener(
    "change",
    generatePassword
);

numbersCheckbox.addEventListener(
    "change",
    generatePassword
);

specialCheckbox.addEventListener(
    "change",
    generatePassword
);


// ==========================================
// BUTTONS
// ==========================================

generateButton.addEventListener(
    "click",
    generatePassword
);

copyButton.addEventListener(
    "click",
    copyPassword
);


// ==========================================
// INITIAL PASSWORD
// ==========================================

generatePassword();