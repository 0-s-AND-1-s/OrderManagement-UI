import axios from "axios";

const apiClient = axios.create({ baseURL: "/api" });

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //Handling User Not Found Case
    if (error.response.status === 404) {
      error.message = error.response.data.msg;
    }
    if (error.response.status === 403) {
      error.message = error.response.data.msg;
    }
    //Handling Wrong password Case
    if (error.response.status === 401) {
      error.message = error.response.data.msg;
    }
    return Promise.reject(error);
  },
);

export default apiClient;

/* Status code Scenarios for getting other then 2xx
        404-->User not found
        401 --> Wrong password..Bad credentials
        403 --> Unauthorized
 */
