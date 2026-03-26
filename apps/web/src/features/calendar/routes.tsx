import { type AnyRoute, createRoute } from '@tanstack/react-router'

import { CalendarPage } from '@/features/calendar/pages/CalendarPage'

export function createCalendarRoutes(opts: { parentRoute: AnyRoute }) {
  const calendarRoute = createRoute({
    getParentRoute: () => opts.parentRoute,
    path: '/calendar',
    component: CalendarPage,
  })

  return { calendarRoute }
}

