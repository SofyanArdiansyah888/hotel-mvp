import * as React from 'react'

import { PageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/ui/spinner'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table'
import { ApiError } from '@/lib/api'
import { useCalendarQuery } from '@/features/calendar/hooks'

function toISODate(d: Date) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function addDays(d: Date, days: number) {
  const next = new Date(d)
  next.setDate(next.getDate() + days)
  return next
}

export function CalendarPage() {
  const today = React.useMemo(() => new Date(), [])
  const [from, setFrom] = React.useState(() => toISODate(today))
  const [to, setTo] = React.useState(() => toISODate(addDays(today, 14)))
  const [roomId, setRoomId] = React.useState('')

  const query = useCalendarQuery({ from, to, roomId: roomId || undefined })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar"
        description="Endpoint: GET /reservations/calendar?from&to&roomId"
        right={
          <div className="flex flex-wrap items-center gap-2">
            <input
              className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              aria-label="From"
            />
            <input
              className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              aria-label="To"
            />
            <input
              className="h-10 w-60 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
              placeholder="roomId (opsional)"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              aria-label="Room"
            />
          </div>
        }
      />

      {query.isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner />
          Memuat…
        </div>
      ) : query.isError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm">
          {(query.error as ApiError).message || 'Gagal memuat calendar.'}
        </div>
      ) : (query.data?.length ?? 0) === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          Tidak ada event untuk rentang ini.
        </div>
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>Title</TH>
              <TH>Room</TH>
              <TH>Start</TH>
              <TH>End</TH>
              <TH>Status</TH>
            </TR>
          </THead>
          <TBody>
            {query.data!.map((e) => (
              <TR key={e.id}>
                <TD className="font-medium">{e.title}</TD>
                <TD className="text-muted-foreground">{e.roomId}</TD>
                <TD>{e.start}</TD>
                <TD>{e.end}</TD>
                <TD>{e.status}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  )
}

