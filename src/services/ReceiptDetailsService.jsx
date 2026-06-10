import axios from "axios";

const baseURL = "http://localhost:9090/api/v1";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYW5nIiwicm9sZXMiOiJST0xFX0FETUlOLFJPTEVfQ1VTVE9NRVIiLCJpYXQiOjE3ODEwMzk3MTUsImV4cCI6MTc4MTY0NDUxNX0.x8uRDozO1jCkqMjupZDsyRThU9JmQ7plRndes1t_ShU";

const headerConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getReceiptDetails = (receiptId) =>
  axios.get(`${baseURL}/getReceipt/${receiptId}`, headerConfig);
