import { useEffect, useState } from "react";
import { pendingInvoices, pendingTransactions, reconcileData } from "../../api";
import "./style.css";

import toast from "react-hot-toast";

const ReconciliationPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);
  const [totalTransactionAmount, setTotalTransactionAmount] = useState(0);

  const limit = 20;

  useEffect(() => {
    fetchPendingInvoices();
    fetchPendingTransactions();
  }, []);

  const fetchPendingInvoices = async () => {
    const { data } = await pendingInvoices(limit);
    if (data.success) {
      setInvoices(data.pendingInv);
    }
  };

  const fetchPendingTransactions = async () => {
    const { data } = await pendingTransactions(limit);
    if (data.success) {
      setTransactions(data.pendingTrans);
    }
  };

  const handleScroll = (e, type) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (type === "invoices") {
        fetchPendingInvoices();
      } else {
        fetchPendingTransactions();
      }
    }
  };

  const handleInvoiceSelect = (invoice) => {
    let newSelectedInvoices = [...selectedInvoices];
    if (newSelectedInvoices.includes(invoice.invoiceId)) {
      newSelectedInvoices = newSelectedInvoices.filter(
        (id) => id !== invoice.invoiceId
      );
    } else {
      newSelectedInvoices.push(invoice.invoiceId);
    }
    setSelectedInvoices(newSelectedInvoices);
    updateTotalAmounts(newSelectedInvoices, selectedTransactions);
  };

  const handleTransactionSelect = (transaction) => {
    let newSelectedTransactions = [...selectedTransactions];
    if (newSelectedTransactions.includes(transaction.transactionId)) {
      newSelectedTransactions = newSelectedTransactions.filter(
        (id) => id !== transaction.transactionId
      );
    } else {
      newSelectedTransactions.push(transaction.transactionId);
    }
    setSelectedTransactions(newSelectedTransactions);
    updateTotalAmounts(selectedInvoices, newSelectedTransactions);
  };

  const updateTotalAmounts = (selectedInvoices, selectedTransactions) => {
    const selectedInvoiceAmount = invoices
      .filter((inv) => selectedInvoices.includes(inv.invoiceId))
      .reduce((total, inv) => total + inv.amount, 0);

    const selectedTransactionAmount = transactions
      .filter((txn) => selectedTransactions.includes(txn.transactionId))
      .reduce((total, txn) => total + txn.amount, 0);

    setTotalInvoiceAmount(selectedInvoiceAmount);
    setTotalTransactionAmount(selectedTransactionAmount);
  };

  const handleMatch = async () => {
    const payload = { selectedInvoices, selectedTransactions };
    try {
      const response = await reconcileData(payload);
      if (response.data.success) {
        toast.success("Matched successfully!");

        setSelectedInvoices([]);
        setSelectedTransactions([]);
        setTotalInvoiceAmount(0);
        setTotalTransactionAmount(0);
        fetchPendingInvoices();
        fetchPendingTransactions();
      } else {
        toast.error("Matching failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in matching:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const isMatched =
    totalInvoiceAmount > 0 &&
    totalTransactionAmount > 0 &&
    totalInvoiceAmount === totalTransactionAmount;

  return (
    <div className="rncle-reconciliation-container">
      <div className="rncle-reconciliation-row">
        {/* Left Panel - Pending Invoices */}
        <div
          className="rncle-scrollable-panel"
          style={{ width: "45%", height: "400px", overflowY: "auto" }}
          onScroll={(e) => handleScroll(e, "invoices")}
        >
          <h3>Pending Invoices</h3>
          <br />
          <table className="rncle-table">
            <thead className="rncle-thead">
              <tr>
                <th className="rncle-th">Select</th>
                <th className="rncle-th">Invoice ID</th>
                <th className="rncle-th">Amount</th>
              </tr>
            </thead>
            <tbody className="rncle-tbody">
              {invoices.map((invoice) => (
                <tr key={invoice.invoiceId}>
                  <td className="rncle-td">
                    <input
                      className="rncle-input-checkbox"
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.invoiceId)}
                      onChange={() => handleInvoiceSelect(invoice)}
                    />
                  </td>
                  <td className="rncle-td">{invoice.invoiceId}</td>
                  <td className="rncle-td">₹{invoice.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Panel - Pending Transactions */}
        <div
          className="rncle-scrollable-panel"
          style={{ width: "45%", height: "400px", overflowY: "auto" }}
          onScroll={(e) => handleScroll(e, "transactions")}
        >
          <h3>Pending Transactions</h3>
          <br />
          <table className="rncle-table">
            <thead className="rncle-thead">
              <tr>
                <th className="rncle-th">Select</th>
                <th className="rncle-th">Transaction ID</th>
                <th className="rncle-th">Amount</th>
              </tr>
            </thead>
            <tbody className="rncle-tbody">
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td className="rncle-td">
                    <input
                      className="rncle-input-checkbox"
                      type="checkbox"
                      checked={selectedTransactions.includes(
                        transaction.transactionId
                      )}
                      onChange={() => handleTransactionSelect(transaction)}
                    />
                  </td>
                  <td className="rncle-td">{transaction.transactionId}</td>
                  <td className="rncle-td">₹{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rncle-match-summary" style={{ marginTop: "20px" }}>
        <div className="left-section">
          <div>
            <strong>Total Selected Invoice Amount:</strong> ₹
            {totalInvoiceAmount}
          </div>
          <div>
            <strong>Total Selected Transaction Amount:</strong> ₹
            {totalTransactionAmount}
          </div>
        </div>
        <div className="right-section">
          <div>
            <strong>Status:</strong> {isMatched ? "Matched" : "Not Matched"}
          </div>
          <button
            className="rncle-button"
            disabled={!isMatched}
            onClick={handleMatch}
            style={{
              backgroundColor: isMatched ? "green" : "gray",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: isMatched ? "pointer" : "not-allowed",
              marginTop: "10px",
            }}
          >
            Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReconciliationPage;
