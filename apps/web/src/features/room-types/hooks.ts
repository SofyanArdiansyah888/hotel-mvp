import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createRoomType,
  deleteRoomType,
  listRoomTypes,
  type ListRoomTypesParams,
  type UpsertRoomTypeInput,
  updateRoomType,
} from '@/features/room-types/api'
import { queryClient } from '@/lib/queryClient'

export function roomTypesKeys() {
  return {
    all: ['room-types'] as const,
    list: (params: ListRoomTypesParams) => ['room-types', 'list', params] as const,
  }
}

export function useRoomTypesListQuery(params: ListRoomTypesParams) {
  return useQuery({
    queryKey: roomTypesKeys().list(params),
    queryFn: () => listRoomTypes(params),
  })
}

export function useCreateRoomTypeMutation() {
  return useMutation({
    mutationFn: (input: UpsertRoomTypeInput) => createRoomType(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roomTypesKeys().all })
    },
  })
}

export function useUpdateRoomTypeMutation() {
  return useMutation({
    mutationFn: (payload: { id: string; input: UpsertRoomTypeInput }) =>
      updateRoomType(payload.id, payload.input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roomTypesKeys().all })
    },
  })
}

export function useDeleteRoomTypeMutation() {
  return useMutation({
    mutationFn: (id: string) => deleteRoomType(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roomTypesKeys().all })
    },
  })
}

