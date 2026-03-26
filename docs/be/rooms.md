# BE Module: Rooms

## Tujuan

Mengelola kamar fisik yang bisa di-reserve.

## Entity (minimum)

- `id` (uuid)
- `roomTypeId` (uuid, FK)
- `code` (string) — nomor/kode kamar (unik per hotel)
- `isActive` (boolean)

## Endpoints (REST)

Base path disarankan: `/v1`.

- `GET /rooms` (paginate)
- `GET /rooms/:id`
- `POST /rooms`
- `PATCH /rooms/:id`
- `DELETE /rooms/:id`

## Query/filter (saran)

- filter: `roomTypeId`, `isActive`
- search: `code`

## Error rules

- 409 bila `roomTypeId` tidak valid (atau 400/404, tapi pilih 1 konsisten).
- 409 bila delete diblok karena masih ada reservation aktif (kebijakan disarankan).
