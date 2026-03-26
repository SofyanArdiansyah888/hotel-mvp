import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createRoom,
  deleteRoom,
  listRooms,
  type ListRoomsParams,
  type UpsertRoomInput,
  updateRoom,
} from '@/features/rooms/api'
import { queryClient } from '@/lib/queryClient'

export function roomsKeys() {
  return {
    all: ['rooms'] as const,
    list: (params: ListRoomsParams) => ['rooms', 'list', params] as const,
  }
}

export function useRoomsListQuery(params: ListRoomsParams) {
  return useQuery({
    queryKey: roomsKeys().list(params),
    queryFn: () => listRooms(params),
  })
}

export function useCreateRoomMutation() {
  return useMutation({
    mutationFn: (input: UpsertRoomInput) => createRoom(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roomsKeys().all })
    },
  })
}

export function useUpdateRoomMutation() {
  return useMutation({
    mutationFn: (payload: { id: string; input: UpsertRoomInput }) =>
      updateRoom(payload.id, payload.input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roomsKeys().all })
    },
  })
}

export function useDeleteRoomMutation() {
  return useMutation({
    mutationFn: (id: string) => deleteRoom(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roomsKeys().all })
    },
  })
}

