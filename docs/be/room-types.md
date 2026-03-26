# BE Module: Room Types

## Tujuan

Mengelola tipe kamar untuk grouping, kapasitas, dan informasi dasar.

## Entity (minimum)

- `id` (uuid)
- `name` (string)
- `capacity` (number)
- `description` (string, optional)
- `isActive` (boolean)

## Endpoints (REST)

Base path disarankan: `/v1`.

- `GET /room-types` (paginate)
- `GET /room-types/:id`
- `POST /room-types`
- `PATCH /room-types/:id`
- `DELETE /room-types/:id`

## Filter/sort (saran)

- filter: `isActive`
- search: `name`
- sort: `createdAt`, `name`

## Error rules

- 404 bila id tidak ditemukan.
- 400 bila payload invalid.
