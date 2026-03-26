# BE Module: Taxes (Dynamic / Multi)

## Tujuan

Mengelola pajak dinamis dari master pajak, dengan kemungkinan beberapa pajak aktif sekaligus.

## Konsep data (minimum)

### Tax

- `id` (uuid)
- `name` (string)
- `percent` (number; mis. 11 = 11%)
- `isActive` (boolean)
- `effectiveFrom` (date, `YYYY-MM-DD`)
- `effectiveTo` (date, optional)
- `priority` (number, optional)

Catatan: MVP tidak perlu tax-inclusive. Pajak ditambahkan di akhir (**tax-exclusive**).

## Selection rule (dinamis)

Pajak yang berlaku ditentukan berdasarkan **stay dates** (`checkInDate`..`checkOutDate`).

Default MVP: ambil pajak yang **berlaku pada tanggal checkInDate** (lebih sederhana).
Jika ingin lebih akurat: pajak bisa berubah di tengah stay → hitung pajak per malam (backlog).

## Computation (additive_on_net)

- `netBeforeTax = subtotal - discountTotal`
- Untuk setiap pajak applicable:
  - `taxLineAmount = round(netBeforeTax * (percent / 100))`
- `taxTotal = sum(taxLineAmount)`
- `total = netBeforeTax + taxTotal`

Rounding default: **per tax line**, lalu dijumlah.

## Endpoint

Base path: `/v1`.

- `GET /taxes` (paginate)
- `GET /taxes/:id`
- `POST /taxes`
- `PATCH /taxes/:id`
- `DELETE /taxes/:id`

## Response tax lines (contoh)

```json
{
  "taxLines": [
    { "taxId": "uuid", "name": "PPN", "percent": 11, "amount": 292050 },
    { "taxId": "uuid", "name": "Service", "percent": 5, "amount": 132750 }
  ],
  "taxTotal": 424800
}
```
