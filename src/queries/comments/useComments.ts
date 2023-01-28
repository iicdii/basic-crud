import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getComments, GetCommentsResponse } from '@/api/comments/comments'
import { QUERY_KEY } from '@/constants/queryKey'
import { RequestError } from '@/types/error'

const useComments = ({
  initialData,
}: { initialData?: GetCommentsResponse } = {}) => {
  return useQuery<GetCommentsResponse, AxiosError<RequestError>>({
    queryKey: [QUERY_KEY.getComments],
    queryFn: () => getComments().then((res) => res.data),
    initialData,
  })
}

export default useComments
