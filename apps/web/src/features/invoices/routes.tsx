import { createRoute } from '@tanstack/react-router'
import InvoicesListPage from './pages/InvoicesListPage'

export function createInvoicesRoutes(opts: { parentRoute: any }) {
  const invoicesRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/invoices',
    component: InvoicesListPage,
  })
  return { invoicesRoute }
}
