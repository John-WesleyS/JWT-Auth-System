# 🔐 JWT Authentication & Authorization System

A full-stack **JWT-based Authentication and Authorization System** built using the **MERN stack**, featuring secure refresh token, role-based access control, and client + server-side input validation.


## ✨ Features

- 👨‍🎓 **Dual-role system** — separate Student and Teacher registration, login, and dashboards
- 🔑 **JWT access tokens** — short-lived (1hr), sent via `Authorization: Bearer` header
- 🔄 **Refresh token rotation** — long-lived (7d) refresh tokens stored in **httpOnly cookies**, with automatic silent refresh on the frontend when the access token expires — no forced re-login
- 🛡️ **Session revocation** — refresh tokens are tracked per-user in the database, so logout (or a future "log out all devices" feature) can actually invalidate a session server-side, not just client-side
- 🔒 **Password hashing** — bcrypt, never stored or transmitted in plain text
- 🎭 **Role-Based Access Control (RBAC)** — middleware-enforced separation between Student and Teacher permissions
- ✅ **Input validation** — React Hook Form on the frontend (email format, password strength, ID formats, numeric ranges) backing up server-side checks
- 🍪 **Secure cookie handling** — `httpOnly`, `sameSite: strict`, and `secure` in production
- 🧭 **Protected routes** — both frontend (React Router guards) and backend (Express middleware)
- 📊 **Role-based dashboards** — distinct views for Student and Teacher accounts

---

## 🏗️ Architecture

```text
                         ┌──────────────────┐
                         │      Client      │
                         │   React + Vite   │
                         └────────┬─────────┘
                                  │
                                  │ HTTP / Axios (withCredentials)
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
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Routing** | React Router |
| **Forms & Validation** | React Hook Form |
| **HTTP Client** | Axios (with request/response interceptors) |
| **State Management** | React Context API |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (access + refresh tokens) |
| **Password Security** | bcrypt |
| **Cookie Handling** | cookie-parser (httpOnly refresh token cookies) |
| **Authorization** | Role-Based Access Control (RBAC) |
| **API Testing** | Postman |
| **Development Tools** | Nodemon, Git, GitHub |

---

## 📁 Project Structure

```text
JWT AuthSys/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── auth.controller.js        # register, login, logout, refreshToken
│   ├── middlewares/
│   │   ├── auth.middleware.js        # verifies access token
│   │   └── role.middleware.js        # RBAC checks
│   ├── models/
│   │   ├── student.js
│   │   └── teacher.js
│   ├── routes/
│   │   └── auth.routes.js
│   ├── utils/
│   │   ├── jwt.js                    # generate/verify access + refresh tokens
│   │   ├── password.js               # bcrypt hash/compare
│   │   └── modelResolver.js          # resolves Student/Teacher model by role
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   │   └── AuthContext.jsx       # user + token state, login/logout
    │   ├── pages/
    │   │   ├── Landing.jsx
    │   │   ├── student/
    │   │   │   ├── StudentLogin.jsx
    │   │   │   ├── StudentRegister.jsx
    │   │   │   └── StudentDashboard.jsx
    │   │   └── teacher/
    │   │       ├── TeacherLogin.jsx
    │   │       ├── TeacherRegister.jsx
    │   │       └── TeacherDashboard.jsx
    │   ├── routes/
    │   │   └── ProtectedRoute.jsx
    │   ├── services/
    │   │   ├── api.js                # axios instance, token attach + auto-refresh
    │   │   └── auth.service.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── package.json
```

---

## 🔄 Authentication Flow

### Registration
```
User → Register Form (React Hook Form validation)
     → POST /:role/register
     → Check existing user → Hash password (bcrypt) → Save to DB
     → Response
```

### Login
```
User → Login Form
     → POST /:role/login
     → Find user → bcrypt.compare()
     → Generate accessToken (1hr) + refreshToken (7d)
     → Save refreshToken on user document
     → Set refreshToken as httpOnly cookie
     → Return accessToken + user in response body
     → AuthContext stores accessToken in memory
```

### Token Refresh (silent, automatic)
```
Access token expires → API call returns 401
     → Axios interceptor catches it
     → POST /refresh (refreshToken cookie sent automatically by browser)
     → Backend verifies token + matches DB record
     → New accessToken issued
     → Original request retried automatically
     → User never sees an interruption
```

### Logout
```
POST /logout
     → refreshToken in DB set to null (session revoked server-side)
     → Cookie cleared
     → Client state (user, accessToken) cleared
```

---

## 🔐 Security Notes

- **Access tokens** live only in memory (React state), never in `localStorage`, reducing exposure to XSS
- **Refresh tokens** live in `httpOnly` cookies, invisible to JavaScript, reducing exposure to XSS
- **DB-tracked refresh tokens** mean a session can be revoked (via logout) even before the token's natural expiry — signature validity alone isn't enough to keep a session alive
- Passwords are never stored or logged in plain text


## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/student/register` | Register a new student |
| `POST` | `/student/login` | Log in as a student |
| `POST` | `/teacher/register` | Register a new teacher |
| `POST` | `/teacher/login` | Log in as a teacher |
| `POST` | `/refresh` | Get a new access token using the refresh token cookie |
| `POST` | `/logout` | Revoke the refresh token and clear the session |

---

