import { useQuery } from '@tanstack/react-query'

import { getReservationCalendar } from '@/features/calendar/api'
import { reservationsKeys } from '@/features/reservations/hooks'

export function useCalendarQuery(params: { from: string; to: string; roomId?: string }) {
  return useQuery({
    queryKey: reservationsKeys().calendar(params),
    queryFn: () => getReservationCalendar(params),
  })
}

