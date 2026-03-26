import { createRoute } from '@tanstack/react-router'
import CustomersListPage from './pages/CustomersListPage'

export function createCustomersRoutes(opts: { parentRoute: any }) {
  const customersRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/customers',
    component: CustomersListPage,
  })
  return { customersRoute }
}
