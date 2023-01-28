import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getBoards, GetBoardsResponse } from '@/api/boards/boards'
import { QUERY_KEY } from '@/constants/queryKey'
import { RequestError } from '@/types/error'

const usePosts = (onError?: (error: AxiosError<RequestError>) => void) => {
  return useQuery<GetBoardsResponse, AxiosError<RequestError>>({
    queryKey: [QUERY_KEY.getBoards],
    queryFn: () => getBoards().then((res) => res.data),
    onError,
  })
}

export default usePosts
