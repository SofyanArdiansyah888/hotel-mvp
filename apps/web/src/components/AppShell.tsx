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
    <div className="min-h-dvh bg-[#f3f4fb] text-foreground">
      <div className="mx-auto flex min-h-dvh max-w-[1440px]">
        <aside className="hidden w-[250px] shrink-0 border-r border-[#e8eaf6] bg-[#eef2fb] lg:flex lg:flex-col">
          <div className="border-b border-[#e8eaf6] px-6 py-6">
            <p className="text-[30px] font-semibold leading-none text-[#14184e]">The Atelier</p>
            <p className="mt-2 text-[11px] font-semibold tracking-[0.16em] text-[#6f7496]">
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
                      ? 'bg-white font-semibold text-[#171d57] shadow-sm'
                      : 'text-[#677091] hover:bg-white/80 hover:text-[#1f275f]',
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
              className="w-full rounded-xl bg-[#1d2c9a] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1d2c9a]/30 transition hover:brightness-110"
            >
              + New Booking
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#687293] hover:bg-white/80"
            >
              <Cog className="size-4" />
              Settings
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#687293] hover:bg-white/80"
            >
              <CircleHelp className="size-4" />
              Support
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-[#e8eaf6] bg-[#f8f9ff]/90 backdrop-blur">
            <div className="flex h-[74px] items-center justify-between gap-4 px-5 md:px-8">
              <div className="relative hidden w-[280px] md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8a90ac]" />
                <input
                  className="h-10 w-full rounded-xl border border-[#dfe3f3] bg-white pl-10 pr-3 text-sm outline-none ring-[#9fa9ff] transition focus:ring-2"
                  placeholder="Search guests or rooms..."
                />
              </div>

              <nav className="hidden items-center gap-5 text-sm text-[#6e7592] md:flex">
                <a className="hover:text-[#1d2558]" href="#">
                  Arrivals
                </a>
                <a className="hover:text-[#1d2558]" href="#">
                  Departures
                </a>
                <a className="hover:text-[#1d2558]" href="#">
                  VIP List
                </a>
              </nav>

              <div className="ml-auto flex items-center gap-4">
                <button className="rounded-lg p-2 text-[#71789a] hover:bg-white" type="button">
                  <Bell className="size-4" />
                </button>
                <div className="hidden h-8 w-px bg-[#d9deef] sm:block" />
                <div className="hidden items-center gap-3 sm:flex">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#1b2159]">Julian S.</p>
                    <p className="text-xs text-[#7f86a4]">Night Manager</p>
                  </div>
                  <div className="grid size-9 place-items-center rounded-full bg-[#1f275f] text-sm font-semibold text-white">
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

