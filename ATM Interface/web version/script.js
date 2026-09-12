let balance = 5000;
let currentOperation = "";
let transactions = [];

const balanceDisplay = document.getElementById("balance");
const message = document.getElementById("message");

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalIcon = document.getElementById("modalIcon");

const amountInput = document.getElementById("amountInput");
const errorMessage = document.getElementById("errorMessage");

const transactionList = document.getElementById("transactionList");
const transactionCount = document.getElementById("transactionCount");

function formatMoney(amount) {
    return "Rs. " + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function updateBalance() {
    balanceDisplay.textContent = formatMoney(balance);
}

function showMessage(text) {
    message.textContent = text;
}

/* Open Modal */

function openModal(operation) {

    currentOperation = operation;

    amountInput.value = "";
    errorMessage.textContent = "";

    if (operation === "deposit") {

        modalIcon.textContent = "+";

        modalTitle.textContent = "Deposit Money";

        modalText.textContent =
            "Enter the amount you want to deposit.";

    } else {

        modalIcon.textContent = "−";

        modalTitle.textContent = "Withdraw Money";

        modalText.textContent =
            "Available balance: " + formatMoney(balance);
    }

    modalOverlay.classList.add("show");

    setTimeout(() => {
        amountInput.focus();
    }, 100);
}

/* Close Modal */

function closeModal() {

    modalOverlay.classList.remove("show");

    amountInput.value = "";

    errorMessage.textContent = "";

    currentOperation = "";
}

/* Process Transaction */

function processTransaction() {

    const amount = Number(amountInput.value);

    if (!amount || amount <= 0) {

        errorMessage.textContent =
            "Please enter a valid amount.";

        return;
    }

    if (
        currentOperation === "withdraw" &&
        amount > balance
    ) {

        errorMessage.textContent =
            "Insufficient balance. Available: " +
            formatMoney(balance);

        return;
    }

    if (currentOperation === "deposit") {

        balance += amount;

        addTransaction("deposit", amount);

        updateBalance();

        showMessage(
            formatMoney(amount) +
            " deposited successfully."
        );

    } else if (currentOperation === "withdraw") {

        balance -= amount;

        addTransaction("withdraw", amount);

        updateBalance();

        showMessage(
            formatMoney(amount) +
            " withdrawn successfully."
        );
    }

    closeModal();
}

/* Transactions */

function addTransaction(type, amount) {

    transactions.unshift({
        type: type,
        amount: amount,
        time: new Date()
    });

    renderTransactions();
}

function renderTransactions() {

    transactionCount.textContent = transactions.length;

    if (transactions.length === 0) {

        transactionList.innerHTML = `
            <div class="empty">
                No transactions yet
            </div>
        `;

        return;
    }

    transactionList.innerHTML = "";

    transactions.forEach((transaction) => {

        const row = document.createElement("div");

        row.className = "transaction";

        const name =
            transaction.type === "deposit"
                ? "Deposit"
                : "Withdrawal";

        const sign =
            transaction.type === "deposit"
                ? "+"
                : "-";

        const amountClass =
            transaction.type === "deposit"
                ? "deposit"
                : "withdraw";

        row.innerHTML = `
            <div class="transaction-info">
                <strong>${name}</strong>
                <small>${formatDate(transaction.time)}</small>
            </div>

            <div class="transaction-amount ${amountClass}">
                ${sign}${formatMoney(transaction.amount)}
            </div>
        `;

        transactionList.appendChild(row);
    });
}

function formatDate(date) {

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    });
}

/* Buttons */

document
    .getElementById("depositBtn")
    .addEventListener("click", () => {

        openModal("deposit");

    });

document
    .getElementById("withdrawBtn")
    .addEventListener("click", () => {

        openModal("withdraw");

    });

document
    .getElementById("checkBalanceBtn")
    .addEventListener("click", () => {

        showMessage(
            "Current balance: " +
            formatMoney(balance)
        );

    });

document
    .getElementById("confirmBtn")
    .addEventListener("click", processTransaction);

document
    .getElementById("closeModal")
    .addEventListener("click", closeModal);

/* Close when clicking outside */

modalOverlay.addEventListener("click", (event) => {

    if (event.target === modalOverlay) {
        closeModal();
    }

});

/* Quick Amounts */

document
    .querySelectorAll(".quick-buttons button")
    .forEach((button) => {

        button.addEventListener("click", () => {

            amountInput.value =
                button.dataset.amount;

            errorMessage.textContent = "";

            amountInput.focus();
        });

    });

/* Enter key */

amountInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        processTransaction();
    }

    if (event.key === "Escape") {
        closeModal();
    }

});

/* Exit */

document
    .getElementById("exitBtn")
    .addEventListener("click", () => {

        const confirmed = confirm(
            "Are you sure you want to exit the ATM?"
        );

        if (confirmed) {

            showMessage(
                "ATM session ended. Thank you!"
            );
        }

    });

updateBalance();
renderTransactions();