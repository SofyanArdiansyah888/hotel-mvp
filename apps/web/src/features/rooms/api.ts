import { apiFetch } from '@/lib/api'
import type { PaginatedResponse } from '@/lib/pagination'

export type Room = {
  id: string
  roomTypeId: string
  code: string
  isActive: boolean
}

export type ListRoomsParams = {
  page?: number
  limit?: number
  search?: string
  roomTypeId?: string
  isActive?: 'true' | 'false'
}

export function listRooms(params: ListRoomsParams) {
  const qs = new URLSearchParams()
  if (params.page) qs.set('page', String(params.page))
  if (params.limit) qs.set('limit', String(params.limit))
  if (params.search) qs.set('search', params.search)
  if (params.roomTypeId) qs.set('filter.roomTypeId', params.roomTypeId)
  if (params.isActive) qs.set('filter.isActive', params.isActive)

  const q = qs.toString()
  return apiFetch<PaginatedResponse<Room>>(`/v1/rooms${q ? `?${q}` : ''}`)
}

export type UpsertRoomInput = {
  roomTypeId: string
  code: string
  isActive?: boolean
}

export function createRoom(input: UpsertRoomInput) {
  return apiFetch<Room>('/v1/rooms', { method: 'POST', json: input })
}

export function updateRoom(id: string, input: UpsertRoomInput) {
  return apiFetch<Room>(`/v1/rooms/${id}`, { method: 'PATCH', json: input })
}

export function deleteRoom(id: string) {
  return apiFetch<void>(`/v1/rooms/${id}`, { method: 'DELETE' })
}

