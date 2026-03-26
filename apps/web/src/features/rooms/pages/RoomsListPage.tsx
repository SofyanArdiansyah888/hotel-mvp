import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table'
import { PageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/ui/spinner'
import { ApiError } from '@/lib/api'
import {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useRoomsListQuery,
  useUpdateRoomMutation,
} from '@/features/rooms/hooks'
import type { Room } from '@/features/rooms/api'

export function RoomsListPage() {
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [editing, setEditing] = React.useState<Room | null>(null)
  const [form, setForm] = React.useState({ code: '', roomTypeId: '', isActive: true })
  const [formError, setFormError] = React.useState<string | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  const query = useRoomsListQuery({ page, limit: 10, search: search || undefined })
  const createMutation = useCreateRoomMutation()
  const updateMutation = useUpdateRoomMutation()
  const deleteMutation = useDeleteRoomMutation()
  const meta = query.data?.meta

  const canPrev = (meta?.currentPage ?? page) > 1
  const canNext =
    meta?.totalPages !== undefined ? (meta.currentPage ?? page) < meta.totalPages : true

  function resetForm() {
    setEditing(null)
    setForm({ code: '', roomTypeId: '', isActive: true })
    setFormError(null)
  }
  function openCreate() {
    resetForm()
    setModalOpen(true)
  }

  function loadForEdit(item: Room) {
    setEditing(item)
    setForm({ code: item.code, roomTypeId: item.roomTypeId, isActive: item.isActive })
    setFormError(null)
    setModalOpen(true)
  }

  async function submitForm() {
    setFormError(null)
    if (!form.code.trim() || !form.roomTypeId.trim()) {
      setFormError('`code` dan `roomTypeId` wajib diisi.')
      return
    }
    const payload = { code: form.code.trim(), roomTypeId: form.roomTypeId.trim(), isActive: form.isActive }
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input: payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      resetForm()
      setModalOpen(false)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Gagal menyimpan room.')
    }
  }

  const saving = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rooms"
        description="List + pagination. Filter roomType & create/edit menyusul."
        right={
          <div className="flex items-center gap-2">
            <Input
              aria-label="Cari kode kamar"
              placeholder="Cari kode…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-56"
            />
            <Button variant="secondary" onClick={openCreate}>
              Tambah Baru
            </Button>
          </div>
        }
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Ubah Kamar' : 'Kamar Baru'}
      >
        <p className="mb-5 text-sm text-on-surface-variant">
          Lengkapi informasi kamar untuk inventory hotel.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              Room Code
            </label>
            <Input value={form.code} onChange={(e) => setForm(f => ({ ...f, code: e.target.value }))} placeholder="A-101" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              Room Type ID
            </label>
            <Input
              value={form.roomTypeId}
              onChange={(e) => setForm(f => ({ ...f, roomTypeId: e.target.value }))}
              placeholder="uuid room type"
            />
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-on-surface-variant md:col-span-2">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm(f => ({ ...f, isActive: e.target.checked }))} />
            Tandai kamar aktif
          </label>

          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)} disabled={saving}>
              Batalkan
            </Button>
            <Button onClick={submitForm} disabled={saving} className="min-w-40">
              {saving ? <Spinner /> : null}
              {editing ? 'Simpan Perubahan' : 'Simpan Kamar'}
            </Button>
          </div>
          {formError ? (
            <div className="md:col-span-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              {formError}
            </div>
          ) : null}
        </div>
      </Modal>

      <div className="space-y-3">
        {query.isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner />
            Memuat…
          </div>
        ) : query.isError ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm">
            {(query.error as ApiError).message || 'Gagal memuat rooms.'}
          </div>
        ) : (query.data?.data?.length ?? 0) === 0 ? (
          <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            Belum ada room.
          </div>
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Kode</TH>
                <TH>Room Type</TH>
                <TH>Status</TH>
                <TH className="text-right">Aksi</TH>
              </TR>
            </THead>
            <TBody>
              {query.data!.data.map((room) => (
                <TR key={room.id}>
                  <TD className="font-medium">{room.code}</TD>
                  <TD className="text-muted-foreground">{room.roomTypeId}</TD>
                  <TD>
                    <span className={room.isActive ? 'text-success' : 'text-muted-foreground'}>
                      {room.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TD>
                  <TD className="space-x-2 text-right">
                    <Button variant="outline" size="sm" onClick={() => loadForEdit(room)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(room.id)}
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

