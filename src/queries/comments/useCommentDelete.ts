import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { deleteComment } from '@/api/comments/comments'
import { RequestError } from '@/types/error'

const useCommentDelete = () => {
  return useMutation<undefined, AxiosError<RequestError>, string>({
    mutationFn: (commentId) => deleteComment(commentId).then((res) => res.data),
  })
}

export default useCommentDelete
