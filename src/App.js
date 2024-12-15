import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  DocumentPage,
  InvoiceTab,
  Login,
  PageNotFound,
  ReconciliationPage,
  Register,
  ReportSummary,
  TransactionTab,
} from "./pages";
import "./App.css";
import { Header } from "./components";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<DocumentPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/invoice" element={<InvoiceTab />} />
          <Route path="/transaction" element={<TransactionTab />} />
          <Route path="/reconcile" element={<ReconciliationPage />} />
          <Route path="/report" element={<ReportSummary />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
