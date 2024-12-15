import React, { useEffect, useState, useRef } from "react";
import { allInvoices, uploadInvoice, downloadInvoicesFile } from "../../api";
import toast from "react-hot-toast";
import "./style.css";

const InvoiceTab = () => {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchInvoices = async () => {
    try {
      const { data } = await allInvoices(page);
      console.log(data.invData);

      setInvoices(data?.invData);
      setTotalPages(data?.metaData.totalPages);
    } catch (error) {
      console.error("Error fetching invoices:", error.message);
    }
  };

  useEffect(() => {
    fetchInvoices();
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
      formData.append("invFile", file);
      const res = await uploadInvoice(formData);

      if (res.data?.success) {
        toast.success(
          "File uploaded successfully.\nPlease check your email for confirmation."
        );
        fetchInvoices();
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
      const { data } = await downloadInvoicesFile();
      if (data?.success) {
        toast.success(
          "Invoices downloaded successfully.\nThe file has been sent to your email."
        );
      } else {
        toast.error(data.message || "Failed to download invoices.");
      }
    } catch (error) {
      console.error("Error downloading invoices:", error);
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
            <th>Invoice ID</th>
            <th>Customer ID</th>
            <th>Invoice Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice.invoiceId}</td>
                <td>{invoice.customerId}</td>
                <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                <td>₹{invoice.amount.toFixed(2)}</td>
                <td>{invoice.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No invoices found.</td>
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

export default InvoiceTab;
