# StatSport: Stationery & Sports Store

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) ![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

A website for a stationery and sports equipment store, with a product catalogue, cart, contact form and simple admin panel on a Node.js/Express backend.

## Features

- Product catalogue for stationery and sports equipment
- Add-to-cart API
- Contact form, with customer queries saved to `data/queries.json`
- Animated "Our Impact" statistics counters
- Admin login to view queries and store stats

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | List products |
| POST | `/api/cart` | Add an item to the cart |
| POST | `/api/contact` | Submit a customer query |
| GET | `/api/queries` | List customer queries |
| GET | `/api/stats` | Store statistics |
| POST | `/api/admin/login` | Admin login |

## Tech stack

Node.js · Express · HTML · CSS · JavaScript

## Getting started

```bash
npm install
npm start          # or: npm run dev (nodemon)
```


## Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |

## License

MIT, as declared in `package.json`.
