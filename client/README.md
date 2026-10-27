# TaskDuty

TaskDuty is a task manager with a React/Vite client and an Express/MongoDB API.

## Setup

1. Install dependencies in both folders:

   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

2. Copy `client/.env.example` to `client/.env` and `server/.env.example` to
   `server/.env`. Set `MONGODB_URI` to your local MongoDB instance or a MongoDB
   Atlas connection string. Never commit `.env` files.

3. Start the API from the `server` folder:

   ```sh
   npm run dev
   ```

4. In a separate terminal, start the client from the `client` folder:

   ```sh
   npm run dev
   ```

The client proxies `/api` requests to `http://localhost:6741` by default.
Change `VITE_API_PROXY_TARGET` in `client/.env` if the API runs elsewhere.
`VITE_API_URL` can be set to a full API base URL when not using the Vite proxy.

## Available scripts

- Client: `npm run dev`, `npm run build`, `npm run lint`
- Server: `npm run dev`

The API exposes task creation/listing at `/api/tasks`, and task retrieval,
updates, and deletion at `/api/tasks/:id`.
