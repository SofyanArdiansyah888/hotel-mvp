# Frontend Blueprint — Hotel (React + TanStack + Tailwind + shadcn)

Dokumentasi frontend sekarang dipisah **per fitur/modul**. Gunakan dokumen index FE ini untuk navigasi.

- Index modul FE: [`fe/README.md`](./fe/README.md)

## Stack

- React (Vite) + TypeScript
- TanStack Router
- TanStack Query
- Tailwind CSS
- shadcn/ui

## Bootstrap

- Scaffold di `apps/web`.
- Env: `VITE_API_URL`.

## Konvensi penting

- **Base URL**: `VITE_API_URL`
- **Format tanggal**: `YYYY-MM-DD` untuk check-in/out (MVP).
- **Pagination**: ikuti shape response dari `nestjs-paginate` (`data`, `meta`, `links` bila ada).
- **Design System**: acuan UI/UX + tokens ada di [`design-system-elevated-concierge.md`](./design-system-elevated-concierge.md)

## Halaman / alur

- **Room Types**: lihat [`fe/room-types.md`](./fe/room-types.md)
- **Rooms**: lihat [`fe/rooms.md`](./fe/rooms.md)
- **Reservations**: lihat [`fe/reservations.md`](./fe/reservations.md)
- **Calendar**: lihat [`fe/calendar.md`](./fe/calendar.md)
- **Pricing**: lihat [`fe/pricing.md`](./fe/pricing.md)
- **Mock API** (JSON Server): lihat [`fe/mock-api-json-server.md`](./fe/mock-api-json-server.md)

## Integrasi API

- Base URL: `VITE_API_URL`.
- Pagination mengikuti format `nestjs-paginate` (`data`, `meta`, dll.).

## Catatan UX

- Error bentrok reservasi tampil jelas (toast atau inline).
- Loading/empty states rapi untuk tabel dan kalender.
