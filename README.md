# JACO Call Center Frontend

Next.js frontend for the Call Center operator workspace. The application is being migrated from presentation-only mock data to the versioned Call Center API in `../api-callcenter`.

## Local development

### Host mode

```bash
cp .env.example .env.local
npm ci
npm run dev
```

The default API URL is `http://localhost:8083/api/v1`. Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` when the API uses another host or port.

### Docker development mode

```bash
cp .env.example .env.local
docker compose -f docker-compose.dev.yml up --build
```

The development container publishes the app at `http://localhost:3000`, mounts source files for hot reload, and keeps dependencies and `.next` in named volumes. The browser calls the API through the host URL, so `localhost:8083` is correct when the API is published by its own Compose stack.

Stop it with:

```bash
docker compose -f docker-compose.dev.yml down
```

### Production image

```bash
docker compose build
docker compose up -d
```

`Dockerfile` builds a Next standalone image. Public Next variables are build-time values; pass them through the Compose environment before building:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8083/api/v1 docker compose build
```

Do not put API or database credentials in frontend variables. Only the public API URL and the optional Yandex Maps key belong here.

## API access and CORS

The API must allow the browser origin. In the API's ignored `.env` configure, for local development:

```dotenv
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Restart or recreate the API container after changing it. Authentication uses a Bearer token returned by `POST /api/v1/auth/token/login`; the frontend stores the operator session in browser session storage and refreshes it before expiry.

## Architecture

The target structure follows Feature-Sliced Design:

- `app` — routes and page composition only;
- `widgets` — composed screen blocks;
- `features` — user actions and workflows;
- `entities` — domain models, API clients, and domain state;
- `shared` — transport, configuration, UI primitives, and utilities.

All feature paths use lowercase names. Domain API clients must live under their entity and must not import page-local mock data. Mock data remains allowed for stories and isolated visual development, but not for runtime screens once their API slice is delivered.

## Verification

```bash
npm run build
npm run test
```

The Docker equivalent is:

```bash
docker compose -f docker-compose.dev.yml run --rm frontend npm run build
docker compose -f docker-compose.dev.yml run --rm frontend npm run test
```

## Current integration status

Authentication transport and session handling are implemented. The remaining runtime migration is tracked in [PLAN.md](./PLAN.md). Until those slices are completed, several screens intentionally render local mock data and are not yet an end-to-end API client.
