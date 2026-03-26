const fs = require('node:fs')
const path = require('node:path')

function readDb(req) {
  const dbPath = path.join(__dirname, 'db.json')
  const raw = fs.readFileSync(dbPath, 'utf8')
  const json = JSON.parse(raw)
  return json
}

function writeDb(json) {
  const dbPath = path.join(__dirname, 'db.json')
  fs.writeFileSync(dbPath, JSON.stringify(json, null, 2) + '\n', 'utf8')
}

function isOverlap(aIn, aOut, bIn, bOut) {
  return aIn < bOut && bIn < aOut
}

function conciergeMiddleware(req, res, next) {
  // CORS (dev)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(204)

  const rawUrl = req.url || ''
  const urlNoV1 = rawUrl.replace(/^\/v1(?=\/)/, '')

  // POST /v1/reservations/:id/cancel (also supports /reservations/:id/cancel after rewrite)
  const cancelMatch = urlNoV1.match(/^\/reservations\/([^/]+)\/cancel\/?$/)
  if (req.method === 'POST' && cancelMatch) {
    const id = cancelMatch[1]
    const db = readDb(req)
    const item = db.reservations.find((r) => String(r.id) === String(id))
    if (!item) return res.status(404).json({ message: 'Reservation not found' })
    if (item.status === 'CANCELLED') {
      return res.status(409).json({ message: 'reservasi sudah dibatalkan' })
    }
    item.status = 'CANCELLED'
    item.cancelledAt = new Date().toISOString()
    writeDb(db)
    return res.json({ id: item.id, reservationNumber: item.reservationNumber, status: item.status })
  }

  // POST /v1/reservations/quote (also supports /reservations/quote)
  if (req.method === 'POST' && urlNoV1.match(/^\/reservations\/quote\/?$/)) {
    const { roomTypeId, checkInDate, checkOutDate, promoCodes } = req.body || {}
    if (!roomTypeId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: 'roomTypeId, checkInDate, checkOutDate wajib' })
    }
    // very simple deterministic pricing (mock only)
    const start = new Date(checkInDate + 'T00:00:00.000Z')
    const end = new Date(checkOutDate + 'T00:00:00.000Z')
    if (!(start < end)) return res.status(400).json({ message: 'from < to' })

    const nightlyRates = []
    let subtotal = 0
    for (let d = new Date(start); d < end; d.setUTCDate(d.getUTCDate() + 1)) {
      const iso = d.toISOString().slice(0, 10)
      const dow = d.getUTCDay()
      const base = roomTypeId === 'rt-1' ? 650000 : 750000
      const weekend = dow === 5 || dow === 6 ? 150000 : 0
      const price = base + weekend
      nightlyRates.push({ date: iso, price })
      subtotal += price
    }

    const applied = Array.isArray(promoCodes) ? promoCodes : []
    let discountTotal = 0
    const discountLines = []
    if (applied.includes('WEEKEND10')) {
      const amount = Math.round(subtotal * 0.1)
      discountLines.push({ source: 'PROMOTION', label: 'WEEKEND10', amount })
      discountTotal += amount
    }

    const netBeforeTax = Math.max(0, subtotal - discountTotal)
    const taxLines = [{ name: 'PPN', percent: 11, amount: Math.round(netBeforeTax * 0.11) }]
    const taxTotal = taxLines.reduce((s, t) => s + t.amount, 0)
    const total = netBeforeTax + taxTotal

    return res.json({
      reservationNumber: 'RSV-2026-000123',
      currency: 'IDR',
      nightlyRates,
      subtotal,
      promoCodes: applied,
      discountLines,
      discountTotal,
      netBeforeTax,
      taxLines,
      taxTotal,
      total,
    })
  }

  // Overlap enforcement for POST/PATCH /v1/reservations (also /reservations)
  if (urlNoV1.startsWith('/reservations') && (req.method === 'POST' || req.method === 'PATCH')) {
    const db = readDb(req)
    const idMatch = urlNoV1.match(/^\/reservations\/([^/?]+)\/?/)
    const updatingId = req.method === 'PATCH' && idMatch ? idMatch[1] : null

    const incoming = req.body || {}
    const roomId = incoming.roomId
    const checkInDate = incoming.checkInDate
    const checkOutDate = incoming.checkOutDate

    if (roomId && checkInDate && checkOutDate) {
      const conflicting = db.reservations.find((r) => {
        if (r.status === 'CANCELLED') return false
        if (updatingId && String(r.id) === String(updatingId)) return false
        if (String(r.roomId) !== String(roomId)) return false
        return isOverlap(checkInDate, checkOutDate, r.checkInDate, r.checkOutDate)
      })
      if (conflicting) {
        return res.status(409).json({ message: 'Bentrok reservasi (overlap)' })
      }
    }
  }

  // Pagination shape for GET list endpoints (nestjs-paginate-like)
  if (req.method === 'GET') {
    const listMatch = urlNoV1.match(/^\/(room-types|rooms|reservations)\/?(\?.*)?$/)
    if (listMatch) {
      const resource = listMatch[1]
      const url = new URL('http://localhost' + urlNoV1)
      const page = Number(url.searchParams.get('page') ?? '1')
      const limit = Number(url.searchParams.get('limit') ?? '10')
      const search = url.searchParams.get('search') ?? ''

      const db = readDb(req)
      const key = resource
      let rows = db[key] ?? []

      if (search && resource === 'room-types') {
        rows = rows.filter((x) => String(x.name ?? '').toLowerCase().includes(search.toLowerCase()))
      }
      if (search && resource === 'rooms') {
        rows = rows.filter((x) => String(x.code ?? '').toLowerCase().includes(search.toLowerCase()))
      }

      // basic filter.* support
      for (const [k, v] of url.searchParams.entries()) {
        if (!k.startsWith('filter.')) continue
        const field = k.slice('filter.'.length)
        rows = rows.filter((x) => String(x[field]) === String(v))
      }

      const totalItems = rows.length
      const totalPages = Math.max(1, Math.ceil(totalItems / limit))
      const currentPage = Math.min(Math.max(1, page), totalPages)
      const start = (currentPage - 1) * limit
      const data = rows.slice(start, start + limit)

      return res.json({
        data,
        meta: {
          itemsPerPage: limit,
          totalItems,
          currentPage,
          totalPages,
        },
      })
    }
  }

  return next()
}

module.exports = [conciergeMiddleware]

