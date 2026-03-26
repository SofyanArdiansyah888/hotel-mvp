import { type AnyRoute, createRoute } from '@tanstack/react-router'

import { ReservationsListPage } from '@/features/reservations/pages/ReservationsListPage'

export function createReservationsRoutes(opts: { parentRoute: AnyRoute }) {
  const reservationsRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/reservations',
    component: ReservationsListPage,
  })

  return { reservationsRoute }
}

