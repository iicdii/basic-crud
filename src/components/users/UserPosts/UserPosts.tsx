import { useState } from 'react'
import { Button, Space } from 'antd'
import { GetUserPostsParams } from '@/api/boards/boards'
import Post from '@/components/boards/Post/Post'
import useUserPosts from '@/queries/boards/useUserPosts'
import { Post as PostType } from '@/types/board'
import styles from './UserPosts.module.css'

const UserPosts = () => {
  const [params, setParams] = useState<GetUserPostsParams>({ skip: 0, take: 5 })
  const { data, isLoading } = useUserPosts(params)

  if (isLoading) return null

  const hasPrev = params.skip >= params.take
  const hasMore = (data?.data?.length || 0) >= params.take
  const handlePrev = () => {
    setParams({
      skip: Math.max(params.skip - params.take, 0),
      take: params.take,
    })
  }
  const handleNext = () => {
    setParams({ skip: params.skip + params.take, take: params.take })
  }

  return (
    <>
      {data?.data?.map((post: PostType) => (
        <div className={styles.post} key={post.id}>
          <Post post={post} link={`/board/${post.id}`} />
        </div>
      ))}
      {!isLoading && (
        <div className={styles.loadMore}>
          <Space>
            <Button onClick={handlePrev} disabled={!hasPrev}>
              이전
            </Button>
            <Button onClick={handleNext} disabled={!hasMore}>
              다음
            </Button>
          </Space>
        </div>
      )}
    </>
  )
}

export default UserPosts
