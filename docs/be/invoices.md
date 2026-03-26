# BE Module: Invoices (Future)

> Catatan: pembayaran belum ada di scope saat ini. Modul invoice disiapkan untuk pencatatan piutang dan rekonsiliasi.

## Tujuan

Membuat dokumen tagihan yang bisa mencakup subtotal kamar + charges + pajak.

## Fields (minimum)

- `id` (uuid)
- `invoiceNumber` (string, generated; contoh `INV-2026-000123`)
- `reservationId` (uuid)
- `currency` = `IDR`
- `subtotal`
- `discountTotal`
- `taxTotal`
- `total`
- `status`: `DRAFT | ISSUED | VOID` (pembayaran belum masuk scope)

## Numbering

- Format: `INV-YYYY-000001` (reset tiap tahun)
