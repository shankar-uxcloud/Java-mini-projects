// ==========================================
// CURRENCY CONVERTER
// ==========================================

// Exchange rates based on 1 USD
const exchangeRates = {
    USD: 1.0,
    INR: 83.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.0,
    AUD: 1.53
};


// Currency symbols

const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$"
};


// Currency names

const currencyNames = {
    USD: "US Dollar",
    INR: "Indian Rupee",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    AUD: "Australian Dollar"
};


// Get HTML elements

const amountInput = document.getElementById("amount");

const fromCurrency =
    document.getElementById("fromCurrency");

const toCurrency =
    document.getElementById("toCurrency");

const convertButton =
    document.getElementById("convertButton");

const swapButton =
    document.getElementById("swapButton");

const result =
    document.getElementById("result");

const resultCurrency =
    document.getElementById("resultCurrency");

const exchangeRate =
    document.getElementById("exchangeRate");

const amountSymbol =
    document.getElementById("amountSymbol");

const errorMessage =
    document.getElementById("errorMessage");

const resultCard =
    document.getElementById("resultCard");


// ==========================================
// UPDATE CURRENCY SYMBOL
// ==========================================

function updateAmountSymbol() {

    const currency = fromCurrency.value;

    amountSymbol.textContent =
        currencySymbols[currency];
}


// ==========================================
// CONVERT CURRENCY
// ==========================================

function convertCurrency() {

    const amount =
        parseFloat(amountInput.value);

    const from =
        fromCurrency.value;

    const to =
        toCurrency.value;


    // Validate amount

    if (isNaN(amount) || amount <= 0) {

        errorMessage.textContent =
            "Please enter an amount greater than 0.";

        return;
    }


    // Clear error

    errorMessage.textContent = "";


    // Get exchange rates

    const fromRate =
        exchangeRates[from];

    const toRate =
        exchangeRates[to];


    // Convert source currency to USD

    const amountInUSD =
        amount / fromRate;


    // Convert USD to target currency

    const convertedAmount =
        amountInUSD * toRate;


    // Calculate direct exchange rate

    const directRate =
        toRate / fromRate;


    // Display result

    result.textContent =
        formatNumber(convertedAmount);

    resultCurrency.textContent =
        `${to} - ${currencyNames[to]}`;


    exchangeRate.textContent =
        `1 ${from} = ${formatNumber(directRate)} ${to}`;


    // Animation

    resultCard.classList.remove("show");

    void resultCard.offsetWidth;

    resultCard.classList.add("show");
}


// ==========================================
// FORMAT NUMBER
// ==========================================

function formatNumber(number) {

    return number.toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
}


// ==========================================
// SWAP CURRENCIES
// ==========================================

function swapCurrencies() {

    const currentFrom =
        fromCurrency.value;

    const currentTo =
        toCurrency.value;


    fromCurrency.value =
        currentTo;

    toCurrency.value =
        currentFrom;


    updateAmountSymbol();


    // If amount exists, automatically convert

    if (amountInput.value) {

        convertCurrency();
    }
}


// ==========================================
// EVENT LISTENERS
// ==========================================

convertButton.addEventListener(
    "click",
    convertCurrency
);


swapButton.addEventListener(
    "click",
    swapCurrencies
);


fromCurrency.addEventListener(
    "change",
    updateAmountSymbol
);


// Allow Enter key to convert

amountInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            convertCurrency();
        }
    }
);


// ==========================================
// INITIAL SETUP
// ==========================================

updateAmountSymbol();