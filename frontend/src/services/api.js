import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // sends the refreshToken cookie automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------
// Keep the current access token here so every
// request can attach it automatically, without
// every component having to pass it in by hand.
// ---------------------------------------------

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

// Attach the access token to every outgoing request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ---------------------------------------------
// If a request fails with 401 (access token expired),
// try to get a new one using the refresh token cookie,
// then retry the original request once.
// ---------------------------------------------

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthError = error.response?.status === 401;
    const alreadyRetried = originalRequest?._retry;

    if (isAuthError && !alreadyRetried) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/refresh");
        const newAccessToken = refreshResponse.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid/expired too — user needs to log in again
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
