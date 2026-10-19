import apiClient from "./apiClient";

const baseUrl = "/v1/menu-items";
export const getAllItems = () => apiClient.get(baseUrl);

export const deleteItem = (itemId) => apiClient.delete(`${baseUrl}/${itemId}`);

export const createItem = (item) => apiClient.post(baseUrl, item);

export const partialUpdate = (item, id) => {
  console.log(typeof id);
  console.log(`/api/v1/updateItem/${id}`);
  return apiClient.patch(`${baseUrl}/${id}`, item);
};

export const getItemById = (id) => apiClient.get(`${baseUrl}/${id}`);

export const updateMenuItem = (item, id) => {
  return apiClient.put(`${baseUrl}/${id}`, item);
};
