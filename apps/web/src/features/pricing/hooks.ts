import { useMutation } from '@tanstack/react-query'

import { quoteReservation, type QuoteRequest } from '@/features/pricing/api'

export function useQuoteMutation() {
  return useMutation({
    mutationFn: (input: QuoteRequest) => quoteReservation(input),
  })
}

