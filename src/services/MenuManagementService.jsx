import axios from "axios";

const baseURL = "http://localhost:9090/api/v1";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaG9jbyIsInJvbGVzIjoiUk9MRV9BRE1JTiIsImlhdCI6MTc3OTIxMjY1OSwiZXhwIjoxNzc5ODE3NDU5fQ.Sio4WJR6uveg4wMjIfdmM7iy2l5Or3wWTj0XKRJ6AFI";
const headerConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const getAllItems = () =>
  axios.get(`${baseURL}/getAllItems`, headerConfig);

export const deleteItem = (itemId) =>
  axios.delete(baseURL + `/deleteItem/${itemId}`, headerConfig);

export const createItem = (item) =>
  axios.post(baseURL + `/createItem`, item, headerConfig);

export const partialUpdate = (item, id) => {
  console.log(typeof id);
  console.log(baseURL + `/updateItem/${id}`);
  return axios.patch(baseURL + `/updateItem/${id}`, item, headerConfig);
};

export const getItemById = (id) =>
  axios.get(baseURL + `/getItem/${id}`, headerConfig);

export const updateMenuItem = (item, id) => {
  return axios.put(baseURL + `/updateItem/${id}`, item, headerConfig);
};
