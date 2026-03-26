import { authTokenStorage } from '@/features/auth/storage'

function joinUrl(base: string, path: string) {
  if (!base) return path
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(message: string, opts: { status: number; details?: unknown }) {
    super(message)
    this.name = 'ApiError'
    this.status = opts.status
    this.details = opts.details
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (!isRecord(payload)) return fallback
  const message = payload['message']
  const error = payload['error']
  if (typeof message === 'string' && message.trim()) return message
  if (typeof error === 'string' && error.trim()) return error
  return fallback
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_URL as string | undefined
  const url = joinUrl(baseUrl ?? '', path)

  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')

  const token = authTokenStorage.get()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let body = init.body
  if (init.json !== undefined) {
    headers.set('Content-Type', 'application/json')
    body = JSON.stringify(init.json)
  }

  const res = await fetch(url, { ...init, headers, body })
  const contentType = res.headers.get('content-type') ?? ''

  const isJson = contentType.includes('application/json')
  const payload = isJson ? await res.json().catch(() => undefined) : undefined

  if (!res.ok) {
    const message = getErrorMessage(
      payload,
      res.statusText || 'Request failed',
    )
    throw new ApiError(message, { status: res.status, details: payload })
  }

  return payload as T
}

