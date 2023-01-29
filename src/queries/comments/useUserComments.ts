import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import {
  GetCommentsResponse,
  getUserComments,
  GetUserCommentsParams,
} from '@/api/comments/comments'
import { QUERY_KEY } from '@/constants/queryKey'
import { RequestError } from '@/types/error'

const useUserComments = (params: GetUserCommentsParams) => {
  return useQuery<GetCommentsResponse, AxiosError<RequestError>>({
    queryKey: [QUERY_KEY.getUserComments, params],
    queryFn: () => getUserComments(params).then((res) => res.data),
    keepPreviousData: true,
  })
}

export default useUserComments
