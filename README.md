# Notes App - Open Source Contest

A simple notes app where users can **sign up, log in, add notes, view notes and delete notes**.

This repository has some **intentional bugs**. Your job is to find them, fix them and send a Pull Request.
The list of open bugs is in the **Issues** tab of this repository.

## Tech Stack

| Part     | Technologies                                   |
| -------- | ---------------------------------------------- |
| Backend  | Node.js, Express.js, MongoDB (Mongoose), JWT   |
| Frontend | React (Vite), Redux Toolkit, React Router      |

## Folder Structure

```
notes-app-contest/
├── backend/
│   ├── config/db.js            # MongoDB connection
│   ├── controllers/            # Logic for each route
│   ├── middleware/auth.js      # Checks the login token
│   ├── models/                 # User and Note schemas
│   ├── routes/                 # API routes
│   └── server.js               # Starting point of the server
└── frontend/
    └── src/
        ├── components/         # Navbar, NoteForm, NoteItem, ProtectedRoute
        ├── pages/              # Login, Signup, Dashboard
        ├── store/              # Redux Toolkit store and slices
        ├── api.js              # Axios setup
        └── App.jsx             # Routes
```

## How to Run

You need **Node.js** and **MongoDB** installed (or a free MongoDB Atlas link).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env     # on Windows: copy .env.example .env
npm run dev
```

The backend runs on http://localhost:5000

### 2. Frontend (open a new terminal)

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on http://localhost:5173

## API Endpoints

| Method | Endpoint            | Login needed | What it does           |
| ------ | ------------------- | ------------ | ---------------------- |
| POST   | /api/auth/signup    | No           | Create a new account   |
| POST   | /api/auth/login     | No           | Login and get a token  |
| GET    | /api/notes          | Yes          | Get your notes         |
| POST   | /api/notes          | Yes          | Add a new note         |
| DELETE | /api/notes/:id      | Yes          | Delete one of your notes |

## How to Contribute

1. **Fork** this repository.
2. **Clone** your fork to your computer.
3. Pick **one issue** from the Issues tab and comment on it: "I would like to work on this".
4. Wait until the issue is assigned to you.
5. Create a new branch: `git checkout -b fix/issue-number-short-name`
6. Fix the bug and test it by running the app.
7. Commit: `git commit -m "Fix: short description (closes #issue-number)"`
8. Push and open a **Pull Request** to this repository.
9. In the PR description, explain **what was wrong** and **how you fixed it**.

### Rules

- One issue = one Pull Request.
- Only change the files needed for the issue.
- Do not commit `node_modules` or your `.env` file.
- Be kind and respectful in comments and reviews.

Happy coding!
