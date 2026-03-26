import { useNavigate } from '@tanstack/react-router'
import { Hotel, ShieldCheck } from 'lucide-react'

import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-48 size-[520px] rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -right-40 -bottom-48 size-[560px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(hsl(var(--foreground))_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative mx-auto grid min-h-dvh w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
            <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
            Admin access • Hotel PMS (MVP)
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Hotel className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hotel Console</p>
                <h1 className="text-2xl font-semibold tracking-tight">Masuk untuk mulai bekerja</h1>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Kelola room types, rooms, reservations, dan kalender. Saat ini fokus ke alur
              operasional, bukan pembayaran.
            </p>
          </div>

          <dl className="grid max-w-md grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-border bg-card/60 p-3 backdrop-blur">
              <dt className="text-muted-foreground">API base</dt>
              <dd className="mt-1 font-medium">`VITE_API_URL`</dd>
            </div>
            <div className="rounded-lg border border-border bg-card/60 p-3 backdrop-blur">
              <dt className="text-muted-foreground">Versi</dt>
              <dd className="mt-1 font-medium">/v1</dd>
            </div>
          </dl>
        </div>

        <div className="flex w-full justify-center lg:justify-end">
          <LoginForm onSuccess={() => navigate({ to: '/' })} />
        </div>
      </div>
    </div>
  )
}

