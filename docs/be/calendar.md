# BE Module: Reservation Calendar

## Tujuan

Endpoint ringan untuk kebutuhan kalender di frontend.

## Endpoint

Base path disarankan: `/v1`.

- `GET /reservations/calendar?from=YYYY-MM-DD&to=YYYY-MM-DD&roomId=<uuid_optional>`

## Response (event-style)

Minimal field yang dibutuhkan FE:

- `id`
- `roomId`
- `title` (contoh: `guestName`)
- `start` (ISO date atau datetime; untuk MVP cukup `YYYY-MM-DD`)
- `end` (ISO date)
- `status`

Catatan: pilih 1 format tanggal (date vs datetime) dan konsisten di FE.
