# BE Module: Promotions (Dynamic)

## Tujuan

Mengelola promo/diskon dinamis (kode maupun otomatis) yang bisa memiliki constraints dan aturan stacking.

## Konsep data (minimum)

### Promotion

- `id` (uuid)
- `type`: `CODE | AUTO`
- `code` (string, nullable; wajib jika `CODE`)
- `name`
- `isActive`
- `validFrom`, `validTo` (opsional)
- `stackable` (boolean)
- `exclusiveGroup` (string, opsional) — jika sama, hanya boleh 1 promo dari group ini aktif dalam 1 reservation
- `discount`:
  - `kind`: `FIXED | PERCENT`
  - `value`: integer (IDR) untuk fixed, number untuk percent (mis. 10 = 10%)
- `constraints` (opsional):
  - `minNights`
  - `minSubtotal`
  - `roomTypeIdsInclude[]`
  - `roomTypeIdsExclude[]`
  - `maxUses` / `maxUsesPerDay` / `maxUsesPerCustomer` (opsional backlog)

## Rules (Policy A)

- Promo diterapkan **hanya ke harga kamar** (`subtotal`), bukan pajak/fees.
- Urutan apply jika multiple promo:
  1) semua diskon `FIXED`
  2) lalu diskon `PERCENT`
- `stackable=false` berarti promo itu **tidak boleh** digabung dengan promo lain (kecuali diputuskan sebaliknya).
- `exclusiveGroup`: jika set, hanya 1 promo dalam group yang sama.

## Endpoint

Base path: `/v1`.

- `GET /promotions` (paginate)
- `GET /promotions/:id`
- `POST /promotions`
- `PATCH /promotions/:id`
- `DELETE /promotions/:id`

### Validate/apply promo (untuk FE)

- `POST /promotions/validate`

Body (contoh):

```json
{
  "roomTypeId": "uuid",
  "checkInDate": "2026-04-01",
  "checkOutDate": "2026-04-05",
  "subtotal": 2950000,
  "promoCodes": ["WEEKEND10", "IDULFITRI"]
}
```

Response (contoh):

```json
{
  "appliedPromotions": [
    { "id": "uuid", "code": "WEEKEND10", "kind": "PERCENT", "value": 10 }
  ],
  "discountLines": [
    { "source": "PROMOTION", "promotionId": "uuid", "label": "WEEKEND10", "amount": 295000 }
  ],
  "discountTotal": 295000
}
```

## Error rules

- 400 bila payload invalid / promo code tidak valid.
- 409 bila promo tidak bisa di-stack (conflict rules).
