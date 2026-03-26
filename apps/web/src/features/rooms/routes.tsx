import { type AnyRoute, createRoute } from '@tanstack/react-router'

import { RoomsListPage } from '@/features/rooms/pages/RoomsListPage'

export function createRoomsRoutes(opts: { parentRoute: AnyRoute }) {
  const roomsRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/rooms',
    component: RoomsListPage,
  })

  return { roomsRoute }
}

