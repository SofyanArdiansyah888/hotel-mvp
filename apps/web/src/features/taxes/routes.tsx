import { createRoute } from '@tanstack/react-router'
import TaxesListPage from './pages/TaxesListPage'

export function createTaxesRoutes(opts: { parentRoute: any }) {
  const taxesRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/taxes',
    component: TaxesListPage,
  })
  return { taxesRoute }
}
