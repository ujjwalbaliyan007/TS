# TS — A Simple User Auth Web App  
*(Sign Up · Sign In · Dashboard with Edit Profile)*

## 🚀 Project Overview  
This web application provides a simple flow for users to sign up, sign in, view their dashboard (with profile information) and edit their information. The app consists of:  
- A **frontend** built with TypeScript, React & Vite, with responsive design.  
- A **backend API** providing authentication (signup/login), user data retrieval and update.  
- Input validation on both client and server.  
- Basic unit tests for critical flows to ensure reliability.  
- Clear documentation for setup and usage.

## 🧩 Tech Stack  
| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + TypeScript + Vite | Fast, modern UI development |
| Backend | (your chosen stack) e.g. Node.js + Express + TypeScript | REST API endpoints |
| Database | (e.g. PostgreSQL / MongoDB) | Persistence for user data |
| Authentication | JWT (JSON Web Tokens) | Secure user sessions |
| Testing | Jest / React Testing Library / SuperTest | Unit tests for frontend & backend |
| Styling | (e.g. Tailwind CSS / Bootstrap) | Responsive UI across devices |

## 📂 Folder Structure  
```

TS/
├── backend/                     # Backend API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── tests/
│   └── server.ts
│
├── frontend/                    # Frontend (React + TS + Vite)
│   ├── src/
│   │   ├── pages/              # SignIn, SignUp, Dashboard
│   │   ├── components/
│   │   ├── services/           # API calls
│   │   └── tests/
│   ├── public/
│   ├── vite.config.ts
│   └── index.html
│
├── .env.example                 # Environment variable template
└── README.md

```
## Features

- Email/password sign-up & sign-in with simple token auth (user id stored in `localStorage`)
- Protected dashboard route with AuthContext-powered guard and loading state
- Profile view/edit (name + bio) with optimistic client update
- `/api` proxy baked into Vite config so the client uses relative paths during development
- Health check at `/api/health` (via Express app) for quick container/ping diagnostics
## Prerequisites

- Node.js ≥ 18 (uses ES modules + Vite 7 / Express 5)
- npm ≥ 9

## ⚙️ Setup Instructions

## Installation

```bash
cd /Users/ujjwalbaliyan/Desktop/JS/Ts
npm install --prefix server
npm install --prefix client
```
## Running the App 

Open two terminals—one for the API, one for the client:

```bash
# Terminal A - API
cd /Users/ujjwalbaliyan/Desktop/JS/Ts/server
npm run dev

# Terminal B - Client
cd /Users/ujjwalbaliyan/Desktop/JS/Ts/client
npm run dev
```

- API: http://localhost:3000
- Client: http://localhost:5173 (Vite picks another port if 5173 is taken)
- Vite dev server proxies `/api/*` requests to the Express server automatically.
### Production Builds

```bash
# Server (transpile to dist/)
cd server && npm run build && npm start

# Client (build static assets)
cd client && npm run build && npm run preview
```

## API Reference

All routes are prefixed with `/api`.

| Method | Endpoint          | Description                    | Body                                         | Auth Header      |
| ------ | ----------------- | ------------------------------ | -------------------------------------------- | ---------------- |
| POST   | `/auth/signup`    | Create user                    | `{ name, email, password }`                  | —                |
| POST   | `/auth/signin`    | Login, returns `{ token }`     | `{ email, password }`                        | —                |
| GET    | `/user/me`        | Fetch current profile          | —                                            | `Authorization: <token>` |
| PUT    | `/user/me`        | Update name/bio                | `{ name?, bio? }`                            | `Authorization: <token>` |

> **Note:** Tokens are just user IDs returned by the in-memory store. For production, swap this for JWTs and persistence.

## Testing

- **Client:** Vitest + React Testing Library (`cd client && npm run test`) – see `src/tests/*`.
- **Server:** Jest config and sample tests live under `server/src/tests`, but the npm test script currently just exits; hook Jest up when ready.

## Troubleshooting

- If the client cannot reach the API, confirm the server is on port 3000 and that Vite is running—the proxy relies on both.
- Clearing `localStorage` resets auth tokens: open DevTools → Application → Local Storage → delete `token`.
- Since users live in-memory, restarting the server wipes all accounts; re-run the sign-up flow to repopulate.


