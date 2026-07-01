import apiClient from "./apiClient";

export const getAllItems = () => apiClient.get(`/api/v1/getAllItems`);

export const deleteItem = (itemId) =>
  apiClient.delete(`/api/v1/deleteItem/${itemId}`);

export const createItem = (item) => apiClient.post(`/api/v1/createItem`, item);

export const partialUpdate = (item, id) => {
  console.log(typeof id);
  console.log(`/api/v1/updateItem/${id}`);
  return apiClient.patch(`/api/v1/updateItem/${id}`, item);
};

export const getItemById = (id) => apiClient.get(`/api/v1/getItem/${id}`);

export const updateMenuItem = (item, id) => {
  return apiClient.put(`/api/v1/updateItem/${id}`, item);
};
