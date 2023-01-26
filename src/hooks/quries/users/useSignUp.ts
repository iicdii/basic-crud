import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import {
  postUserSignUp,
  PostUserSignUpRequest,
  PostUserSignUpResponse,
} from '@/api/users/users'

const useSignUp = () => {
  return useMutation<PostUserSignUpResponse, AxiosError, PostUserSignUpRequest>(
    {
      mutationFn: (data) => postUserSignUp(data).then((res) => res.data),
    }
  )
}

export default useSignUp
