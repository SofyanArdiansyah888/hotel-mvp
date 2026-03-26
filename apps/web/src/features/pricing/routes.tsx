import { type AnyRoute, createRoute } from '@tanstack/react-router'

import { PricingPage } from '@/features/pricing/pages/PricingPage'

export function createPricingRoutes(opts: { parentRoute: AnyRoute }) {
  const pricingRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/pricing',
    component: PricingPage,
  })

  return { pricingRoute }
}

