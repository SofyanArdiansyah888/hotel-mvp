import { createRoute } from '@tanstack/react-router'
import MockApiPage from './pages/MockApiPage'

export function createMockApiRoutes(opts: { parentRoute: any }) {
  const mockApiRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/mock-api',
    component: MockApiPage,
  })
  return { mockApiRoute }
}
