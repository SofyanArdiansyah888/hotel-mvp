import { useNavigate } from '@tanstack/react-router'
import { BedDouble, CalendarCheck2, DollarSign, Dot, LogIn, TrendingUp, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-5xl font-semibold text-[#131855]">Bonjour, Atelier.</h1>
        <p className="mt-2 text-lg text-[#6b7294]">
          Your concierge summary for{' '}
          <span className="font-semibold text-[#1f8c7c]">Tuesday, Oct 24th</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: 'Total Bookings',
            value: '124',
            trend: '+12%',
            icon: CalendarCheck2,
            tone: 'text-[#3f5bb8]',
          },
          {
            title: 'Revenue',
            value: '$42,500',
            trend: '+8.4%',
            icon: DollarSign,
            tone: 'text-[#11866e]',
          },
          {
            title: 'Occupancy',
            value: '88%',
            trend: '-2%',
            icon: BedDouble,
            tone: 'text-[#8c6f22]',
          },
          {
            title: 'Active Guests',
            value: '312',
            trend: '+18',
            icon: Users,
            tone: 'text-[#4f4ca6]',
          },
        ].map((item) => (
          <Card key={item.title} className="border-[#e4e7f4] bg-white shadow-none">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-[#f5f7ff] p-2.5">
                  <item.icon className={`size-5 ${item.tone}`} />
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#168872]">
                  <TrendingUp className="size-3.5" />
                  {item.trend}
                </div>
              </div>
              <p className="text-sm text-[#7a819f]">{item.title}</p>
              <p className="mt-1 text-4xl font-semibold text-[#101757]">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.9fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-[#111954]">Recent Bookings</h2>
            <button className="text-sm font-semibold text-[#1f2f93]" type="button">
              View All Bookings -
            </button>
          </div>
          <Table className="bg-white">
            <THead>
              <TR>
                <TH>Guest Name</TH>
                <TH>Room Type</TH>
                <TH>Dates</TH>
                <TH>Status</TH>
                <TH className="text-right">Action</TH>
              </TR>
            </THead>
            <TBody>
              {[
                {
                  guest: 'Elena Belova',
                  room: 'Presidential Suite',
                  dates: 'Oct 24 - 28',
                  status: 'CONFIRMED',
                },
                {
                  guest: 'Julian Moore',
                  room: 'Deluxe King',
                  dates: 'Oct 24 - 25',
                  status: 'PENDING',
                },
                {
                  guest: 'Sarah Thompson',
                  room: 'Executive Studio',
                  dates: 'Oct 26 - 30',
                  status: 'CONFIRMED',
                },
                {
                  guest: 'Robert King',
                  room: 'Standard Queen',
                  dates: 'Oct 25 - 27',
                  status: 'CANCELLED',
                },
              ].map((row) => (
                <TR key={row.guest}>
                  <TD className="font-semibold text-[#1b2059]">{row.guest}</TD>
                  <TD className="text-[#646d90]">{row.room}</TD>
                  <TD className="text-[#646d90]">{row.dates}</TD>
                  <TD>
                    <span className="rounded-full bg-[#e8fbf4] px-2.5 py-1 text-xs font-semibold text-[#17856f]">
                      {row.status}
                    </span>
                  </TD>
                  <TD className="text-right">
                    <button
                      className="rounded-md px-2 text-xl text-[#767ca0] hover:bg-[#f3f5fc]"
                      type="button"
                    >
                      ⋮
                    </button>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>

        <div className="space-y-4">
          <Card className="border-[#e4e7f4] bg-white shadow-none">
            <CardContent className="p-5">
              <h3 className="text-3xl font-semibold text-[#111954]">Room Status</h3>
              <div className="mt-5 grid place-items-center">
                <div className="relative grid size-40 place-items-center rounded-full border-[10px] border-[#e6e9f5]">
                  <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-l-[#168874] border-t-[#168874]" />
                  <div className="text-center">
                    <p className="text-5xl font-semibold text-[#131a55]">82</p>
                    <p className="text-xs font-semibold tracking-wide text-[#868ca7]">OCCUPIED</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#f7f9ff] p-3">
                  <p className="text-xs text-[#8289a6]">AVAILABLE</p>
                  <p className="mt-1 text-3xl font-semibold text-[#17856f]">18</p>
                </div>
                <div className="rounded-xl bg-[#f7f9ff] p-3">
                  <p className="text-xs text-[#8289a6]">MAINTENANCE</p>
                  <p className="mt-1 text-3xl font-semibold text-[#b79e37]">04</p>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                {[
                  ['Suites', 12, 12],
                  ['Deluxe', 45, 50],
                  ['Standard', 25, 38],
                ].map(([label, current, total]) => (
                  <div key={String(label)}>
                    <div className="mb-1 flex items-center justify-between text-[#646c8f]">
                      <span>{String(label)}</span>
                      <span>
                        {current} / {total}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#e8ebf6]">
                      <div
                        className="h-2 rounded-full bg-[#1a2f97]"
                        style={{ width: `${(Number(current) / Number(total)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-[#e4e7f4] bg-[#15257f] shadow-none">
            <CardContent className="space-y-1 p-5 text-white">
              <div className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold tracking-wide">
                <Dot className="size-3" />
                VIP SPOTLIGHT
              </div>
              <p className="pt-1 text-2xl font-semibold">Crown Diamond Arrival at 18:00</p>
              <p className="text-sm text-white/80">
                Ensure the Crystal Suite is prepared with vintage champagne.
              </p>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            onClick={() => {
              navigate({ to: '/login' })
            }}
            className="w-full border-[#d9def0] bg-white text-[#1c255e] hover:bg-[#f5f7ff]"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Buka halaman login
          </Button>
        </div>
      </div>
    </div>
  )
}

