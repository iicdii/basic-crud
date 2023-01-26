import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import {
  postUserSignIn,
  PostUserSignInRequest,
  PostUserSignInResponse,
} from '@/api/users/users'
import { RequestError } from '@/types/error'

const useSignIn = () => {
  return useMutation<
    PostUserSignInResponse,
    AxiosError<RequestError>,
    PostUserSignInRequest
  >({
    mutationFn: (data) => postUserSignIn(data).then((res) => res.data),
  })
}

export default useSignIn
