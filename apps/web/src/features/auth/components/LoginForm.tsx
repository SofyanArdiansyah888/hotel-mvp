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
    <Card className="w-full max-w-md border-[#dfe4f4] bg-white shadow-[0_20px_50px_-25px_rgba(16,23,87,0.35)]">
      <CardHeader className="space-y-2 pb-3">
        <CardTitle className="text-3xl text-[#131855]">Welcome Back</CardTitle>
        <CardDescription className="text-[#6f7698]">
          Sign in to continue managing your concierge operations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-[#3f466f]">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="admin@hotel.local"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#dce1f2] bg-white text-[#1d245f] placeholder:text-[#99a1bf] focus-visible:ring-[#8f98d8]"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-[#3f466f]">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#dce1f2] bg-white text-[#1d245f] placeholder:text-[#99a1bf] focus-visible:ring-[#8f98d8]"
              required
            />
          </div>

          {formError ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-[#792a2a]">
              {formError}
            </div>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-xl bg-[#1f2c9a] text-white hover:bg-[#1b278a]"
          >
            {isSubmitting ? <Spinner className="size-4" /> : null}
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

