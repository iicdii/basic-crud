import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { deleteBoard } from '@/api/boards/boards'
import { RequestError } from '@/types/error'

const usePostDelete = () => {
  return useMutation<undefined, AxiosError<RequestError>, string>({
    mutationFn: (boardId) => deleteBoard(boardId).then((res) => res.data),
  })
}

export default usePostDelete
