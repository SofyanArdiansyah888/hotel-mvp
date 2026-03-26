# Form State Best Practice

**Gunakan satu state object untuk seluruh input dalam satu form.**

## Contoh (React):

```tsx
// BENAR:
const [form, setForm] = useState({
  field1: '',
  field2: '',
  // ...
})

<Input value={form.field1} onChange={e => setForm(f => ({ ...f, field1: e.target.value }))} />
<Input value={form.field2} onChange={e => setForm(f => ({ ...f, field2: e.target.value }))} />

// SALAH:
const [field1, setField1] = useState('')
const [field2, setField2] = useState('')
```

## Alasan
- Lebih mudah di-maintain, terutama untuk form besar.
- Memudahkan reset, validasi, dan submit data.
- Konsisten dengan best practice modern React.

## Aturan
- Semua form baru WAJIB pakai satu state object untuk seluruh input.
- Refactor form lama secara bertahap jika masih pakai satu state per input.
- Dokumentasikan perubahan ini di code review dan onboarding.
