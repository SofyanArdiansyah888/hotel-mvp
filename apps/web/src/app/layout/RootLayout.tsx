import { Outlet, useRouterState } from '@tanstack/react-router'

import { AppShell } from '@/components/AppShell'

export function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isAuthRoute = pathname.startsWith('/login')

  if (isAuthRoute) {
    return <Outlet />
  }

  return <AppShell />
}

