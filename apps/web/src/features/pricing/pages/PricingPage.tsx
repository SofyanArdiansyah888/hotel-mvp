import * as React from 'react'

import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table'
import { ApiError } from '@/lib/api'
import { useQuoteMutation } from '@/features/pricing/hooks'


export function PricingPage() {
  const [form, setForm] = React.useState({
    roomTypeId: '',
    checkInDate: '',
    checkOutDate: '',
    promoCodesRaw: '',
  })
  const [promoError, setPromoError] = React.useState<string | null>(null)

  const quote = useQuoteMutation()

  const promoCodes = React.useMemo(() => {
    return form.promoCodesRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }, [form.promoCodesRaw])

  async function onQuote() {
    setPromoError(null)
    try {
      await quote.mutateAsync({
        roomTypeId: form.roomTypeId,
        checkInDate: form.checkInDate,
        checkOutDate: form.checkOutDate,
        promoCodes: promoCodes.length ? promoCodes : undefined,
      })
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Gagal menghitung quote'
      if (quote.error && (quote.error as ApiError).status === 400) {
        setPromoError(msg)
      }
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pricing"
        description="FE hanya menampilkan hasil dari BE via POST /reservations/quote."
      />

      <Card>
        <CardHeader>
          <CardTitle>Quote</CardTitle>
          <CardDescription>
            Isi `roomTypeId` + tanggal, lalu hitung breakdown (nightly, discount, tax, total).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <Input
              value={form.roomTypeId}
              onChange={e => setForm(f => ({ ...f, roomTypeId: e.target.value }))}
              placeholder="Room Type ID"
              className="w-40"
            />
            <Input
              type="date"
              value={form.checkInDate}
              onChange={e => setForm(f => ({ ...f, checkInDate: e.target.value }))}
              className="w-36"
            />
            <Input
              type="date"
              value={form.checkOutDate}
              onChange={e => setForm(f => ({ ...f, checkOutDate: e.target.value }))}
              className="w-36"
            />
            <Button
              onClick={onQuote}
              disabled={
                quote.isPending ||
                !form.roomTypeId.trim() ||
                !form.checkInDate ||
                !form.checkOutDate
              }
            >
              {quote.isPending ? <Spinner /> : null}
              {quote.isPending ? 'Menghitung…' : 'Hitung'}
            </Button>
          </div>
          <div className="grid gap-2">
            <Input
              value={form.promoCodesRaw}
              onChange={e => setForm(f => ({ ...f, promoCodesRaw: e.target.value }))}
              placeholder="Promo codes (comma separated)"
              className="w-60"
            />
            {promoError ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm">
                {promoError}
              </div>
            ) : null}
          </div>
          {quote.isError ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm">
              {(quote.error as ApiError).message || 'Gagal mengambil quote.'}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {quote.data ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Nightly rates</CardTitle>
              <CardDescription>
                Currency: <span className="font-medium">{quote.data.currency}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <THead>
                  <TR>
                    <TH>Date</TH>
                    <TH className="text-right">Price</TH>
                  </TR>
                </THead>
                <TBody>
                  {quote.data.nightlyRates.map((n) => (
                    <TR key={n.date}>
                      <TD>{n.date}</TD>
                      <TD className="text-right">{n.price.toLocaleString('id-ID')}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Breakdown</CardTitle>
              <CardDescription>Subtotal → discounts → taxes → total</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Subtotal</div>
                <div className="text-right font-medium">
                  {quote.data.subtotal.toLocaleString('id-ID')}
                </div>

                <div className="text-muted-foreground">Discount total</div>
                <div className="text-right font-medium">
                  {(quote.data.discountTotal ?? 0).toLocaleString('id-ID')}
                </div>

                <div className="text-muted-foreground">Net before tax</div>
                <div className="text-right font-medium">
                  {(quote.data.netBeforeTax ?? quote.data.subtotal).toLocaleString('id-ID')}
                </div>

                <div className="text-muted-foreground">Tax total</div>
                <div className="text-right font-medium">
                  {(quote.data.taxTotal ?? 0).toLocaleString('id-ID')}
                </div>

                <div className="text-muted-foreground">Total</div>
                <div className="text-right text-base font-semibold">
                  {quote.data.total.toLocaleString('id-ID')}
                </div>
              </div>

              {(quote.data.discountLines?.length ?? 0) > 0 ? (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Discount lines</div>
                  <Table>
                    <THead>
                      <TR>
                        <TH>Label</TH>
                        <TH className="text-right">Amount</TH>
                      </TR>
                    </THead>
                    <TBody>
                      {quote.data.discountLines!.map((d, i) => (
                        <TR key={`${d.label}-${i}`}>
                          <TD>{d.label}</TD>
                          <TD className="text-right">{d.amount.toLocaleString('id-ID')}</TD>
                        </TR>
                      ))}
                    </TBody>
                  </Table>
                </div>
              ) : null}

              {(quote.data.taxLines?.length ?? 0) > 0 ? (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Tax lines</div>
                  <Table>
                    <THead>
                      <TR>
                        <TH>Name</TH>
                        <TH className="text-right">Amount</TH>
                      </TR>
                    </THead>
                    <TBody>
                      {quote.data.taxLines!.map((t, i) => (
                        <TR key={`${t.name}-${i}`}>
                          <TD className="text-muted-foreground">
                            {t.name} <span className="text-xs">({t.percent}%)</span>
                          </TD>
                          <TD className="text-right">{t.amount.toLocaleString('id-ID')}</TD>
                        </TR>
                      ))}
                    </TBody>
                  </Table>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          Isi form di atas lalu klik <span className="font-medium">Hitung</span>.
        </div>
      )}
    </div>
  )
}

