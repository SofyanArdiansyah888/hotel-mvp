# BE Module: Charges (Extra Service / Damage) (Future)

> Catatan: pembayaran belum ada di scope saat ini. Modul ini disiapkan untuk extra service dan ganti rugi.

## Tujuan

Mencatat line item biaya tambahan dan/atau ganti rugi terkait reservation.

## Fields (minimum)

- `id` (uuid)
- `chargeNumber` (string, generated; contoh `CHG-2026-000123`)
- `reservationId` (uuid)
- `type`: `SERVICE | EXTRA | DAMAGE | FEE`
- `description`
- `amount` (integer, IDR)
- `isTaxable` (boolean)
- `createdAt`

## Numbering

- Format: `CHG-YYYY-000001` (reset tiap tahun)

