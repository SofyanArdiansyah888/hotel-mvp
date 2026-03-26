# FE Feature: Reservations

## Halaman

- List + pagination
- Filter `status`
- Filter `room`
- Rentang tanggal (opsional)
- Form create/edit:
  - `checkInDate` + `checkOutDate`
  - data tamu
  - promo codes (jika pricing module diaktifkan)

## Aksi: Cancel reservation

- Tombol **Cancel** di list/detail reservation memanggil:
  - `POST /reservations/:id/cancel`
- Setelah sukses:
  - invalidate query list reservations
  - invalidate query calendar
- Setelah status `CANCELLED`:
  - form edit **disable** `room`, `checkInDate`, `checkOutDate`
  - izinkan edit `notes` (dan field non-jadwal lain bila disetujui)

## Error handling

- Jika BE mengembalikan 409 overlap, tampilkan pesan jelas (toast/inline) dan fokuskan input tanggal.
- Jika BE mengembalikan 409 karena sudah `CANCELLED`, tampilkan pesan “reservasi sudah dibatalkan”.

## Data & cache

- List endpoint: `GET /reservations`
- Invalidate list + calendar setelah create/update/cancel.
