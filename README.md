# Music Streaming Dashboard

A music dashboard with a React, Vite, and Tailwind CSS frontend and a Node.js/Express API.

## Requirements

- Node.js and npm

## Run the backend

```powershell
cd server
npm install
npm run dev
```

The API runs at `http://localhost:5000`. The songs API is available at
`http://localhost:5000/api/songs`.

## Run the frontend

In a second terminal:

```powershell
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal (typically `http://localhost:5173`).
Keep the backend running while using the Songs page.

## Songs API

The API supports listing, creating, updating, and deleting songs:

- `GET /api/songs`
- `GET /api/songs/:id`
- `POST /api/songs`
- `PUT /api/songs/:id`
- `DELETE /api/songs/:id`

Each song has a `title`, `artist`, and `genre`. The current backend keeps songs
in memory, so changes reset when the server restarts.
