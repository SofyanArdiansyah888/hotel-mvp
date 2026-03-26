import { useMutation, useQuery } from '@tanstack/react-query'

import {
  cancelReservation,
  createReservation,
  deleteReservation,
  listReservations,
  type ListReservationsParams,
  type UpsertReservationInput,
  updateReservation,
} from '@/features/reservations/api'
import { queryClient } from '@/lib/queryClient'

export function reservationsKeys() {
  return {
    all: ['reservations'] as const,
    list: (params: ListReservationsParams) => ['reservations', 'list', params] as const,
    calendar: (params: { from: string; to: string; roomId?: string }) =>
      ['reservations', 'calendar', params] as const,
  }
}

export function useReservationsListQuery(params: ListReservationsParams) {
  return useQuery({
    queryKey: reservationsKeys().list(params),
    queryFn: () => listReservations(params),
  })
}

export function useCancelReservationMutation() {
  return useMutation({
    mutationFn: (id: string) => cancelReservation(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reservationsKeys().all })
    },
  })
}

export function useCreateReservationMutation() {
  return useMutation({
    mutationFn: (input: UpsertReservationInput) => createReservation(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reservationsKeys().all })
    },
  })
}

export function useUpdateReservationMutation() {
  return useMutation({
    mutationFn: (payload: { id: string; input: UpsertReservationInput }) =>
      updateReservation(payload.id, payload.input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reservationsKeys().all })
    },
  })
}

export function useDeleteReservationMutation() {
  return useMutation({
    mutationFn: (id: string) => deleteReservation(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reservationsKeys().all })
    },
  })
}

