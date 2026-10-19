import apiClient from "./apiClient";

export const createOrder = (orderRequest) =>
  apiClient.post(`/v1/orders`, orderRequest);
