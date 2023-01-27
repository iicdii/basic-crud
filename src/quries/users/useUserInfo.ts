import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo, GetUserInfoResponse } from '@/api/users/users'
import { QUERY_KEY } from '@/constants/queryKey'
import { RequestError } from '@/types/error'

const useUserInfo = (onError?: (error: AxiosError<RequestError>) => void) => {
  return useQuery<GetUserInfoResponse, AxiosError<RequestError>>({
    queryKey: [QUERY_KEY.getUserInfo],
    queryFn: () => getUserInfo().then((res) => res.data),
    onError,
  })
}

export default useUserInfo
