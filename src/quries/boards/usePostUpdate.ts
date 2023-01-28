import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { patchBoard, PatchBoardRequest } from '@/api/boards/boards'
import { RequestError } from '@/types/error'

const usePostUpdate = () => {
  return useMutation<undefined, AxiosError<RequestError>, PatchBoardRequest>({
    mutationFn: (data) => patchBoard(data).then((res) => res.data),
  })
}

export default usePostUpdate
