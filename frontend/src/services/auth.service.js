import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// ===============================
// STUDENT
// ===============================

export const studentRegister = async (data) => {
  const response = await axios.post(`${API_URL}/student/register`, data);

  return response.data;
};

export const studentLogin = async (data) => {
  const response = await axios.post(`${API_URL}/student/login`, data);

  return response.data;
};

// ===============================
// TEACHER
// ===============================

export const teacherRegister = async (data) => {
  const response = await axios.post(`${API_URL}/teacher/register`, data);

  return response.data;
};

export const teacherLogin = async (data) => {
  const response = await axios.post(`${API_URL}/teacher/login`, data);

  return response.data;
};

// ===============================
// LOGOUT
// ===============================

export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`);

  return response.data;
};
