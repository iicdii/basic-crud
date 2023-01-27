import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { deleteUser, DeleteUserResponse } from '@/api/users/users'
import { RequestError } from '@/types/error'

const useUserDelete = () => {
  return useMutation<DeleteUserResponse, AxiosError<RequestError>>({
    mutationFn: () => deleteUser().then((res) => res.data),
  })
}

export default useUserDelete
