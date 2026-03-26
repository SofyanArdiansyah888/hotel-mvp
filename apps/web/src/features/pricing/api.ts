import { apiFetch } from '@/lib/api'

export type QuoteRequest = {
  roomTypeId: string
  checkInDate: string
  checkOutDate: string
  promoCodes?: string[]
}

export type QuoteResponse = {
  reservationNumber?: string
  currency: string
  nightlyRates: { date: string; price: number }[]
  subtotal: number
  promoCodes?: string[]
  discountLines?: { source: string; label: string; amount: number }[]
  discountTotal?: number
  netBeforeTax?: number
  taxLines?: { name: string; percent: number; amount: number }[]
  taxTotal?: number
  total: number
}

export function quoteReservation(input: QuoteRequest) {
  return apiFetch<QuoteResponse>('/v1/reservations/quote', { method: 'POST', json: input })
}

