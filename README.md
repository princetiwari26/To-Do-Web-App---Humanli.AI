# **To-Do Web App – Documentation**

## Project Overview

The **To-Do Web App** is a RESTful API built using **React.js, Tailwind CSS, Node.js, and MongoDB**.  
It provides secure authentication, task management, and board-based organization with production-level security practices.

### Features
- User Authentication (JWT-based)
- Board Management
- To-Do CRUD Operations
- Secure API (CORS, Helmet, Rate Limiting)
- Environment-based configuration

---

# **Backend**

### Technology Stack

| Layer | Technology |
|-----|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Security | Helmet, CORS, Rate Limiting |

---

### Backend Architecture

#### Request Flow
Client → Middleware → Routes → Controllers → Models → Database


---

### Folder Structure
```
backend/
│
├── config/
│ └── db.js
│
├── controllers/
│ ├── auth.controller.js
│ ├── board.controller.js
│ └── todo.controller.js
│
├── models/
│ ├── user.model.js
│ ├── board.model.js
│ └── todo.model.js
│
├── routes/
│ ├── auth.routes.js
│ ├── board.routes.js
│ └── todo.routes.js
│
├── middlewares/
│ └── auth.middleware.js
│
├── utils/
│ └── token.js
│
├── .env
├── .gitignore
├── index.js
└── package.json
```


---

### Backend Setup

#### 1. Initialize Node Project
```
npm init -y
```

#### 2. Install Dependencies
```
npm install express mongoose dotenv cors helmet express-rate-limit bcryptjs jsonwebtoken
```

#### 3. Install Dev Dependency
```
npm install --save-dev nodemon
```

### Installed Packages Explained
- ### express
    Backend framework to create REST APIs

- ### mongoose
    1. MongoDB Object Data Modeling (ODM)
    2. Schema & model management

- ### dotenv
    Loads environment variables from .env file

    .env

    ```
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/taskflow
    JWT_SECRET=secret_key
    JWT_EXPIRES_IN=7d
    FRONTEND_URL=http://localhost:3000
    ```

- ### cors
    1. Controls frontend access to backend APIs
    2. Prevents unauthorized cross-origin requests
       

    ```
    app.use(
        cors({
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        })
    );
    ```

- ### helmet
    1. Adds secure HTTP headers
    2. Protects from XSS, clickjacking, and MIME sniffing

- ### express-rate-limit
    1. Prevents brute-force & DDoS attacks
    2. Limits repeated API requests
       

    ```
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    });
    ```

- ### bcryptjs
    1. Hashes passwords securely
    2. Prevents plain-text password storage


- ### jsonwebtoken
    1. Creates and verifies JWT tokens
    2. Used for protected routes

### Server Entry Point (index.js)
#### Responsibilities:

- Load environment variables
- Apply middlewares
- Connect database
- Register API routes
- Start server


### Authentication Flow (JWT)
```
User Login/Register
  ↓
Password Hashed (bcrypt)
  ↓
JWT Generated
  ↓
Token Sent to Client
  ↓
Token Verified on Protected Routes
```

### API Endpoints
### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Boards
```
POST   /api/boards
GET    /api/boards
PUT    /api/boards/:id
DELETE /api/boards/:id
```

### Todos
```
POST   /api/todos
GET    /api/todos
PUT    /api/todos/:id
DELETE /api/todos/:id
```

### Security Features
- CORS Protection
- Helmet Headers
- Rate Limiting
- JWT Authentication
- Password Hashing

---


# **Frontend**

It handles:
- User authentication (JWT-based)
- Board & To-Do management UI
- Protected routes
- API communication
- Responsive design

---

## Technology Stack

| Layer | Technology |
|-----|-----------|
| Framework | React.js |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Auth Utility | jwt-decode |
| Icons | lucide-react |
| Styling | Tailwind CSS |
| Build Tool | react-scripts |
| Testing | React Testing Library |

---

## Folder Structure (Recommended)
```
frontend/
│
├── public/
│ └── vite.svg
│
├── src/
│ ├── api/
│ │ └── api
│ │
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── TodoModal.jsx
│ │ └── BoardModal
│ │
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── BoardDetail.jsx
│ │ └── Board.jsx
│ │
│ ├── context/
│ │ └── AuthContext.jsx
│ │ └── ToastContext.jsx
│ │
│ ├── App.js
│ └── index.js
│
├── tailwind.config.js
├── postcss.config.js
└── package.json
```


---

###  Frontend Setup

#### 1. Create React App
```
npx create-react-app frontend
cd frontend
```
#### 2. Install Dependencies
```
npm install axios react-router-dom jwt-decode lucide-react
```

#### 3. Install Tailwind CSS
```
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

#### Update tailwind.config.js:
```
content: ["./src/**/*.{js,jsx}"],
```
#### Add to index.css:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
### Dependencies Explained
- ### Core library for building UI components

- ### react-dom

    Renders React components to the browser DOM

- ### react-router-dom

    Handles client-side routing

    Used for public & protected routes

- ### axios

    HTTP client for API communication
    
    Handles requests to backend

    Example:
    ```
    axios.post("/api/auth/login", data);
    ```
- ### jwt-decode

    Decodes JWT token on frontend

    Extracts user info (id, email, expiry)

- ### lucide-react

    Icon library used for UI enhancement

    Lightweight and customizable

- ### web-vitals

    Measures performance metrics

## Styling – Tailwind CSS
Why Tailwind?

- Utility-first
- Fast UI development
- No CSS class conflicts
- Production-ready
- Dev Dependencies:
    ```
    tailwindcss
    postcss
    autoprefixer
    ```

---

### Authentication Flow (Frontend)
```
User Login
  ↓
JWT received from backend
  ↓
Token stored (localStorage)
  ↓
Token decoded using jwt-decode
  ↓
Protected routes enabled
```

### Protected Routes Example
```
if (!token) {
  return <Navigate to="/login" />;
}
```

### API Communication Strategy

- Axios instance with base URL
- Authorization header with JWT token

    Example:
```
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
```

### Available Scripts
```
npm start     # Runs development server
npm build     # Creates production build
npm test      # Runs test cases
npm eject     # Ejects CRA config (irreversible)
```