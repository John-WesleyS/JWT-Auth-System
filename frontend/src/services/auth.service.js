import api from "./api";

export const registerStudent = (data) => {
  return api.post("/student/register", data);
};

export const registerTeacher = (data) => {
  return api.post("/teacher/register", data);
};

export const loginStudent = (data) => {
  return api.post("/student/login", data);
};

export const loginTeacher = (data) => {
  return api.post("/teacher/login", data);
};
