# 🔐 JWT Authentication & Authorization System

A full-stack **JWT-based Authentication and Authorization System** built using the **MERN stack**.

The project demonstrates how modern web applications handle:

- User registration
- Secure password hashing
- Login authentication
- JWT access tokens
- Authentication middleware
- Role-based authorization
- Protected frontend routes
- Protected backend APIs
- Student and Teacher roles
- Logout
- React Authentication Context
- Role-based dashboards

The project is designed primarily as a **learning and interview-oriented authentication system**, focusing on understanding the complete authentication and authorization flow from frontend to backend.

---

# 📌 Project Overview

The application supports two different user roles:

- 👨‍🎓 Student
- 👨‍🏫 Teacher

Each role has its own:

- Registration page
- Login page
- MongoDB schema
- Dashboard
- Protected routes
- Authorization rules

Authentication logic is shared between the roles wherever possible to avoid unnecessary code duplication, while the database schemas remain separate for clarity.

---

# 🏗️ Architecture

```text
                         ┌──────────────────┐
                         │      Client      │
                         │   React + Vite   │
                         └────────┬─────────┘
                                  │
                                  │ HTTP / Axios
                                  ▼
                         ┌──────────────────┐
                         │     Express      │
                         │      Server      │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
               Auth Routes   Auth Middleware   Role Middleware
                    │             │             │
                    ▼             ▼             ▼
               Controllers    JWT Verify     RBAC Check
                    │
                    ▼
               ┌──────────────┐
               │   Mongoose   │
               └──────┬───────┘
                      │
              ┌───────┴────────┐
              │                │
              ▼                ▼
        Student Model     Teacher Model
              │                │
              └───────┬────────┘
                      ▼
                 MongoDB

# 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Routing** | React Router |
| **Forms** | React Hook Form |
| **HTTP Client** | Axios |
| **State Management** | React Context API |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT |
| **Password Security** | bcrypt |
| **Authorization** | Role-Based Access Control (RBAC) |
| **API Testing** | Postman |
| **Development Tools** | Nodemon, Git, GitHub |

📁 Project Structure
JWT AuthSys/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   │
│   ├── models/
│   │   ├── student.model.js
│   │   └── teacher.model.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── utils/
│   │   └── getModelByRole.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
│
└── frontend/
    │
    ├── src/
    │   │
    │   ├── components/
    │   │   └── ProtectedRoute.jsx
    │   │
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   │
    │   ├── pages/
    │   │   ├── Landing.jsx
    │   │   │
    │   │   ├── student/
    │   │   │   ├── StudentLogin.jsx
    │   │   │   ├── StudentRegister.jsx
    │   │   │   └── StudentDashboard.jsx
    │   │   │
    │   │   └── teacher/
    │   │       ├── TeacherLogin.jsx
    │   │       ├── TeacherRegister.jsx
    │   │       └── TeacherDashboard.jsx
    │   │
    │   ├── services/
    │   │   └── auth.service.js
    │   │
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── .env
    ├── package.json
    └── vite.config.js



🔄Complete Registration Flow

Student
   │
   ▼
Student Register Page
   │
   ▼
React Hook Form
   │
   ▼
studentRegister()
   │
   ▼
POST /student/register
   │
   ▼
Express Router
   │
   ▼
Auth Controller
   │
   ▼
Student Model
   │
   ▼
Check existing student
   │
   ▼
Hash password
   │
   ▼
Save student
   │
   ▼
Response


🔄Complete Login Flow
Student / Teacher
       │
       ▼
Login Page
       │
       ▼
React Hook Form
       │
       ▼
auth.service.js
       │
       ▼
POST Login API
       │
       ▼
Express Router
       │
       ▼
Auth Controller
       │
       ▼
Find User
       │
       ▼
bcrypt.compare()
       │
       ▼
Generate JWT
       │
       ▼
Return:
   ├── accessToken
   └── user
       │
       ▼
AuthContext.login()
       │
       ▼
Protected Dashboard
