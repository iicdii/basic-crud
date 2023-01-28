import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import {
  postUserSocialLogIn,
  PostUserSocialLogInRequest,
  PostUserSocialLogInResponse,
} from '@/api/users/users'
import { RequestError } from '@/types/error'

const useSocialLogin = () => {
  return useMutation<
    PostUserSocialLogInResponse,
    AxiosError<RequestError>,
    PostUserSocialLogInRequest
  >({
    mutationFn: (data) => postUserSocialLogIn(data).then((res) => res.data),
  })
}

export default useSocialLogin
