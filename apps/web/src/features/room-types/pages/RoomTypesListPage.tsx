import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table'
import { PageHeader } from '@/components/PageHeader'
import { Spinner } from '@/components/ui/spinner'
import { ApiError } from '@/lib/api'
import {
  useCreateRoomTypeMutation,
  useDeleteRoomTypeMutation,
  useRoomTypesListQuery,
  useUpdateRoomTypeMutation,
} from '@/features/room-types/hooks'
import type { RoomType } from '@/features/room-types/api'

export function RoomTypesListPage() {
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [editing, setEditing] = React.useState<RoomType | null>(null)
  const [name, setName] = React.useState('')
  const [capacity, setCapacity] = React.useState('2')
  const [description, setDescription] = React.useState('')
  const [isActive, setIsActive] = React.useState(true)
  const [formError, setFormError] = React.useState<string | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  const query = useRoomTypesListQuery({ page, limit: 10, search: search || undefined })
  const createMutation = useCreateRoomTypeMutation()
  const updateMutation = useUpdateRoomTypeMutation()
  const deleteMutation = useDeleteRoomTypeMutation()

  const meta = query.data?.meta
  const canPrev = (meta?.currentPage ?? page) > 1
  const canNext =
    meta?.totalPages !== undefined ? (meta.currentPage ?? page) < meta.totalPages : true

  function resetForm() {
    setEditing(null)
    setName('')
    setCapacity('2')
    setDescription('')
    setIsActive(true)
    setFormError(null)
  }
  function openCreate() {
    resetForm()
    setModalOpen(true)
  }

  function loadForEdit(item: RoomType) {
    setEditing(item)
    setName(item.name)
    setCapacity(String(item.capacity))
    setDescription(item.description ?? '')
    setIsActive(item.isActive)
    setFormError(null)
    setModalOpen(true)
  }

  async function submitForm() {
    setFormError(null)
    if (!name.trim()) {
      setFormError('Nama wajib diisi.')
      return
    }
    const parsedCap = Number(capacity)
    if (!Number.isFinite(parsedCap) || parsedCap <= 0) {
      setFormError('Kapasitas harus angka > 0.')
      return
    }

    const payload = {
      name: name.trim(),
      capacity: parsedCap,
      description: description.trim() || undefined,
      isActive,
    }

    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input: payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      resetForm()
      setModalOpen(false)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Gagal menyimpan data.')
    }
  }

  const saving = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-6">
      <PageHeader
        title="Room Types"
        description="List + pagination. Create/Edit form menyusul."
        right={
          <div className="flex items-center gap-2">
            <Input
              aria-label="Cari room type"
              placeholder="Cari nama…"
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
        title={editing ? 'Ubah Tipe Kamar' : 'Tipe Kamar Baru'}
      >
        <p className="mb-5 text-sm text-on-surface-variant">
          Kelola kategori kamar untuk grouping dan pricing reservation.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              Room Type Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Deluxe King" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              Capacity
            </label>
            <Input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="2"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              Description
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi tipe kamar (opsional)"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-on-surface-variant md:col-span-2">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Tandai tipe kamar aktif
          </label>
          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)} disabled={saving}>
              Batalkan
            </Button>
            <Button onClick={submitForm} disabled={saving} className="min-w-40">
              {saving ? <Spinner /> : null}
              {editing ? 'Simpan Perubahan' : 'Simpan Tipe Kamar'}
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
            {(query.error as ApiError).message || 'Gagal memuat room types.'}
          </div>
        ) : (query.data?.data?.length ?? 0) === 0 ? (
          <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            Belum ada room type.
          </div>
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Nama</TH>
                <TH>Kapasitas</TH>
                <TH>Status</TH>
                <TH className="text-right">Aksi</TH>
              </TR>
            </THead>
            <TBody>
              {query.data!.data.map((rt) => (
                <TR key={rt.id}>
                  <TD className="font-medium">{rt.name}</TD>
                  <TD>{rt.capacity}</TD>
                  <TD>
                    <span className={rt.isActive ? 'text-success' : 'text-muted-foreground'}>
                      {rt.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TD>
                  <TD className="space-x-2 text-right">
                    <Button variant="outline" size="sm" onClick={() => loadForEdit(rt)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(rt.id)}
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

