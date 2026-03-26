import { type AnyRoute, createRoute } from '@tanstack/react-router'

import { RoomTypesListPage } from '@/features/room-types/pages/RoomTypesListPage'

export function createRoomTypesRoutes(opts: { parentRoute: AnyRoute }) {
  const roomTypesRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/room-types',
    component: RoomTypesListPage,
  })

  return { roomTypesRoute }
}

