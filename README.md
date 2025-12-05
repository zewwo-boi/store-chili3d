# Store Chili3d

## Getting Started

### Prerequisites

- Node.js
- pnpm
- Docker

### Installation

1. Clone the repository
2. Install dependencies (`pnpm i`)
3. Copy `/.env.example` to `/.env` or `/.env.development.local`, and configure PostgreSQL

### Development

Start PostgreSQL and migrate:

```bash
docker compose up
pnpm run migrate:up
```

Start the development server:

```bash
pnpm run start:dev
```

### Microservices

The database and the API may be separated. To do this, simply define the PostgreSQL URI as individual environment variables defined in `.env.example`.
