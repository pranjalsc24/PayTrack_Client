import React, { useEffect, useState, useRef } from "react";
import {
  allTransactions,
  uploadTransaction,
  downloadTransactionsFile,
} from "../../api";
import toast from "react-hot-toast";
import "./style.css";

const TransactionTab = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchTransactions = async () => {
    try {
      const { data } = await allTransactions(page);
      console.log(data.transData);

      setTransactions(data?.transData);
      setTotalPages(data?.metaData.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("transFile", file);
      const res = await uploadTransaction(formData);
      console.log("Uploading file:", file);

      if (res.data?.success) {
        toast.success(
          "File uploaded successfully.\nPlease check your email for confirmation."
        );
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(error.response.data.message);
    } finally {
      setFile(null); // Clear state
      fileInputRef.current.value = ""; // Clear file input
    }
  };

  const handleFileDownload = async () => {
    try {
      const { data } = await downloadTransactionsFile();
      if (data?.success) {
        toast.success(
          "Transactions downloaded successfully.\nThe file has been sent to your email."
        );
      } else {
        toast.error(data.message || "Failed to download transactions.");
      }
    } catch (error) {
      console.error("Error downloading transactions:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="invTab-invoice-tab">
      <br />
      <div className="invTab-header">
        <div className="invTab-buttons">
          <button
            className="invTab-button invTab-download"
            onClick={handleFileDownload}
          >
            Send Report to Email
          </button>
        </div>
        <form className="invTab-upload-form" onSubmit={handleFileUpload}>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
          />
          <button type="submit" className="invTab-button invTab-upload">
            Upload
          </button>
        </form>
      </div>
      <br />

      <table className="invTab-invoice-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Payment Method</th>
            <th>Payment Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.paymentMethod}</td>
                <td>
                  {new Date(transaction.paymentDate).toLocaleDateString()}
                </td>
                <td>₹{transaction.amount.toFixed(2)}</td>
                <td>{transaction.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />

      <div className="invTab-pagination">
        <button
          className="invTab-pagination-button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          🡄
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="invTab-pagination-button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          🡆
        </button>
      </div>
    </div>
  );
};

export default TransactionTab;
