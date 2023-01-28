import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import {
  postUserSignUp,
  PostUserSignUpRequest,
  PostUserSignUpResponse,
} from '@/api/users/users'
import { RequestError } from '@/types/error'

const useSignUp = () => {
  return useMutation<
    PostUserSignUpResponse,
    AxiosError<RequestError>,
    PostUserSignUpRequest
  >({
    mutationFn: (data) => postUserSignUp(data).then((res) => res.data),
  })
}

export default useSignUp
