import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const DocumentPage = () => {
  const navigate = useNavigate();
  return (
    <div className="docmt-container">
      {/* Important Notes Section */}
      <section>
        <h3 cclassName="docmt-subheading">Important Notes</h3>
        <ul className="docmt-list">
          <li>Ensure uploaded files are in Excel format (.xlsx).</li>
          <li>Matching amounts is crucial for reconciliation.</li>
          <li>
            Check your email for reports and ensure your registered email is
            active.
          </li>
        </ul>
      </section>
      <br />

      {/* Invoice Page Section */}
      <section>
        <h2 className="docmt-heading">1. Invoice Page</h2>
        <img
          src="/images/invoice.png"
          alt="Invoice Page"
          className="docmt-section-image"
          onClick={() => navigate(`/invoice`)}
        />
        <ul className="docmt-list">
          <li>
            Sends an Excel sheet of all invoices to the user’s registered email.
          </li>
          <li>Upload invoices in bulk using an Excel file.</li>
          <li>
            Displays all uploaded invoices in a table format with columns:
            Invoice ID, Customer Name, Amount, Status, Date, etc.
          </li>
        </ul>
        Download Invoice Sample File &nbsp;&nbsp;&nbsp;
        <a
          download="invoice.xlsx"
          href="/files/invoice.xlsx"
          className="docmt-download-button"
        >
          Download
        </a>
        <br />
        <br />
        <h3 className="docmt-subheading">Steps:</h3>
        <ol className="docmt-ordered-list">
          <li>
            Click the <strong>"Send Report to Email"</strong> button.
          </li>
          <li>Check your email for the report.</li>
          <li>
            To upload invoices, click the <strong>"Upload"</strong> button and
            select a valid Excel file.
          </li>
          <li>Ensure the file format matches the required structure.</li>
        </ol>
      </section>
      <br />
      {/* Transaction Page Section */}
      <section>
        <h2 className="docmt-heading">2. Transaction Page</h2>
        <img
          src="/images/transaction.png"
          alt="Transaction Page"
          className="docmt-section-image"
          onClick={() => navigate(`/transaction`)}
        />
        <ul className="docmt-list">
          <li>
            Sends an Excel sheet of all transactions to the user’s registered
            email.
          </li>
          <li>Upload transactions in bulk using an Excel file.</li>
          <li>
            Displays all uploaded transactions in a table format with columns:
            Transaction ID, Payment Mode, Amount, Date Processed, Status, etc.
          </li>
        </ul>
        Download Transaction Sample File &nbsp;&nbsp;&nbsp;
        <a
          download="transaction.xlsx"
          href="/files/transaction.xlsx"
          className="docmt-download-button"
        >
          Download
        </a>
        <br />
        <br />
        <h3 className="docmt-subheading">Steps:</h3>
        <ol className="docmt-ordered-list">
          <li>
            Click the <strong>"Send Report to Email"</strong> button.
          </li>
          <li>Check your email for the report.</li>
          <li>
            To upload transactions, click the <strong>"Upload"</strong> button
            and select a valid Excel file.
          </li>
          <li>Ensure the file format matches the required structure.</li>
        </ol>
      </section>
      <br />

      {/* Reconcile Page Section */}
      <section>
        <h2 className="docmt-heading">3. Reconcile Page</h2>
        <img
          src="/images/reconcile.png"
          alt="Reconcile Page"
          className="docmt-section-image"
          onClick={() => navigate(`/reconcile`)}
        />
        <ul className="docmt-list">
          <li>Choose invoices and transactions that need reconciliation.</li>
          <li>
            Match invoices and transactions with the same amount and reconcile
            them.
          </li>
          <li>
            Pending invoices and transactions will be shown for reconciliation.
          </li>
        </ul>
        <br />

        <h3 className="docmt-subheading">Steps:</h3>
        <ol className="docmt-ordered-list">
          <li>Select multiple invoices and transactions to match.</li>
          <li>Check for matching amounts between invoices and transactions.</li>
          <li>Reconcile them if the amounts match.</li>
        </ol>
      </section>
      <br />

      {/* Report Page Section */}
      <section>
        <h2 className="docmt-heading">4. Report Page</h2>
        <img
          src="/images/report.png"
          alt="Report Page"
          className="docmt-section-image"
          onClick={() => navigate(`/report`)}
        />
        <ul className="docmt-list">
          <li>
            Displays a summary of total invoices, pending invoices, and
            reconciled invoices.
          </li>
          <li>
            Displays a summary of total transactions, pending transactions, and
            reconciled transactions.
          </li>
          <li>
            Downloads and sends an Excel sheet with the reconciliation report to
            the user’s email.
          </li>
        </ul>
        <br />

        <h3 className="docmt-subheading">Steps:</h3>
        <ol className="docmt-ordered-list">
          <li>
            Click the <strong>"Send Report to Email"</strong> button.
          </li>
          <li>
            Check your email for the report containing reconciled invoices,
            transactions, and the summary.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default DocumentPage;
