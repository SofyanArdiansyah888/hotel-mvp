# FE Feature: Pricing (Rates + Promo + Taxes)

## Tujuan

Menampilkan breakdown harga reservation berdasarkan:

- nightly rates (seasonal)
- promo/diskon (kode dan/atau auto promo)
- pajak multi (tax-exclusive)

FE **bukan** sumber kebenaran perhitungan; FE hanya menampilkan hasil dari BE.

## Endpoint yang dipakai

- `GET /rates?roomTypeId&from&to` (opsional untuk preview nightly)
- `POST /promotions/validate` (opsional untuk validasi awal promo codes)
- `POST /reservations/quote` (wajib untuk breakdown final sebelum submit)
- `POST /reservations` / `PATCH /reservations/:id` (BE menghitung ulang dan menyimpan snapshot)

## Alur UI (disarankan)

1. User pilih `roomType` + `checkInDate` + `checkOutDate`
2. User isi `promoCodes[]` (opsional)
3. FE memanggil `POST /reservations/quote`
4. FE menampilkan:
   - per malam (`nightlyRates`)
   - `subtotal`
   - `discountLines` + `discountTotal`
   - `taxLines` + `taxTotal`
   - `total`
5. Saat submit reservation:
   - kirim `promoCodes[]`
   - BE tetap melakukan validasi overlap + pricing

## UX

- Jika promo invalid / conflict, tampilkan pesan dari BE (400/409) dekat input promo code.
- Tampilkan skeleton/loading untuk breakdown saat quote berjalan.
