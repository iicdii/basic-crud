import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { postComment, PostCommentRequest } from '@/api/comments/comments'
import { RequestError } from '@/types/error'

const usePostComment = () => {
  return useMutation<undefined, AxiosError<RequestError>, PostCommentRequest>({
    mutationFn: (data) => postComment(data).then((res) => res.data),
  })
}

export default usePostComment
