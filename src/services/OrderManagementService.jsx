import axios from "axios";

const baseURL = "http://localhost:9090/api/v2/order";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYW5nIiwicm9sZXMiOiJST0xFX0FETUlOLFJPTEVfQ1VTVE9NRVIiLCJpYXQiOjE3ODAzNDU0NTAsImV4cCI6MTc4MDk1MDI1MH0.XEyAQraWDzABq0WTUBJ6WupksxRe8f7u3SxcmGQm6PU";

const headerConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const createOrder = (orderRequest) =>
  axios.post(`${baseURL}/create`, orderRequest, headerConfig);
