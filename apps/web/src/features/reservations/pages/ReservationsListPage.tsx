import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table'
import { PageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/ui/spinner'
import { ApiError } from '@/lib/api'
import {
  useCancelReservationMutation,
  useCreateReservationMutation,
  useDeleteReservationMutation,
  useReservationsListQuery,
  useUpdateReservationMutation,
} from '@/features/reservations/hooks'
import type { Reservation, ReservationStatus } from '@/features/reservations/api'

export function ReservationsListPage() {
  const [page, setPage] = React.useState(1)
  const [status, setStatus] = React.useState<ReservationStatus | ''>('')
  const [filterRoomId, setFilterRoomId] = React.useState('')
  const [editing, setEditing] = React.useState<Reservation | null>(null)
  const [roomId, setRoomId] = React.useState('')
  const [guestName, setGuestName] = React.useState('')
  const [guestEmail, setGuestEmail] = React.useState('')
  const [guestPhone, setGuestPhone] = React.useState('')
  const [checkInDate, setCheckInDate] = React.useState('')
  const [checkOutDate, setCheckOutDate] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [formError, setFormError] = React.useState<string | null>(null)

  const query = useReservationsListQuery({
    page,
    limit: 10,
    status: status || undefined,
    roomId: filterRoomId || undefined,
  })
  const cancelMutation = useCancelReservationMutation()
  const createMutation = useCreateReservationMutation()
  const updateMutation = useUpdateReservationMutation()
  const deleteMutation = useDeleteReservationMutation()

  const meta = query.data?.meta
  const canPrev = (meta?.currentPage ?? page) > 1
  const canNext =
    meta?.totalPages !== undefined ? (meta.currentPage ?? page) < meta.totalPages : true

  function resetForm() {
    setEditing(null)
    setRoomId('')
    setGuestName('')
    setGuestEmail('')
    setGuestPhone('')
    setCheckInDate('')
    setCheckOutDate('')
    setNotes('')
    setFormError(null)
  }

  function loadForEdit(r: Reservation) {
    setEditing(r)
    setRoomId(r.roomId)
    setGuestName(r.guestName)
    setGuestEmail(r.guestEmail ?? '')
    setGuestPhone(r.guestPhone ?? '')
    setCheckInDate(r.checkInDate)
    setCheckOutDate(r.checkOutDate)
    setNotes(r.notes ?? '')
    setFormError(null)
  }

  async function submitForm() {
    setFormError(null)
    if (!roomId.trim() || !guestName.trim() || !checkInDate || !checkOutDate) {
      setFormError('roomId, guestName, checkInDate, checkOutDate wajib diisi.')
      return
    }

    const payload = {
      roomId: roomId.trim(),
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim() || undefined,
      guestPhone: guestPhone.trim() || undefined,
      checkInDate,
      checkOutDate,
      notes: notes.trim() || undefined,
    }
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input: payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      resetForm()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Gagal menyimpan reservation.')
    }
  }

  const saving = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reservations"
        description="List + pagination + CRUD + cancel."
        right={
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as ReservationStatus | '')
                setPage(1)
              }}
              aria-label="Filter status"
            >
              <option value="">All status</option>
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <Input
              aria-label="Filter roomId"
              placeholder="roomId (opsional)"
              value={filterRoomId}
              onChange={(e) => {
                setFilterRoomId(e.target.value)
                setPage(1)
              }}
              className="w-60"
            />
            <Button variant="secondary" onClick={resetForm}>
              Tambah Baru
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{editing ? 'Edit Reservation' : 'Create Reservation'}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Input placeholder="roomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
          <Input
            placeholder="Guest name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <Input
            placeholder="Guest email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
          />
          <Input
            placeholder="Guest phone"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
          />
          <input
            className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            aria-label="Check-in date"
          />
          <input
            className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            aria-label="Check-out date"
          />
          <Input
            className="md:col-span-3"
            placeholder="Notes (opsional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="md:col-span-3 flex items-center gap-2">
            <Button onClick={submitForm} disabled={saving}>
              {saving ? <Spinner /> : null}
              {editing ? 'Update' : 'Create'}
            </Button>
            {editing ? (
              <Button variant="outline" onClick={resetForm} disabled={saving}>
                Batal
              </Button>
            ) : null}
          </div>
          {formError ? (
            <div className="md:col-span-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm">
              {formError}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="space-y-3">
        {query.isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner />
            Memuat…
          </div>
        ) : query.isError ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm">
            {(query.error as ApiError).message || 'Gagal memuat reservations.'}
          </div>
        ) : (query.data?.data?.length ?? 0) === 0 ? (
          <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            Belum ada reservation.
          </div>
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>RSV</TH>
                <TH>Tamu</TH>
                <TH>Room</TH>
                <TH>Check-in</TH>
                <TH>Check-out</TH>
                <TH>Status</TH>
                <TH className="text-right">Aksi</TH>
              </TR>
            </THead>
            <TBody>
              {query.data!.data.map((r) => (
                <TR key={r.id}>
                  <TD className="font-medium">{r.reservationNumber ?? r.id.slice(0, 8)}</TD>
                  <TD>{r.guestName}</TD>
                  <TD className="text-muted-foreground">{r.roomId}</TD>
                  <TD>{r.checkInDate}</TD>
                  <TD>{r.checkOutDate}</TD>
                  <TD>
                    <span
                      className={
                        r.status === 'CANCELLED'
                          ? 'text-muted-foreground'
                          : r.status === 'CONFIRMED'
                            ? 'text-success'
                            : 'text-warning'
                      }
                    >
                      {r.status}
                    </span>
                  </TD>
                  <TD className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={r.status === 'CANCELLED' || cancelMutation.isPending}
                      onClick={() => cancelMutation.mutate(r.id)}
                    >
                      Cancel
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => loadForEdit(r)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(r.id)}
                    >
                      Delete
                    </Button>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {meta?.totalItems !== undefined ? `${meta.totalItems} items` : '—'}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={!canPrev || query.isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </Button>
            <div className="text-xs text-muted-foreground">
              Page {meta?.currentPage ?? page}
              {meta?.totalPages ? ` / ${meta.totalPages}` : ''}
            </div>
            <Button
              variant="outline"
              disabled={!canNext || query.isFetching}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

