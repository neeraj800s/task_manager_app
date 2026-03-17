# Full-Stack Task Management Application

A production-ready Full-Stack Task Management Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application provides user authentication, standard CRUD operations for tasks, searching, and filtering functionalities.

## 🚀 Features

### **Backend (Node.js/Express)**
- **User Authentication:** Secure signup and login using JWT and `bcrypt`.
- **Authorization:** Protected routes to safeguard user-specific resources.
- **RESTful API:** Robust and structured API endpoints.
- **Task Management:** Full CRUD (Create, Read, Update, Delete) capability for task lists.
- **Pagination & Filtering:** Performant data retrieval with pagination and search parameters.
- **Security Best Practices:** Including `helmet` for HTTP headers, `cors` for cross-origin requests, JWT via `cookie-parser` for secure sessions, and input validation using `joi`.

### **Frontend (React/Vite)**
- **Modern UI:** Built fully responsive utilizing Tailwind CSS and `lucide-react` icons.
- **State Management & Routing:** Powered by standard React hooks and `react-router-dom`.
- **Form Validation:** Using `react-hook-form` to smoothly handle form controls.
- **API Interactions:** Synchronizer requests utilizing `axios`.
- **Clean Architecture:** Well-organized components and pages.

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Axios, React Router v7, React Hook Form
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), Joi Validation
- **Database:** MongoDB Memory Server (in-memory MongoDB instance for quick assessment setup) and general MongoDB compatibility.

## 📂 Project Structure

```text
├── backend/
│   ├── config/         # Database and server config
│   ├── controllers/    # Request handlers / logic
│   ├── middleware/     # Custom auth and error middlewares
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express API routes
│   └── server.js       # Backend entry point
│
└── frontend/
    ├── src/
    │   ├── assets/     # Static images and icons
    │   ├── components/ # Reusable UI components (Navbar, TaskCard, etc.)
    │   ├── context/    # React context API state management
    │   ├── pages/      # Views (Login, Dashboard, Register, etc.)
    │   ├── App.jsx     # Root application component
    │   └── main.jsx    # React rendering entry
    └── vite.config.js  # Vite bundler configuration
```

## ⚙️ Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (A MongoDB URI or fallback onto local MongoDB memory server if set)
- **Git**

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd task-manager-app
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory based on available config:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_key
     NODE_ENV=development
     ```
   - Start the backend server:
     ```bash
     npm start # or 'node server.js'
     ```

3. **Setup Frontend:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   ```
   - Start the React/Vite development server:
     ```bash
     npm run dev
     ```

4. **View the Application:**
   Open your browser and navigate to `http://localhost:5173`.

## 📜 API Documentation

### **Authentication Endpoints**
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate an existing user returning a JWT cookie
- `POST /api/auth/logout` - Clears the authentication cookies

### **Task Endpoints**
- `POST /api/tasks` - Create a new task (Requires Auth)
- `GET /api/tasks` - Gather all tasks with sorting, search, and pagination (Requires Auth)
- `GET /api/tasks/:id` - Fetch a singular task details (Requires Auth)
- `PUT /api/tasks/:id` - Update task attributes (Requires Auth)
- `DELETE /api/tasks/:id` - Delete an assigned task (Requires Auth)

## 👤 Author 
- **[Your Name/Username]**
