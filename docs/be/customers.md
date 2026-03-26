# BE Module: Customers (Future)

> Catatan: pembayaran belum ada di scope saat ini. Modul ini disiapkan untuk kebutuhan online booking / repeat guest.

## Tujuan

Menyimpan data pelanggan/tamu dengan kode yang mudah dibaca.

## Fields (minimum)

- `id` (uuid)
- `customerNumber` (string, generated; contoh `CST-2026-000123`)
- `fullName`
- `email` (optional)
- `phone` (optional)

## Numbering

- Format: `CST-YYYY-000001` (reset tiap tahun)
