# Backend Docs (Hotel) — Index

Dokumentasi BE dipisah per modul:

- [`room-types.md`](./room-types.md)
- [`rooms.md`](./rooms.md)
- [`reservations.md`](./reservations.md)
- [`calendar.md`](./calendar.md)
- Future (numbering ready, payment not included):
  - [`customers.md`](./customers.md)
  - [`charges.md`](./charges.md)
  - [`invoices.md`](./invoices.md)
- Pricing:
  - [`rates.md`](./rates.md)
  - [`promotions.md`](./promotions.md)
  - [`taxes.md`](./taxes.md)
  - [`pricing-calculation.md`](./pricing-calculation.md)

## Struktur folder target (apps/api)

```
apps/api/
  src/
    app.module.ts
    main.ts
    config/
      env.validation.ts
      typeorm.config.ts
    common/
      pagination/
      errors/
    room-types/
      room-types.module.ts
      room-types.controller.ts
      room-types.service.ts
      dto/
      entities/
    rooms/
      rooms.module.ts
      rooms.controller.ts
      rooms.service.ts
      dto/
      entities/
    reservations/
      reservations.module.ts
      reservations.controller.ts
      reservations.service.ts
      dto/
      entities/
```

Catatan: ini struktur rekomendasi; eksekutor boleh menyesuaikan asalkan modul terpisah jelas.
