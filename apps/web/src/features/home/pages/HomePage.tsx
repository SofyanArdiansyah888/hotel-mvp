import { useNavigate } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center px-6 py-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Login berhasil</CardTitle>
          <CardDescription>
            Ini placeholder dashboard. Setelah modul lain dibuat, route ini bisa jadi landing page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Login sementara dibypass. Kamu bisa lanjut bikin modul lain dulu.
          </div>
          <Button
            variant="outline"
            onClick={() => {
              navigate({ to: '/login' })
            }}
          >
            <LogIn className="size-4" aria-hidden="true" />
            Buka halaman login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

