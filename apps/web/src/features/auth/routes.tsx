import { type AnyRoute, createRoute } from '@tanstack/react-router'

import { LoginPage } from '@/features/auth/pages/LoginPage'

export function createAuthRoutes(opts: { parentRoute: AnyRoute }) {
  const loginRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/login',
    component: LoginPage,
  })

  return { loginRoute }
}

