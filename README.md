<<<<<<< HEAD
# Task Management App

> 🇬🇧 [English](#english) | 🇮🇩 [Bahasa Indonesia](#bahasa-indonesia)

---

## English

A fullstack collaborative task management application built with React + Vite (frontend) and Node.js + Express + MongoDB (backend). Features include JWT authentication, Kanban board with drag-and-drop, real-time collaboration via Socket.io, dark mode, and toast notifications.

### Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, Socket.io-client, React Router, Axios

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Socket.io, bcrypt

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster
- npm (bundled with Node.js)

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd task-management-app
```

#### 2. Install backend dependencies

```bash
cd backend && npm install
```

#### 3. Install frontend dependencies

```bash
cd frontend && npm install
```

### Environment Variable Configuration

#### Backend

Copy the example file and fill in your values:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
# MongoDB connection string (Atlas or local)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager

# JWT secret key — use a long, random string in production
JWT_SECRET=your_jwt_secret_key_here

# Server port
PORT=5000

# Frontend URL for CORS (use your Vercel URL in production)
CLIENT_URL=http://localhost:5173
```

#### Frontend

Copy the example file and fill in your values:

```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000
```

### Running Locally

Open two terminal windows and run each service separately.

**Backend** (runs on `http://localhost:5000`):

```bash
cd backend && npm run dev
```

**Frontend** (runs on `http://localhost:5173`):

```bash
cd frontend && npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Deployment

#### Frontend — Vercel

1. Push the `frontend/` folder (or the whole repo) to GitHub.
2. Import the project in [Vercel](https://vercel.com) and set the root directory to `frontend/`.
3. Add the environment variable `VITE_API_URL` pointing to your deployed backend URL.
4. Vercel will handle SPA routing automatically via `frontend/vercel.json`.

#### Backend — Railway / Render

1. Create a new service on [Railway](https://railway.app) or [Render](https://render.com) and connect your repository.
2. Set the root directory to `backend/` and the start command to `npm start`.
3. Add the following environment variables in the platform dashboard:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `JWT_SECRET` — a strong random secret
   - `PORT` — typically set automatically by the platform
   - `CLIENT_URL` — your deployed Vercel frontend URL (for CORS)

---

## Bahasa Indonesia

Aplikasi manajemen tugas fullstack yang mendukung kolaborasi, dibangun dengan React + Vite (frontend) dan Node.js + Express + MongoDB (backend). Fitur meliputi autentikasi JWT, papan Kanban dengan drag-and-drop, kolaborasi real-time via Socket.io, dark mode, dan notifikasi toast.

### Teknologi yang Digunakan

**Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, Socket.io-client, React Router, Axios

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Socket.io, bcrypt

### Prasyarat

- [Node.js](https://nodejs.org/) v18 atau lebih tinggi
- [MongoDB](https://www.mongodb.com/) — instance lokal atau cluster [MongoDB Atlas](https://www.mongodb.com/atlas)
- npm (sudah termasuk dalam instalasi Node.js)

### Instalasi

#### 1. Clone repositori

```bash
git clone <repository-url>
cd task-management-app
```

#### 2. Install dependensi backend

```bash
cd backend && npm install
```

#### 3. Install dependensi frontend

```bash
cd frontend && npm install
```

### Konfigurasi Environment Variable

#### Backend

Salin file contoh dan isi nilainya:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
# String koneksi MongoDB (Atlas atau lokal)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager

# Kunci rahasia JWT — gunakan string acak yang panjang di production
JWT_SECRET=your_jwt_secret_key_here

# Port server
PORT=5000

# URL frontend untuk CORS (gunakan URL Vercel di production)
CLIENT_URL=http://localhost:5173
```

#### Frontend

Salin file contoh dan isi nilainya:

```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:

```env
# URL API backend
VITE_API_URL=http://localhost:5000
```

### Menjalankan Secara Lokal

Buka dua jendela terminal dan jalankan masing-masing layanan secara terpisah.

**Backend** (berjalan di `http://localhost:5000`):

```bash
cd backend && npm run dev
```

**Frontend** (berjalan di `http://localhost:5173`):

```bash
cd frontend && npm run dev
```

Kemudian buka [http://localhost:5173](http://localhost:5173) di browser.

### Deployment

#### Frontend — Vercel

1. Push folder `frontend/` (atau seluruh repo) ke GitHub.
2. Import proyek di [Vercel](https://vercel.com) dan atur root directory ke `frontend/`.
3. Tambahkan environment variable `VITE_API_URL` yang mengarah ke URL backend yang sudah di-deploy.
4. Vercel akan menangani SPA routing secara otomatis melalui `frontend/vercel.json`.

#### Backend — Railway / Render

1. Buat layanan baru di [Railway](https://railway.app) atau [Render](https://render.com) dan hubungkan repositori.
2. Atur root directory ke `backend/` dan start command ke `npm start`.
3. Tambahkan environment variable berikut di dashboard platform:
   - `MONGODB_URI` — string koneksi MongoDB Atlas
   - `JWT_SECRET` — kunci rahasia yang kuat
   - `PORT` — biasanya diatur otomatis oleh platform
   - `CLIENT_URL` — URL frontend Vercel yang sudah di-deploy (untuk CORS)
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 2e80f804382953ece52f61db883bf346e7dfad86
