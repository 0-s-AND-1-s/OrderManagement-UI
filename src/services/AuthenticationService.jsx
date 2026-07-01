import apiClient from "./apiClient";

export const userLogIn = (userDetails) => {
  return apiClient.post("/users/authenticate", userDetails);
};

export const usersignUp = (userDetails) => {
  return apiClient.post("/users/register", userDetails);
};
