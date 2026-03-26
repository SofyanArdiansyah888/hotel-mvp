# BE: Pricing Calculation (Single Source of Truth)

Dokumen ini adalah acuan utama perhitungan harga reservation (MVP Hotel).

## Input utama

- `roomTypeId`
- `checkInDate`, `checkOutDate`
- `nightlyRates[]` (hasil `GET /rates`)
- `promoCodes[]` (opsional)

## Langkah hitung (Policy A)

1. **Subtotal (room only)**

- `subtotal = sum(nightlyRates.price)`

1. **Discounts**

- Validasi promo (kode dan/atau auto promo) menghasilkan `discountLines[]`.
- Apply order: **FIXED lalu PERCENT**.
- `discountTotal = sum(discountLines.amount)`
- `netBeforeTax = max(0, subtotal - discountTotal)`

1. **Taxes (dynamic, multi, additive_on_net)**

- Ambil pajak dari master (`taxLines[]`).
- `taxTotal = sum(round(netBeforeTax * percent/100))`

1. **Total**

- `total = netBeforeTax + taxTotal`

## Contoh angka

Nightly rates:

- 2026-04-01: 650000
- 2026-04-02: 650000
- 2026-04-03: 750000
- 2026-04-04: 900000

`subtotal = 2950000`

Promo:

- `FIXED 100000`
- `PERCENT 10%` (applied after fixed)

Discount:

- fixed: 100000
- percent: round((2950000 - 100000) * 10%) = round(285000) = 285000
- `discountTotal = 385000`
- `netBeforeTax = 2565000`

Taxes:

- PPN 11%: round(2565000 * 0.11) = 282150
- Service 5%: round(2565000 * 0.05) = 128250
- `taxTotal = 410400`

Total:

- `total = 2565000 + 410400 = 2975400`

