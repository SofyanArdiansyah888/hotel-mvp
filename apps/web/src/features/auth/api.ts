import { apiFetch } from '@/lib/api'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  tokenType?: 'Bearer'
}

export async function login(input: LoginRequest): Promise<LoginResponse> {
  // BE endpoint belum terdokumentasi di blueprint; ini default yang paling umum.
  // Sesuaikan path saat modul auth BE sudah ada.
  return apiFetch<LoginResponse>('/v1/auth/login', { method: 'POST', json: input })
}

