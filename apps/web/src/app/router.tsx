import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { RootLayout } from '@/app/layout/RootLayout'
import { createAuthRoutes } from '@/features/auth/routes'
import { createCalendarRoutes } from '@/features/calendar/routes'
import { HomePage } from '@/features/home/pages/HomePage'
import { createPricingRoutes } from '@/features/pricing/routes'
import { createRoomsRoutes } from '@/features/rooms/routes'
import { createReservationsRoutes } from '@/features/reservations/routes'
import { createRoomTypesRoutes } from '@/features/room-types/routes'
import { createCustomersRoutes } from '@/features/customers/routes'
import { createChargesRoutes } from '@/features/charges/routes'
import { createInvoicesRoutes } from '@/features/invoices/routes'
import { createPromotionsRoutes } from '@/features/promotions/routes'
import { createTaxesRoutes } from '@/features/taxes/routes'
import { createMockApiRoutes } from '@/features/mock-api/routes'

export type RouterContext = {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const { loginRoute } = createAuthRoutes({ parentRoute: rootRoute })
const { calendarRoute } = createCalendarRoutes({ parentRoute: rootRoute })
const { roomTypesRoute } = createRoomTypesRoutes({ parentRoute: rootRoute })
const { roomsRoute } = createRoomsRoutes({ parentRoute: rootRoute })
const { reservationsRoute } = createReservationsRoutes({ parentRoute: rootRoute })
const { pricingRoute } = createPricingRoutes({ parentRoute: rootRoute })
const { customersRoute } = createCustomersRoutes({ parentRoute: rootRoute })
const { chargesRoute } = createChargesRoutes({ parentRoute: rootRoute })
const { invoicesRoute } = createInvoicesRoutes({ parentRoute: rootRoute })
const { promotionsRoute } = createPromotionsRoutes({ parentRoute: rootRoute })
const { taxesRoute } = createTaxesRoutes({ parentRoute: rootRoute })
const { mockApiRoute } = createMockApiRoutes({ parentRoute: rootRoute })

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  calendarRoute,
  pricingRoute,
  roomTypesRoute,
  roomsRoute,
  reservationsRoute,
  customersRoute,
  chargesRoute,
  invoicesRoute,
  promotionsRoute,
  taxesRoute,
  mockApiRoute,
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

