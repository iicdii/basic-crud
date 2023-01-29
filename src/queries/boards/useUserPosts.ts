import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import {
  GetBoardsResponse,
  getUserPosts,
  GetUserPostsParams,
} from '@/api/boards/boards'
import { QUERY_KEY } from '@/constants/queryKey'
import { RequestError } from '@/types/error'

const useUserPosts = (params: GetUserPostsParams) => {
  return useQuery<GetBoardsResponse, AxiosError<RequestError>>({
    queryKey: [QUERY_KEY.getUserBoards, params],
    queryFn: () => getUserPosts(params).then((res) => res.data),
    keepPreviousData: true,
  })
}

export default useUserPosts
