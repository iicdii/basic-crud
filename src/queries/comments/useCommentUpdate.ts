import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { patchComment, PatchCommentRequest } from '@/api/comments/comments'
import { RequestError } from '@/types/error'

const useCommentUpdate = () => {
  return useMutation<undefined, AxiosError<RequestError>, PatchCommentRequest>({
    mutationFn: (data) => patchComment(data).then((res) => res.data),
  })
}

export default useCommentUpdate
