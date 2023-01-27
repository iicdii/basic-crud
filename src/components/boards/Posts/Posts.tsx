import { GetBoardsResponse } from '@/api/boards/boards'
import Post from '@/components/boards/Post/Post'
import usePosts from '@/quries/boards/usePosts'

const Posts = () => {
  const { data, isLoading } = usePosts()

  if (isLoading) return null

  return (
    <>
      {data.data?.map((post: GetBoardsResponse['data']) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default Posts
