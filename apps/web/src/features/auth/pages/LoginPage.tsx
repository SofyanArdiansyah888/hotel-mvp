import { useNavigate } from '@tanstack/react-router'
import { Hotel, ShieldCheck, Sparkles } from 'lucide-react'

import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#f3f4fb]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-160px] size-[460px] rounded-full bg-[#1f2c9a]/10 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-120px] size-[480px] rounded-full bg-[#198575]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-dvh w-full max-w-[1280px] grid-cols-1 p-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:p-10">
        <section className="hidden rounded-[28px] bg-[#11184f] p-10 text-white shadow-2xl shadow-[#11184f]/25 lg:flex lg:flex-col">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
            <ShieldCheck className="size-4" />
            Premium Concierge Access
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-xl bg-white/15">
                <Hotel className="size-6" />
              </div>
              <div>
                <p className="text-sm text-white/70">The Atelier</p>
                <h1 className="text-4xl font-semibold tracking-tight">Concierge Console</h1>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/75">
              Manage arrivals, departures, reservations, and room status in one premium dashboard.
              Focused on speed and clarity for front desk operations.
            </p>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/15 bg-white/10 p-4">
              <p className="text-xs text-white/70">Today's Arrivals</p>
              <p className="mt-1 text-3xl font-semibold">26</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-4">
              <p className="text-xs text-white/70">VIP Guests</p>
              <p className="mt-1 text-3xl font-semibold">08</p>
            </div>
          </div>

          <div className="mt-auto rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="inline-flex items-center gap-2 text-sm font-medium">
              <Sparkles className="size-4" />
              Night shift tip
            </p>
            <p className="mt-2 text-sm text-white/75">
              Review pending check-ins before 18:00 and prioritize room readiness for VIP bookings.
            </p>
          </div>
        </section>

        <section className="grid place-items-center">
          <div className="w-full max-w-md">
            <div className="mb-4 text-center lg:hidden">
              <p className="text-sm text-[#6f7698]">The Atelier</p>
              <h1 className="text-3xl font-semibold text-[#121857]">Concierge Console</h1>
            </div>
            <LoginForm onSuccess={() => navigate({ to: '/' })} />
          </div>
        </section>
      </div>
    </div>
  )
}

