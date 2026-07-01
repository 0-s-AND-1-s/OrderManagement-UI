import apiClient from "./apiClient";

export const getReceiptDetails = (receiptId) =>
  apiClient.get(`/api/v1/getReceipt/${receiptId}`);
