import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getBoard, GetBoardResponse } from '@/api/boards/boards'
import { QUERY_KEY } from '@/constants/queryKey'
import { RequestError } from '@/types/error'

const usePost = (
  boardId: string,
  onError?: (error: AxiosError<RequestError>) => void
) => {
  return useQuery<GetBoardResponse, AxiosError<RequestError>>({
    queryKey: [QUERY_KEY.getBoard, boardId],
    queryFn: () => getBoard(boardId).then((res) => res.data),
    onError,
  })
}

export default usePost
