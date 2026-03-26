# BE Module: Rates (Nightly)

## Tujuan

Menyediakan harga **per malam** yang bisa berbeda per tanggal (seasonal/weekday).

## Konsep data (minimum)

### Opsi simplest (MVP)

- `NightlyRate`
  - `roomTypeId`
  - `date` (`YYYY-MM-DD`)
  - `price` (integer, IDR)
  - `currency` = `IDR`
  - `isActive`

Catatan: `RoomType` bisa punya `basePrice` sebagai fallback jika `NightlyRate` tidak tersedia untuk tanggal tertentu.

## Endpoint

Base path: `/v1`.

- `GET /rates?roomTypeId=<uuid>&from=YYYY-MM-DD&to=YYYY-MM-DD`
  - Mengembalikan daftar nightly rates untuk rentang [from, to).

## Response (contoh)

```json
{
  "roomTypeId": "uuid",
  "from": "2026-04-01",
  "to": "2026-04-05",
  "currency": "IDR",
  "nightlyRates": [
    { "date": "2026-04-01", "price": 650000 },
    { "date": "2026-04-02", "price": 650000 },
    { "date": "2026-04-03", "price": 750000 },
    { "date": "2026-04-04", "price": 900000 }
  ]
}
```

## Aturan

- `from < to`
- Semua nilai uang integer (rupiah).
