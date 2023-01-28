import Post from '@/components/boards/Post/Post'
import usePosts from '@/quries/boards/usePosts'
import { Post as PostType } from '@/types/board'

const Posts = () => {
  const { data, isLoading } = usePosts()

  if (isLoading) return null

  return (
    <>
      {data?.data?.map((post: PostType) => (
        <Post key={post.id} post={post} link={`/board/${post.id}`} />
      ))}
    </>
  )
}

export default Posts
