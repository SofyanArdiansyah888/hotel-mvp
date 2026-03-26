# Mock API (JSON Server)

Dokumen ini menjelaskan cara menjalankan **mock backend** untuk FE menggunakan `json-server`.

## Lokasi file mock

- Data: `apps/web/mock/db.json`
- Route rewrite: `apps/web/mock/routes.json` (rewrite `/v1/*` → `/*`)
- Custom endpoints + pagination + overlap check: `apps/web/mock/middleware.cjs`

## Menjalankan

Masuk ke `apps/web`, lalu:

```bash
npm run dev:mock
```

Script ini menjalankan:
- Mock API di `http://127.0.0.1:4001`
- Vite dev server dengan env `VITE_API_URL=http://127.0.0.1:4001`

## Endpoint yang dimock

- `GET /v1/room-types` (paginate shape: `{ data, meta }`)
- `POST /v1/room-types`, `PATCH /v1/room-types/:id`, `DELETE /v1/room-types/:id`
- `GET /v1/rooms` (paginate shape)
- `POST /v1/rooms`, `PATCH /v1/rooms/:id`, `DELETE /v1/rooms/:id`
- `GET /v1/reservations` (paginate shape)
- `POST /v1/reservations`, `PATCH /v1/reservations/:id`, `DELETE /v1/reservations/:id`
  - memiliki **overlap check** sederhana (return 409)
- `POST /v1/reservations/:id/cancel` (set status `CANCELLED`, 409 jika sudah cancelled)
- `POST /v1/reservations/quote` (pricing breakdown mock)

