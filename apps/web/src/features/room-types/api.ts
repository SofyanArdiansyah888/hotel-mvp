import { apiFetch } from '@/lib/api'
import type { PaginatedResponse } from '@/lib/pagination'

export type RoomType = {
  id: string
  name: string
  capacity: number
  description?: string | null
  isActive: boolean
}

export type ListRoomTypesParams = {
  page?: number
  limit?: number
  search?: string
  isActive?: 'true' | 'false'
}

export function listRoomTypes(params: ListRoomTypesParams) {
  const qs = new URLSearchParams()
  if (params.page) qs.set('page', String(params.page))
  if (params.limit) qs.set('limit', String(params.limit))
  if (params.search) qs.set('search', params.search)
  if (params.isActive) qs.set('filter.isActive', params.isActive)

  const q = qs.toString()
  return apiFetch<PaginatedResponse<RoomType>>(`/v1/room-types${q ? `?${q}` : ''}`)
}

export type UpsertRoomTypeInput = {
  name: string
  capacity: number
  description?: string
  isActive?: boolean
}

export function createRoomType(input: UpsertRoomTypeInput) {
  return apiFetch<RoomType>('/v1/room-types', { method: 'POST', json: input })
}

export function updateRoomType(id: string, input: UpsertRoomTypeInput) {
  return apiFetch<RoomType>(`/v1/room-types/${id}`, { method: 'PATCH', json: input })
}

export function deleteRoomType(id: string) {
  return apiFetch<void>(`/v1/room-types/${id}`, { method: 'DELETE' })
}

