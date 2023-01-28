import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { patchUser, PatchUserRequest } from '@/api/users/users'
import { RequestError } from '@/types/error'

const useUserUpdate = () => {
  return useMutation<undefined, AxiosError<RequestError>, PatchUserRequest>({
    mutationFn: (data) => patchUser(data).then((res) => res.data),
  })
}

export default useUserUpdate
