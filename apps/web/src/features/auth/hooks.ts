import { useMutation } from '@tanstack/react-query'

import { login, type LoginRequest } from '@/features/auth/api'
import { authTokenStorage } from '@/features/auth/storage'

export function useLoginMutation() {
  return useMutation({
    mutationFn: (input: LoginRequest) => login(input),
    onSuccess: (data) => {
      authTokenStorage.set(data.accessToken)
    },
  })
}

