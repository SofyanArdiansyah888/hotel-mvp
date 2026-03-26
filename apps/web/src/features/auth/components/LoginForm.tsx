import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { ApiError } from '@/lib/api'
import { useLoginMutation } from '@/features/auth/hooks'

type Props = {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: Props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [formError, setFormError] = React.useState<string | null>(null)

  const mutation = useLoginMutation()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)

    try {
      await mutation.mutateAsync({ email, password })
      onSuccess?.()
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Login gagal'
      setFormError(message)
    }
  }

  const isSubmitting = mutation.isPending

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Masuk</CardTitle>
        <CardDescription>Gunakan akun admin untuk mengakses sistem hotel.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="admin@hotel.local"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {formError ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-foreground">
              {formError}
            </div>
          ) : null}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="size-4" /> : null}
            {isSubmitting ? 'Memproses…' : 'Masuk'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

