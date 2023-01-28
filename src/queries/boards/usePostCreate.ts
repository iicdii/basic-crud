import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { postBoard, PostBoardRequest } from '@/api/boards/boards'
import { RequestError } from '@/types/error'

const usePostCreate = () => {
  return useMutation<undefined, AxiosError<RequestError>, PostBoardRequest>({
    mutationFn: (data) => postBoard(data).then((res) => res.data),
  })
}

export default usePostCreate
