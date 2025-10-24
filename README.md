# Express Learning Project

A self-contained Express.js project designed for learning. It demonstrates:

- Project structure (controllers, routes, middleware, models, views, public)
- Express configuration and middleware (helmet, cors, morgan)
- EJS templating and static file serving
- A small JSON REST API with validation (express-validator)
- Error handling and 404 pages
- Simple in-memory data model (no DB required)
- Tests with Jest + Supertest
- Dockerfile for containerization

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and (optionally) edit:

```bash
cp .env.example .env
# edit .env as needed (PORT, NODE_ENV)
```

3. Run the server:

```bash
npm start
# or in development with autoreload:
npm run dev
```

Open http://localhost:3000 (or the PORT you set) in your browser.

## API Examples

- `GET /api/health` — check uptime and status
- `GET /api/users` — list users
- `GET /api/users/:id` — get a user by id
- `POST /api/users` — create a user (JSON body: `{ "name": "Your Name", "email": "you@example.com" }`)
- `PUT /api/users/:id` — update a user (partial)
- `DELETE /api/users/:id` — delete a user

Example with `curl`:

```bash
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" \
  -d '{"name":"Charlie", "email":"charlie@example.com"}'
```

## Tests

Run tests with:

```bash
npm test
```

A basic integration test is included (uses Jest + Supertest).

## Docker

Build and run with:

```bash
docker build -t express-learning .
docker run -p 3000:3000 --env-file .env express-learning
```

## Notes for learners

- This project uses an in-memory model for simplicity. In production you'd use a database.
- Check `src/middleware/validate.js` to see how express-validator is wired.
- Edit `src/models/userModel.js` to experiment with persistence layers.
- Use `npm run dev` with nodemon to see hot reload during development.

Have fun learning Express! 🎉
