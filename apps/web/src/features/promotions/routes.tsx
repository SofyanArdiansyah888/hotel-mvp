import { createRoute } from '@tanstack/react-router'
import PromotionsListPage from './pages/PromotionsListPage'

export function createPromotionsRoutes(opts: { parentRoute: any }) {
  const promotionsRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/promotions',
    component: PromotionsListPage,
  })
  return { promotionsRoute }
}
