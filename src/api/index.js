import axios from "axios";
import toast from "react-hot-toast";

import { store } from "../redux/store";
import { logout } from "../slices/authSlice";

const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("ReconcilePro-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("ReconcilePro-token");
      localStorage.removeItem("ReconcilePro-userName");
      localStorage.removeItem("ReconcilePro-userAvatar");

      store.dispatch(logout());
      window.location.href = "/login";
    } else if (error.response?.status === 429) {
      toast.error(
        "You have exceeded the rate limit. Please try again after 10 seconds."
      );
    }

    return Promise.reject(error);
  }
);

// Auth
export const register = (data) => API.post("/api/v1/auth/register", data);
export const loginApi = (data) => API.post("/api/v1/auth/login", data);

// Invoice
export const uploadInvoice = (data) =>
  API.post("/api/v1/invoice/upload-invoice", data);
export const allInvoices = (page) =>
  API.get("/api/v1/invoice/all-invoices", { params: { page } });
export const pendingInvoices = (limit) =>
  API.get("/api/v1/invoice/pending-invoices", { params: { limit } });
export const downloadInvoicesFile = () =>
  API.get("/api/v1/invoice/download-invoices");

// Transaction
export const uploadTransaction = (data) =>
  API.post("/api/v1/transaction/upload-transaction", data);
export const allTransactions = (page) =>
  API.get("/api/v1/transaction/all-transactions", { params: { page } });
export const pendingTransactions = (limit) =>
  API.get("/api/v1/transaction/pending-transactions", { params: { limit } });
export const downloadTransactionsFile = () =>
  API.get("/api/v1/transaction/download-transactions");

// Reconcile
export const reconcileData = (data) =>
  API.post("/api/v1/reconcile/reconcile-data", data);

// Report
export const reportSummary = () => API.get("/api/v1/report/report-summary");
export const reconcileReport = () =>
  API.get("/api/v1/reconcile/reconcile-report");
