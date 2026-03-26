# BE Module: Reservations

## Tujuan

CRUD reservasi kamar (check-in / check-out) + validasi bentrok per kamar.

## Entity (minimum)

- `id` (uuid)
- `reservationNumber` (string, generated; contoh `RSV-2026-000123`)
- `roomId` (uuid, FK)
- `guestName` (string)
- `guestEmail` (string, optional)
- `guestPhone` (string, optional)
- `checkInDate` (date, `YYYY-MM-DD`)
- `checkOutDate` (date, `YYYY-MM-DD`)
- `status` (enum): `PENDING` | `CONFIRMED` | `CANCELLED`
- `notes` (string, optional)
- Pricing snapshot (output):
  - `currency` = `IDR`
  - `nightlyRates[]` (date + price)
  - `subtotal`
  - `promoCodes[]` (applied)
  - `discountLines[]` + `discountTotal`
  - `netBeforeTax`
  - `taxLines[]` + `taxTotal`
  - `total`

## Aturan bisnis (wajib)

- `checkInDate < checkOutDate`
- Overlap untuk `roomId` sama (abaikan `CANCELLED`):
  - overlap jika `checkInDate < other.checkOutDate && other.checkInDate < checkOutDate`
- Saat update, overlap check harus meng-ignore record yang sedang di-update.
- Setelah reservation berstatus `CANCELLED`:
  - **Tidak boleh** mengubah `roomId`, `checkInDate`, `checkOutDate`
  - **Boleh** mengubah `notes` (dan field non-jadwal lain seperti kontak tamu bila diputuskan)
- Pricing mengikuti dokumen:
  - nightly rates: lihat [`rates.md`](./rates.md)
  - promotions: lihat [`promotions.md`](./promotions.md)
  - taxes: lihat [`taxes.md`](./taxes.md)
  - calculation: lihat [`pricing-calculation.md`](./pricing-calculation.md)

## Endpoints (REST)

Base path disarankan: `/v1`.

- `GET /reservations` (paginate)
- `GET /reservations/:id`
- `POST /reservations/quote` (hitung harga tanpa menyimpan)
- `POST /reservations` (409 bila overlap)
- `PATCH /reservations/:id` (409 bila overlap)
- `POST /reservations/:id/cancel` (membatalkan reservation)
- `DELETE /reservations/:id` (opsional; jika ada, tidak menggantikan cancel)

### Quote endpoint

`POST /reservations/quote`

Body (contoh):

```json
{
  "roomTypeId": "uuid",
  "checkInDate": "2026-04-01",
  "checkOutDate": "2026-04-05",
  "promoCodes": ["WEEKEND10"]
}
```

Response (contoh):

```json
{
  "reservationNumber": "RSV-2026-000123",
  "currency": "IDR",
  "nightlyRates": [
    { "date": "2026-04-01", "price": 650000 },
    { "date": "2026-04-02", "price": 650000 },
    { "date": "2026-04-03", "price": 750000 },
    { "date": "2026-04-04", "price": 900000 }
  ],
  "subtotal": 2950000,
  "promoCodes": ["WEEKEND10"],
  "discountLines": [
    { "source": "PROMOTION", "label": "WEEKEND10", "amount": 295000 }
  ],
  "discountTotal": 295000,
  "netBeforeTax": 2655000,
  "taxLines": [
    { "name": "PPN", "percent": 11, "amount": 292050 }
  ],
  "taxTotal": 292050,
  "total": 2947050
}
```

### Cancel endpoint

`POST /reservations/:id/cancel`

- Mengubah `status` menjadi `CANCELLED`.
- Reservation `CANCELLED` **tidak** dihitung dalam overlap check.
- Pricing totals (jika sudah dihitung) tetap tersimpan sebagai snapshot; tidak perlu dihitung ulang saat cancel.

Body (opsional):

```json
{ "reason": "string (optional)" }
```

Response (contoh):

```json
{
  "id": "uuid",
  "reservationNumber": "RSV-2026-000123",
  "status": "CANCELLED",
  "cancelledAt": "2026-04-01T10:11:12.000Z"
}
```

## Query/filter (saran)

- filter: `roomId`, `status`
- filter rentang: `from`, `to` (opsional untuk list)

## Error rules

- 409 untuk bentrok reservation (pesan jelas).
- 404 bila id tidak ditemukan.
- 409 jika cancel dipanggil pada reservation yang sudah `CANCELLED`.
- 409 jika mencoba mengubah tanggal/kamar pada reservation yang sudah `CANCELLED`.
- 400 bila promo code tidak valid / tidak applicable.
