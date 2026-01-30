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

### Application Screenshots

Below are some screenshots showcasing the core features and UI of the application.

---

#### Register Page
User registration interface with validation and clean UI.

![Register Page](https://instasize.com/api/image/065e4848a1b2cbb4aff7a6c7b3e16bf3f63d44ce1a0f5fa0ac65eed2f3335d96.png)

---

#### Login Page
Secure login page for existing users.

![Login Page](https://instasize.com/api/image/2ad81d9b563d59af57b86066ba865062ab7dad6cf0256fce009f7d38fdc61320.png)

---

#### Empty Boards Page
Displayed when no boards are created yet.

![Empty Boards](https://instasize.com/api/image/afe4f34db8830841f764d97380505020fbf235929aa863c976a9475d51df8185.png)

---

#### Create / Edit Board Modal
Modal to create or edit a board with name, description, and color selection.

![Board Modal](https://instasize.com/api/image/ab11d130549fe48fe0f1c2a52dc48e92b7977474b3220f693e5397f4de31c121.png)

---

#### Boards List
List of all boards with progress indicators and actions.

![Boards List](https://instasize.com/api/image/b5bb1086c13ad4ade67ceac9632e3e6cc0d351e823d1bd3486720c979fc45213.png)

---

#### Empty Board Detail Page (No Todos)
Board detail view when no todos are added.

![Empty Board Detail](https://instasize.com/api/image/4aef6a994d6dd6bb1a0c21f31015d5b26113bea85c05545752cbfdc44984f0f9.png)

---

#### Add / Edit Todo Modal
Modal to add or edit todos with priority and due date.

![Add Todo Modal](https://instasize.com/api/image/32bbc02f6c0ffec80d9decc01b7107b0259009d9844ca2ac28a3b45d4165c60d.png)

---

#### Todo List
List of all todos with progress indicators and actions.

![Todo List](https://instasize.com/api/image/38e0868a0ac012d0e6dc65ac996a74494c8d07a476a59bcb5a078c2d8b429b11.png)

---

#### Toast Notifications
Toast messages for actions like create, update, delete.

![Toast Notification](https://instasize.com/api/image/13bd4564a984a0394f1e3c92176ec542ea29ee17900c5c2953d60bf66cd12f7f.png)

---

#### Undo Delete Feature
Undo option shown after deleting a board or todo.

![Undo Feature](https://instasize.com/api/image/a09f03b14a14c1ef789d211255ff21e3f08b8d89aaf926610a4a09e001a36659.png)

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

## Steps to Run the Project Locally

Follow the steps below to run the project on your local machine.

---

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or above recommended)
- **npm** (comes with Node.js)
- **MongoDB** (running locally)
- **Git**

---

### 1. Clone the Repository

```
git clone https://github.com/princetiwari26/To-Do-Web-App---Humanli.AI.git
cd To-Do-Web-App---Humanli.AI
```
### 2. Backend Setup
```
cd backend
npm install
```

#### Create .env file inside backend folder
```
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/todowebapp
JWT_SECRET=secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

#### Start Backend Server
```
npm start
```

#### Backend will run on:

http://localhost:8000

### 3. Frontend Setup

#### Open a new terminal window:
```
cd frontend
npm install
```

#### Create .env.local file inside frontend folder
```
VITE_BACKEND_API_URL=http://localhost:8000/api
```

#### Start Frontend Server
```
npm run dev
```

#### Frontend will run on:

http://localhost:5173

### 4. Access the Application

Open your browser and visit:

http://localhost:5173

### Notes

- Ensure MongoDB is running before starting the backend.
- Backend must be started before frontend.
- Default API base URL is configured using environment variables.

## All set! Setup successful. You're ready to explore the application.

---