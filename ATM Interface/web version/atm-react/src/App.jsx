import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(5000);
  const [transactions, setTransactions] = useState([]);
  const [operation, setOperation] = useState(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Select an option to continue.");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("atm-theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("atm-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const formatMoney = (value) => {
    return `Rs. ${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const openTransaction = (type) => {
    setOperation(type);
    setAmount("");
    setError("");
  };

  const closeTransaction = () => {
    setOperation(null);
    setAmount("");
    setError("");
  };

  const addTransaction = (type, value) => {
    const newTransaction = {
      id: Date.now(),
      type,
      amount: value,
      time: new Date(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const handleTransaction = () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (operation === "withdraw" && value > balance) {
      setError(`Insufficient balance. Available: ${formatMoney(balance)}.`);
      return;
    }

    if (operation === "deposit") {
      setBalance((prev) => prev + value);
      addTransaction("deposit", value);
      setMessage(`${formatMoney(value)} deposited successfully.`);
    }

    if (operation === "withdraw") {
      setBalance((prev) => prev - value);
      addTransaction("withdraw", value);
      setMessage(`${formatMoney(value)} withdrawn successfully.`);
    }

    closeTransaction();
  };

  const checkBalance = () => {
    setMessage(`Current balance: ${formatMoney(balance)}`);
  };

  const handleExit = () => {
    const confirmed = window.confirm(
      "Are you sure you want to exit the ATM?"
    );

    if (confirmed) {
      setMessage("ATM session ended. Thank you!");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <div className="atm-card">

        {/* Header */}
        <header className="header">

          <div className="brand">
            <div className="brand-logo">ATM</div>

            <div>
              <h1>ATM Interface</h1>
              <p>Secure Banking</p>
            </div>
          </div>

          <div className="header-actions">

            <div className="online">
              <span className="online-dot"></span>
              Online
            </div>

            <button
              className="theme-btn"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀" : "☾"}
            </button>

          </div>

        </header>

        {/* Balance */}
        <section className="balance-card">

          <p className="balance-label">
            Available Balance
          </p>

          <h2>
            {formatMoney(balance)}
          </h2>

          <div className="account-number">
            Account ending in •••• 4821
          </div>

        </section>

        {/* Actions */}
        <section className="actions">

          <button
            className="action-card deposit"
            onClick={() => openTransaction("deposit")}
          >

            <div className="action-icon">
              +
            </div>

            <div className="action-text">
              <strong>Deposit</strong>
              <span>Add money to your account</span>
            </div>

            <div className="action-arrow">
              ›
            </div>

          </button>

          <button
            className="action-card withdraw"
            onClick={() => openTransaction("withdraw")}
          >

            <div className="action-icon">
              −
            </div>

            <div className="action-text">
              <strong>Withdraw</strong>
              <span>Withdraw money from your account</span>
            </div>

            <div className="action-arrow">
              ›
            </div>

          </button>

          <button
            className="action-card check"
            onClick={checkBalance}
          >

            <div className="action-icon">
              ◉
            </div>

            <div className="action-text">
              <strong>Check Balance</strong>
              <span>View your current balance</span>
            </div>

            <div className="action-arrow">
              ›
            </div>

          </button>

        </section>

        {/* Message */}
        <div className="message">
          {message}
        </div>

        {/* Transactions */}
        <section className="history">

          <div className="history-header">

            <h3>
              Recent Transactions
            </h3>

            <span>
              {transactions.length}
            </span>

          </div>

          {transactions.length === 0 ? (

            <div className="empty">
              No transactions yet
            </div>

          ) : (

            transactions.map((transaction) => (

              <div
                className="transaction"
                key={transaction.id}
              >

                <div className="transaction-info">

                  <strong>
                    {transaction.type === "deposit"
                      ? "Deposit"
                      : "Withdrawal"}
                  </strong>

                  <small>
                    {formatDate(transaction.time)}
                  </small>

                </div>

                <span
                  className={
                    transaction.type === "deposit"
                      ? "amount deposit-amount"
                      : "amount withdraw-amount"
                  }
                >
                  {transaction.type === "deposit" ? "+" : "-"}
                  {formatMoney(transaction.amount)}
                </span>

              </div>

            ))

          )}

        </section>

        {/* Exit */}
        <button
          className="exit-btn"
          onClick={handleExit}
        >
          Exit ATM
        </button>

        <footer>
          ATM Interface • Java Internship Task 3
        </footer>

      </div>

      {/* Transaction Modal */}
      {operation && (

        <div
          className="modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeTransaction();
            }
          }}
        >

          <div className="modal">

            <button
              className="close-btn"
              onClick={closeTransaction}
            >
              ×
            </button>

            <div className="modal-icon">
              {operation === "deposit" ? "+" : "−"}
            </div>

            <h2>
              {operation === "deposit"
                ? "Deposit Money"
                : "Withdraw Money"}
            </h2>

            <p>
              {operation === "deposit"
                ? "Enter the amount you want to deposit."
                : `Available balance: ${formatMoney(balance)}`}
            </p>

            <div className="amount-input">

              <span>
                Rs.
              </span>

              <input
                type="number"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  setError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleTransaction();
                  }
                }}
                placeholder="0.00"
                min="1"
                step="0.01"
                autoFocus
              />

            </div>

            <div className="quick-amounts">

              {[500, 1000, 2000, 5000].map((value) => (

                <button
                  key={value}
                  onClick={() => {
                    setAmount(value);
                    setError("");
                  }}
                >
                  Rs. {value.toLocaleString("en-IN")}
                </button>

              ))}

            </div>

            <div className="error">
              {error}
            </div>

            <button
              className="confirm-btn"
              onClick={handleTransaction}
            >
              Confirm
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;