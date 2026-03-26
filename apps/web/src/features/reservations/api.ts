import { apiFetch } from '@/lib/api'
import type { PaginatedResponse } from '@/lib/pagination'

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'

export type Reservation = {
  id: string
  reservationNumber?: string
  roomId: string
  guestName: string
  guestEmail?: string | null
  guestPhone?: string | null
  checkInDate: string // YYYY-MM-DD
  checkOutDate: string // YYYY-MM-DD
  status: ReservationStatus
  notes?: string | null
}

export type ListReservationsParams = {
  page?: number
  limit?: number
  roomId?: string
  status?: ReservationStatus
  from?: string
  to?: string
}

export function listReservations(params: ListReservationsParams) {
  const qs = new URLSearchParams()
  if (params.page) qs.set('page', String(params.page))
  if (params.limit) qs.set('limit', String(params.limit))
  if (params.roomId) qs.set('filter.roomId', params.roomId)
  if (params.status) qs.set('filter.status', params.status)
  if (params.from) qs.set('from', params.from)
  if (params.to) qs.set('to', params.to)

  const q = qs.toString()
  return apiFetch<PaginatedResponse<Reservation>>(`/v1/reservations${q ? `?${q}` : ''}`)
}

export function cancelReservation(id: string) {
  return apiFetch<{ id: string; status: ReservationStatus }>(`/v1/reservations/${id}/cancel`, {
    method: 'POST',
  })
}

export type UpsertReservationInput = {
  roomId: string
  guestName: string
  guestEmail?: string
  guestPhone?: string
  checkInDate: string
  checkOutDate: string
  notes?: string
  status?: ReservationStatus
}

export function createReservation(input: UpsertReservationInput) {
  return apiFetch<Reservation>('/v1/reservations', { method: 'POST', json: input })
}

export function updateReservation(id: string, input: UpsertReservationInput) {
  return apiFetch<Reservation>(`/v1/reservations/${id}`, { method: 'PATCH', json: input })
}

export function deleteReservation(id: string) {
  return apiFetch<void>(`/v1/reservations/${id}`, { method: 'DELETE' })
}

