# Blueprint — MVP Hotel (Index)

Dokumen ini adalah **pintu masuk** dokumentasi. Detail dipisah menjadi BE/FE dan dipecah lagi per modul.

## Navigasi

- **Backend**: [`BLUEPRINT.BE.md`](./BLUEPRINT.BE.md) → modul: [`be/README.md`](./be/README.md)
- **Frontend**: [`BLUEPRINT.FE.md`](./BLUEPRINT.FE.md) → modul: [`fe/README.md`](./fe/README.md)
- **Flow aplikasi**: [`FLOW.md`](./FLOW.md)

## Ruang lingkup (MVP)

- **Domain**: hotel
  - `RoomType`
  - `Room`
  - `Reservation` (check-in / check-out)
- **Tidak termasuk**: fitur AI di aplikasi, pembayaran, multi-tenant, notifikasi.

## Modul BE tambahan (future, payment belum ada)

- Customers: [`be/customers.md`](./be/customers.md)
- Charges (extra service / damage): [`be/charges.md`](./be/charges.md)
- Invoices: [`be/invoices.md`](./be/invoices.md)

## Pricing (promo/diskon/pajak)

Ringkas kebijakan hitung (Policy A):

- `subtotal` = sum nightly rates
- diskon bisa multiple, urut: **fixed lalu percent**
- `netBeforeTax` = `subtotal - discountTotal`
- pajak multi, additive (tax-exclusive): `taxTotal = sum(round(netBeforeTax * percent/100))`
- `total` = `netBeforeTax + taxTotal`

Dokumen detail:

- BE rates: [`be/rates.md`](./be/rates.md)
- BE promotions: [`be/promotions.md`](./be/promotions.md)
- BE taxes: [`be/taxes.md`](./be/taxes.md)
- BE calculation: [`be/pricing-calculation.md`](./be/pricing-calculation.md)
- FE pricing UI: [`fe/pricing.md`](./fe/pricing.md)

## Document numbering (human-friendly)

Untuk dokumen yang terlihat user/operator, gunakan nomor otomatis (bukan UUID) dengan format **prefix + tahun + running number reset tiap tahun**.

Default prefix:

- Reservation: `RSV-YYYY-000001`
- Customer: `CST-YYYY-000001`
- Charge (extra service / damage): `CHG-YYYY-000001`
- Invoice: `INV-YYYY-000001`

Catatan:

- UUID tetap boleh dipakai sebagai `id` internal (PK), tapi tampilkan `...Number` untuk UI, pencarian, dan komunikasi ke pelanggan.
- Payment **belum ada** di scope saat ini; `Invoice`/`Charge` boleh diparkir sebagai modul future tapi format numbering-nya sudah ditetapkan.

## Struktur repositori (target)

```
hotel/
  apps/
    api/          # NestJS
    web/          # React (Vite)
  package.json    # optional: npm/pnpm workspaces root
```

Alternatif: `backend/` dan `frontend/` di root.

---

**Prompt untuk AI eksekutor (nanti):**  
*Implementasi sesuai dokumen di folder `docs/` (index ini + BE/FE). Jangan menyimpang dari stack dan kontrak endpoint kecuali disepakati.*
