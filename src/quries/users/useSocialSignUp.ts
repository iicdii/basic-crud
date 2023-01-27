import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import {
  postUserSocialSignUp,
  PostUserSocialSignUpRequest,
  PostUserSocialSignUpResponse,
} from '@/api/users/users'
import { RequestError } from '@/types/error'

const useSocialSignUp = () => {
  return useMutation<
    PostUserSocialSignUpResponse,
    AxiosError<RequestError>,
    PostUserSocialSignUpRequest
  >({
    mutationFn: (data) => postUserSocialSignUp(data).then((res) => res.data),
  })
}

export default useSocialSignUp
