import React, { useState, useEffect } from "react";
import { reportSummary, reconcileReport } from "../../api";
import "./style.css";
import toast from "react-hot-toast";

const ReportSummary = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReportSummary = async () => {
      const { data } = await reportSummary();
      setReportData(data.data);
    };

    fetchReportSummary();
  }, []);

  const handleFileDownload = async () => {
    try {
      const { data } = await reconcileReport();
      if (data?.success) {
        toast.success(
          "Reconcile Report downloaded successfully.\nThe file has been sent to your email."
        );
      } else {
        toast.error(data.message || "Failed to download Reconcile Report.");
      }
    } catch (error) {
      console.error("Error downloading Reconcile Report:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="rprt-container">
      {/* Invoice Summary Table */}
      <div>
        <h2 className="rprt-h2">Invoice Summary</h2>
        <br />
        <table className="rprt-report-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Invoices</td>
              <td>{reportData?.invoices?.total}</td>
              <td>₹{reportData?.invoices?.totalAmount}</td>
            </tr>
            <tr>
              <td>Pending Invoices</td>
              <td>{reportData?.invoices?.pending}</td>
              <td>₹{reportData?.invoices?.pendingAmount}</td>
            </tr>
            <tr>
              <td>Reconciled Invoices</td>
              <td>{reportData?.invoices?.reconciled}</td>
              <td>₹{reportData?.invoices?.reconciledAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      {/* Transaction Summary Table */}
      <div>
        <h2 className="rprt-h2">Transaction Summary</h2>
        <br />
        <table className="rprt-report-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Transactions</td>
              <td>{reportData?.transactions?.total}</td>
              <td>₹{reportData?.transactions?.totalAmount}</td>
            </tr>
            <tr>
              <td>Pending Transactions</td>
              <td>{reportData?.transactions?.pending}</td>
              <td>₹{reportData?.transactions?.pendingAmount}</td>
            </tr>
            <tr>
              <td>Reconciled Transactions</td>
              <td>{reportData?.transactions?.reconciled}</td>
              <td>₹{reportData?.transactions?.reconciledAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />

      {/* Action Buttons */}
      <div>
        <button className="rprt-button" onClick={handleFileDownload}>
          Send Report to Email
        </button>
      </div>
    </div>
  );
};

export default ReportSummary;
