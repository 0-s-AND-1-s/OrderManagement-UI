import apiClient from "./apiClient";

export const getReceiptDetails = (receiptId) =>
  apiClient.get(`/v1/receipts/${receiptId}`);
