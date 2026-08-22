import api from "./api";

// ===============================
// STUDENT
// ===============================

export const studentRegister = async (data) => {
  const response = await api.post("/student/register", data);

  return response.data;
};

export const studentLogin = async (data) => {
  const response = await api.post("/student/login", data);

  return response.data;
};

// ===============================
// TEACHER
// ===============================

export const teacherRegister = async (data) => {
  const response = await api.post("/teacher/register", data);

  return response.data;
};

export const teacherLogin = async (data) => {
  const response = await api.post("/teacher/login", data);

  return response.data;
};

// ===============================
// LOGOUT
// ===============================

export const logoutUser = async () => {
  const response = await api.post("/logout");

  return response.data;
};
