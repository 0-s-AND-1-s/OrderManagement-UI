import apiClient from "./apiClient";

export const createOrder = (orderRequest) =>
  apiClient.post(`/api/v2/order/create`, orderRequest);
