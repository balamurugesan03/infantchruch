# Infant Jesus Church — MERN CMS

Full-stack CMS for Infant Jesus Church, Puthenkad, Neyyattinkara Diocese.

## Tech Stack
- **Frontend**: React 18 + Mantine UI v7 + Framer Motion + React Router v6
- **Backend**: Node.js + Express + Mongoose
- **Database**: MongoDB
- **Auth**: JWT + bcryptjs
- **File Upload**: Multer (local storage)

---

## Project Structure

```
chruch/
├── backend/
│   ├── controllers/      # Business logic
│   ├── middleware/        # auth + multer upload
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routers
│   ├── uploads/           # Uploaded images (auto-created)
│   ├── seed.js            # Database seeder
│   ├── server.js          # Entry point
│   └── .env
└── frontend/
    ├── src/
    │   ├── admin/         # Admin panel pages
    │   ├── components/    # Shared components
    │   ├── context/       # Auth context
    │   ├── pages/         # Public pages
    │   └── services/      # Axios API layer
    └── vite.config.js
```

---

## Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- npm

---

## Setup & Run

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

Backend `.env` is already configured for local MongoDB. Edit if needed:
```
MONGO_URI=mongodb://localhost:27017/infant_jesus_church
JWT_SECRET=infant_jesus_church_super_secret_key_2024
PORT=5000
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- Admin: `admin@infantjesuschurch.com` / `admin123`
- Home page content
- About page content
- Sample events

### 4. Start the App

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open in Browser

| URL | Description |
|-----|-------------|
| http://localhost:5173 | Public website |
| http://localhost:5173/admin | Admin panel |
| http://localhost:5000/api/health | API health check |

---

## Admin Credentials

```
Email:    admin@infantjesuschurch.com
Password: admin123
```

**Change these immediately in production!**

---

## Admin Panel Features

| Page | What you can do |
|------|----------------|
| Dashboard | Overview stats |
| Home Page | Edit hero, sections, mass timings |
| About Page | Edit history, mission, diocese info |
| Gallery | Upload/delete images, categorize |
| Events | CRUD for events and feasts |
| Messages | View/delete contact form submissions |

---

## API Endpoints

### Public
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/pages/:slug | Get page content (home/about) |
| GET | /api/gallery | Get gallery images |
| GET | /api/events | Get upcoming events |
| POST | /api/contact | Submit contact form |

### Admin (requires JWT)
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/login | Admin login |
| PUT | /api/pages/:slug | Update page content |
| POST | /api/gallery | Upload image |
| DELETE | /api/gallery/:id | Delete image |
| POST | /api/events | Create event |
| GET | /api/contact | Get all messages |

---

## Production Notes

1. Set `MONGO_URI` to your MongoDB Atlas connection string
2. Set a strong `JWT_SECRET`
3. Use Cloudinary or AWS S3 instead of local uploads
4. Run `npm run build` in frontend and serve with nginx/PM2
5. Change admin password after first login
