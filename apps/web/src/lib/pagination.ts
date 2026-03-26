export type PaginatedResponse<T> = {
  data: T[]
  meta?: {
    itemsPerPage?: number
    totalItems?: number
    currentPage?: number
    totalPages?: number
    sortBy?: unknown
    searchBy?: unknown
    search?: string
    filter?: Record<string, unknown>
  }
  links?: {
    first?: string
    previous?: string
    next?: string
    last?: string
  }
}

