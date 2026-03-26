import { createRoute } from '@tanstack/react-router'
import ChargesListPage from './pages/ChargesListPage'

export function createChargesRoutes(opts: { parentRoute: any }) {
  const chargesRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/charges',
    component: ChargesListPage,
  })
  return { chargesRoute }
}
