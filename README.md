# 📝 MERN Blog Website

A full-stack blog web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** that allows users to register, login, create blog posts, edit, and delete them. Includes secure authentication and responsive UI.


## 🚀 Features

- 🔐 User Authentication (Register / Login / Logout)
- 📝 Create, Edit, Delete Blogs
- 🌐 Responsive Frontend UI
- 🖼️ Image Upload Support
- 🗂️ Blog Listing and Single Post View
- 📅 Timestamp and Author Details on Posts

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt.js (for password hashing)
- Multer (for image upload)

---

## 📁 Folder Structure

```
MERN-Blog-Website/
├── backend/          # Node.js + Express + MongoDB API
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── index.js
├── frontend/         # React client
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/avadhutmali/MERN-Blog-Website.git
cd MERN-Blog-Website
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

> Create a `.env` file in the `backend/` directory:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

Backend runs at `http://localhost:4000`

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---


## 📌 TODOs

- [ ] Comment system
- [ ] Pagination
- [ ] Categories & Tags
- [ ] Rich text editor (e.g., TipTap, Quill)
- [ ] Deploy on Render / Vercel

---

## 👤 Author

**Avadhut Mali**  
[GitHub](https://github.com/avadhutmali)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
