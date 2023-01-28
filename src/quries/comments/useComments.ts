import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getComments } from '@/api/comments/comments'
import { QUERY_KEY } from '@/constants/queryKey'
import { RequestError } from '@/types/error'

const useComments = (onError?: (error: AxiosError<RequestError>) => void) => {
  return useQuery<any, AxiosError<RequestError>>({
    queryKey: [QUERY_KEY.getComments],
    queryFn: () => getComments().then((res) => res.data),
    onError,
  })
}

export default useComments
