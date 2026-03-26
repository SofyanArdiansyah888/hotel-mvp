# Backend Coding Rules (Hotel)

## General
- Ikuti struktur folder dan modularisasi sesuai blueprint dan rekomendasi docs.
- Gunakan TypeORM, NestJS, class-validator, nestjs-paginate, dan Postgres.

## Query Rules
- Untuk query single entity (by id, dsb), WAJIB gunakan repository.getOne() atau getOneOrFail(), BUKAN findOne().
- getOne/getOneOrFail akan melempar error jika data tidak ditemukan (otomatis 404), sedangkan findOne() mengembalikan null.
- Tujuannya agar error handling lebih konsisten dan eksplisit.

## Pagination Rules
- Untuk endpoint list/paginate, WAJIB gunakan nestjs-paginate dengan konfigurasi:
	- Gunakan opsi sortableColumns, searchableColumns, filterableColumns, dan defaultSortBy sesuai entity.
	- Hindari manipulasi manual query/filter di service, gunakan fitur built-in nestjs-paginate.
- Contoh implementasi benar ada di RoomTypesService.

## DTO & Validasi
- Gunakan class-validator/class-transformer di semua DTO.
- Error 400 untuk payload invalid, 404 untuk data tidak ditemukan.

## Lain-lain
- Ikuti konvensi endpoint, error, dan filter/sort sesuai dokumen per modul.
- Tambahkan .env.example dan README migrasi di setiap modul baru jika perlu.
