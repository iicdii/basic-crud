import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import {
  getBoards,
  GetBoardsParams,
  GetBoardsResponse,
} from '@/api/boards/boards'
import { QUERY_KEY } from '@/constants/queryKey'
import { RequestError } from '@/types/error'

const usePosts = (params: GetBoardsParams) => {
  return useQuery<GetBoardsResponse, AxiosError<RequestError>>({
    queryKey: [QUERY_KEY.getBoards, params],
    queryFn: () => getBoards(params).then((res) => res.data),
    keepPreviousData: true,
  })
}

export default usePosts
