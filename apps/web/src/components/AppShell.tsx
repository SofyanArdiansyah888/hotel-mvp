import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { CalendarDays, Layers, Percent, SquareLibrary, Bed, LogIn } from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Home', icon: SquareLibrary },
  { to: '/room-types', label: 'Room Types', icon: Layers },
  { to: '/rooms', label: 'Rooms', icon: Bed },
  { to: '/reservations', label: 'Reservations', icon: SquareLibrary },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/pricing', label: 'Pricing', icon: Percent },
  { to: '/login', label: 'Login', icon: LogIn },
] as const

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight">Hotel Console</div>
            <div className="text-xs text-muted-foreground">MVP • TanStack Router + Query</div>
          </div>

          <nav className="-mx-2 hidden flex-wrap items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to))
              const Icon = item.icon
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
                    active && 'bg-muted text-foreground',
                    !active && 'text-muted-foreground',
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}

