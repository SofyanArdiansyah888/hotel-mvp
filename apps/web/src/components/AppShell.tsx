import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import {
  Bell,
  Bed,
  CalendarDays,
  ChartColumn,
  CircleHelp,
  Cog,
  LogIn,
  Search,
  Users,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', icon: ChartColumn },
  { to: '/reservations', label: 'Bookings', icon: CalendarDays },
  { to: '/rooms', label: 'Inventory', icon: Bed },
  { to: '/room-types', label: 'Guests', icon: Users },
  { to: '/pricing', label: 'Reports', icon: ChartColumn },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/login', label: 'Login', icon: LogIn },
] as const

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <div className="min-h-dvh bg-surface text-on-surface">
      <div className="flex min-h-dvh w-full">
        <aside className="hidden w-[250px] shrink-0 bg-surface-container-low lg:flex lg:flex-col">
          <div className="px-6 py-6">
            <p className="text-[30px] font-semibold leading-none text-primary">The Atelier</p>
            <p className="mt-2 text-[11px] font-semibold tracking-[0.16em] text-on-surface-variant">
              PREMIUM CONCIERGE
            </p>
          </div>

          <nav className="space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to))
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-all',
                    active
                      ? 'bg-surface-container-lowest font-semibold text-on-surface'
                      : 'text-on-surface-variant hover:bg-surface-container-lowest/70 hover:text-on-surface',
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto space-y-3 px-4 pb-5">
            <button
              type="button"
              className="w-full rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--primary-container))] px-4 py-3 text-sm font-semibold text-[var(--on-primary)] transition hover:brightness-110"
            >
              + New Booking
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-lowest/70"
            >
              <Cog className="size-4" />
              Settings
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-lowest/70"
            >
              <CircleHelp className="size-4" />
              Support
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur">
            <div className="flex h-[74px] items-center justify-between gap-4 px-5 md:px-8">
              <div className="relative hidden w-[280px] md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" />
                <input
                  className="h-10 w-full rounded-xl bg-surface-container-high pl-10 pr-3 text-sm text-on-surface outline-none transition focus:bg-surface-container-lowest focus:outline focus:outline-1 focus:outline-[color-mix(in_oklab,var(--primary),transparent_80%)]"
                  placeholder="Search guests or rooms..."
                />
              </div>

              <nav className="hidden items-center gap-5 text-sm text-on-surface-variant md:flex">
                <a className="hover:text-on-surface" href="#">
                  Arrivals
                </a>
                <a className="hover:text-on-surface" href="#">
                  Departures
                </a>
                <a className="hover:text-on-surface" href="#">
                  VIP List
                </a>
              </nav>

              <div className="ml-auto flex items-center gap-4">
                <button className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-lowest" type="button">
                  <Bell className="size-4" />
                </button>
                <div className="hidden h-8 w-px bg-[color-mix(in_oklab,var(--outline-variant),transparent_70%)] sm:block" />
                <div className="hidden items-center gap-3 sm:flex">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-on-surface">Julian S.</p>
                    <p className="text-xs text-on-surface-variant">Night Manager</p>
                  </div>
                  <div className="grid size-9 place-items-center rounded-full bg-primary-container text-sm font-semibold text-[var(--on-primary)]">
                    JS
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-5 py-6 md:px-8 md:py-7">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

