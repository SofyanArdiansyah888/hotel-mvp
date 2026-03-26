import { apiFetch } from '@/lib/api'
import type { ReservationStatus } from '@/features/reservations/api'

export type CalendarEvent = {
  id: string
  roomId: string
  title: string
  start: string
  end: string
  status: ReservationStatus
}

export function getReservationCalendar(params: { from: string; to: string; roomId?: string }) {
  const qs = new URLSearchParams()
  qs.set('from', params.from)
  qs.set('to', params.to)
  if (params.roomId) qs.set('roomId', params.roomId)

  return apiFetch<CalendarEvent[]>(`/v1/reservations/calendar?${qs.toString()}`)
}

