# Frontend Docs (Hotel) — Index

Dokumentasi FE dipisah per modul/fitur:

- [`room-types.md`](./room-types.md)
- [`rooms.md`](./rooms.md)
- [`reservations.md`](./reservations.md)
- [`calendar.md`](./calendar.md)
- Pricing: [`pricing.md`](./pricing.md)

## Struktur folder target (apps/web)

```
apps/web/
  src/
    main.tsx
    app/
      router.tsx
      layout/
    lib/
      api.ts
      queryClient.ts
    features/
      room-types/
        api.ts
        hooks.ts
        routes.tsx
        components/
      rooms/
        api.ts
        hooks.ts
        routes.tsx
        components/
      reservations/
        api.ts
        hooks.ts
        routes.tsx
        components/
      calendar/
        api.ts
        routes.tsx
        components/
    components/
      ui/   # shadcn
```

Catatan: ini struktur rekomendasi; boleh menyesuaikan asalkan pemisahan fitur jelas.
