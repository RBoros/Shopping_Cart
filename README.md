# Shopping Cart Service

**Author:** Raymond Okolo
**Date Started:** December 22, 2025
**Date Modified:** September 25, 2026

## Overview

A RESTful **shopping cart microservice** built with **Node.js**, **Express**,
and **SQLite**. It exposes endpoints for retrieving, adding, updating, and
removing items from a user's cart, and is organized as a layered service
following a **routes → controller → service → repository** architecture.

## Project Structure

```
Shopping-Cart-Project/
├── dockerfile                    # Container build definition
├── Group3.yaml                   # OpenAPI 3.1 spec for the Cart API
├── db.sqlite                     # SQLite database file
├── package.json / package-lock.json
└── src/
    ├── app.js                    # Express app setup + route mounting
    ├── server.js                 # Entry point — loads env vars, starts the server
    ├── config/
    │   └── database.js           # SQLite connection + schema (carts, cart_items)
    ├── api/
    │   ├── routes/
    │   │   └── cart.routes.js    # Route definitions for /api/cart
    │   └── controllers/
    │       └── cart.controller.js # Request/response handling
    ├── services/
    │   └── cart.service.js       # Business logic layer
    ├── repositories/
    │   └── cart.repository.js    # Direct SQLite queries
    └── database/
        └── seeds/
            └── seed.js           # Populates the DB with fake carts/items
```

## Architecture

Requests flow through four layers, each with a single responsibility:

1. **Routes** (`cart.routes.js`) — maps HTTP verbs/paths to controller methods.
2. **Controller** (`cart.controller.js`) — parses the request, calls the
   service layer, and shapes the HTTP response (status codes, JSON body).
3. **Service** (`cart.service.js`) — business logic, e.g. deleting a cart
   item automatically when its quantity drops to zero.
4. **Repository** (`cart.repository.js`) — the only layer that talks to
   SQLite directly, using parameterized queries.

## Data Model

Two tables, created automatically on startup (`config/database.js`):

- **`carts`** — `cart_id` (PK), `user_id` (unique), `created_at`, `added_at`
- **`cart_items`** — `cart_item_id` (PK), `cart_id` (FK → `carts`, cascade
  delete), `product_id`, `quantity`, `added_at`, with a uniqueness
  constraint on `(cart_id, product_id)`

Cart and cart-item IDs are derived deterministically, e.g. `cart_<user_id>`
and `<cart_id>_item_<product_id>`.

## API Endpoints

All endpoints are mounted under `/api/cart` and expect a `user_id` in the
request body (see `Group3.yaml` for the full OpenAPI spec).

| Method | Path                      | Description                              |
|--------|---------------------------|-------------------------------------------|
| GET    | `/api/cart`                | Get the current user's cart and its items |
| POST   | `/api/cart/items`           | Add an item to the cart (increments quantity if it already exists) |
| PUT    | `/api/cart/items/:productId`| Update an item's quantity (deletes the item if quantity ≤ 0) |
| DELETE | `/api/cart`                 | Clear the entire cart                     |
| DELETE | `/api/cart/items/:productId`| Remove a single item from the cart        |

Any unmatched route returns a `404` with `{ "error": "Endpoint not found" }`.

## Running Locally

```bash
npm install
npm run seed     # populates the DB with 3 fake carts / 9 fake cart items
npm start        # or `npm run dev` for nodemon auto-reload
```

The server listens on `process.env.PORT`, defaulting to **8080** locally
(the Dockerfile overrides this to **3000**).

## Running with Docker

```bash
docker build -t shopping-cart-service .
docker run -p 3000:3000 shopping-cart-service
```

The container seeds the database and starts the server on boot
(`npm run seed && npm start`), and exposes port **3000**.

## API Specification

`Group3.yaml` contains an OpenAPI 3.1 definition of the cart endpoints
(request/response schemas and examples) and can be imported directly into
tools like Postman or Swagger UI.

## Notes

- `.env` is used for configuration (e.g. `PORT`) via `dotenv`, and is
  git-ignored along with `node_modules` and `/build`.
- The seed script (`src/database/seeds/seed.js`) wipes existing `carts` and
  `cart_items` data before inserting fresh fake data — don't run it against
  data you want to keep.
